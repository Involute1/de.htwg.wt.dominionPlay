package controllers

import com.google.inject.{ Guice, Injector }
import de.htwg.wt.dominion.controller.{ EvalEvent, IController }
import de.htwg.wt.dominion.controller.maincontroller.Controller
import de.htwg.wt.dominion.{ CardMain, Dominion, DominionModule, PlayerMain }
import play.api.libs.json._
import play.api.libs.streams.ActorFlow
import play.api.mvc._
import akka.stream.Materializer
import akka.actor._
import com.mohiva.play.silhouette.impl.providers.GoogleTotpInfo

import javax.inject._
import scala.concurrent.ExecutionContext
import scala.swing.Reactor

@Singleton
class DominionController @Inject() (cc: ControllerComponents, scc: SilhouetteControllerComponents, aboutpage: views.html.about, titlescreen: views.html.titlescreen, indexpage: views.html.index)(implicit system: ActorSystem, mat: Materializer, ex: ExecutionContext) extends SilhouetteController(scc) {

  val initArray: Array[String] = Array(" ")
  val dominionServer: Unit = Dominion.main(initArray)
  val cardServer: Unit = CardMain.main(Array())
  val playerServer: Unit = PlayerMain.main(Array())

  val injector: Injector = Guice.createInjector(new DominionModule)
  val dominionController: IController = injector.getInstance(classOf[Controller])

  def index: Action[AnyContent] = SecuredAction.async { implicit request =>
    authInfoRepository.find[GoogleTotpInfo](request.identity.loginInfo).map { totpInfoOpt =>
      Ok(titlescreen(request.identity, totpInfoOpt))
    }
  }

  def dominion: Action[AnyContent] = SecuredAction.async { implicit request =>
    authInfoRepository.find[GoogleTotpInfo](request.identity.loginInfo).map { totpInfoOpt =>
      Ok(indexpage(dominionController.toHTML)(1)(1)(0)("")(0)("")(Nil)(Nil)(request.identity, totpInfoOpt))
    }
  }

  def process(input: String): Action[AnyContent] = SecuredAction.async { implicit request =>
    dominionController.eval(input)
    if (dominionController.getControllerStateAsString == "ActionState" || dominionController.getControllerStateAsString == "BuyState") {
      authInfoRepository.find[GoogleTotpInfo](request.identity.loginInfo).map { totpInfoOpt =>
        Ok(indexpage(dominionController.toHTML)(dominionController.getCurrentPlayerActions)(dominionController.getCurrentPlayerBuys)(dominionController.getCurrentPlayerMoney)(dominionController.getCurrentPhaseAsString)(dominionController.getTurn)(dominionController.getCurrentPlayerName)(dominionController.getCurrentPlayerHand)(dominionController.getPlayingDecks)(request.identity, totpInfoOpt))
      }
    } else {
      authInfoRepository.find[GoogleTotpInfo](request.identity.loginInfo).map { totpInfoOpt =>
        Ok(indexpage(dominionController.toHTML)(1)(1)(0)("")(0)("")(Nil)(Nil)(request.identity, totpInfoOpt))
      }
    }
  }

  def about = SecuredAction.async { implicit request =>
    authInfoRepository.find[GoogleTotpInfo](request.identity.loginInfo).map { totpInfoOpt =>
      Ok(aboutpage(request.identity, totpInfoOpt))
    }
  }

  def toJson(input: String): Action[AnyContent] = Action {
    dominionController.eval(input)

    val json = buildJson()

    Ok(json)
  }

  def buildJson(): JsValue = {
    var json: JsValue = Json.parse("""
      {
        "html" : """ + Json.toJson(dominionController.toHTML) + """,
        "playerActions" : """ + 1 + """,
        "playerBuys" : """ + 1 + """,
        "playerMoney" : """ + 0 + """,
        "controllerPhase" : """ + Json.toJson(" ") + """,
        "turn" : """ + 0 + """,
        "playerName" : """ + Json.toJson(" ") + """,
        "playerHand" : """ + Json.arr(Array(1)) + """,
        "playingDecks" : """ + Json.arr(Array(1)) + """
      }
    """)

    if (dominionController.getControllerStateAsString == "ActionState" || dominionController.getControllerStateAsString == "BuyState") {
      json = Json.parse("""
            {
              "html" : """ + Json.toJson(dominionController.toHTML) + """,
              "playerActions" : """ + dominionController.getCurrentPlayerActions + """,
              "playerBuys" : """ + dominionController.getCurrentPlayerBuys + """,
              "playerMoney" : """ + dominionController.getCurrentPlayerMoney + """,
              "controllerPhase" : """ + Json.toJson(dominionController.getCurrentPhaseAsString) + """,
              "turn" : """ + dominionController.getTurn + """,
              "playerName" : """ + Json.toJson(dominionController.getCurrentPlayerName) + """,
              "playerHand" : """ + Json.arr(dominionController.getCurrentPlayerHand) + """,
              "playingDecks" : """ + Json.arr(dominionController.getPlayingDecks) + """
            }
          """)
    }
    json
  }

  def socket: WebSocket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect received")
      DominionActorFactory.create(out)
    }
  }

  object DominionActorFactory {
    def create(out: ActorRef): Props = {
      Props(new DominionWebSocketActor(out))
    }
  }

  class DominionWebSocketActor(out: ActorRef) extends Actor with Reactor {
    listenTo(dominionController)

    def receive: Receive = {
      case msg: String =>
        dominionController.eval(msg)
        out ! (buildJson().toString())
        println("Sent json to Client " + msg)
    }

    reactions += { case event: EvalEvent => sendJsonToClient() }

    def sendJsonToClient(): Unit = {
      println("Received from controller")
      out ! (buildJson().toString())
    }
  }
}