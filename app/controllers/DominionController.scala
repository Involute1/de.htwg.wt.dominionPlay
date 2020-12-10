package controllers

import com.google.inject.{Guice, Injector}
import de.htwg.wt.dominion.controller.{EvalEvent, IController}
import de.htwg.wt.dominion.controller.maincontroller.Controller
import de.htwg.wt.dominion.{CardMain, Dominion, DominionModule, PlayerMain}
import play.api.libs.json._
import play.api.libs.streams.ActorFlow
import play.api.mvc._
import akka.stream.Materializer
import akka.actor._

import javax.inject._
import scala.swing.Reactor

@Singleton
class DominionController @Inject()(cc: ControllerComponents)(implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc) {

  val initArray:Array[String] = Array(" ")
  val dominionServer: Unit = Dominion.main(initArray)
  val cardServer: Unit  = CardMain.main(Array())
  val playerServer: Unit  = PlayerMain.main(Array())

  val injector: Injector = Guice.createInjector(new DominionModule)
  val dominionController: IController = injector.getInstance(classOf[Controller])

  def index: Action[AnyContent] = Action {
    Ok{views.html.titlescreen()}
  }

  def dominion: Action[AnyContent] = Action {
    Ok{views.html.index(dominionController.toHTML)(1)(1)(0)("")(0)("")(Nil)(Nil)}
  }

  def process(input: String): Action[AnyContent] = Action {
    dominionController.eval(input)
    if (dominionController.getControllerStateAsString == "ActionState" || dominionController.getControllerStateAsString == "BuyState") {
      Ok{views.html.index(dominionController.toHTML)(dominionController.getCurrentPlayerActions)(dominionController.getCurrentPlayerBuys)(dominionController.getCurrentPlayerMoney)(dominionController.getCurrentPhaseAsString)(dominionController.getTurn)(dominionController.getCurrentPlayerName)(dominionController.getCurrentPlayerHand)(dominionController.getPlayingDecks)}
    } else {
      Ok{views.html.index(dominionController.toHTML)(1)(1)(0)("")(0)("")(Nil)(Nil)}
    }
  }

  def about(): Action[AnyContent] = Action {
    Ok{views.html.about()}
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
        "controllerPhase" : """ +  Json.arr(Array(1)) + """,
        "turn" : """ + 0 + """,
        "playerName" : """ +  Json.arr(Array(1)) + """,
        "playerHand" : """ +  Json.arr(Array(1)) + """,
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

    reactions += {case event: EvalEvent => sendJsonToClient()}

    def sendJsonToClient(): Unit = {
      println("Received from controller")
      out ! (buildJson().toString())
    }
  }


}