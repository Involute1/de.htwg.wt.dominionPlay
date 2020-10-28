package controllers

import com.google.inject.{Guice, Injector}
import de.htwg.wt.dominion.controller.IController
import de.htwg.wt.dominion.controller.maincontroller.Controller
import de.htwg.wt.dominion.{CardMain, Dominion, DominionModule, PlayerMain}
import javax.inject.Inject
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}

class DominionController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  var a:Array[String] = new Array[String](1)
  a(0) = " "
    val dominionServer: Unit = Dominion.main(a);
    val playerServer: Unit  = PlayerMain.main(Array());
    //val cardServer: Unit  = CardMain.main(Array());


  val injector: Injector = Guice.createInjector(new DominionModule)
  val domionionController = injector.getInstance(classOf[Controller])
  val dominionAsText: String = domionionController.toHTML

  def index: Action[AnyContent] = Action {
    Ok{views.html.index("Welcome to Dominion")}
  }

  def dominion: Action[AnyContent] = Action {
    Ok{views.html.index(dominionAsText)}
  }

  def process(input: String): Action[AnyContent] = Action {
    //TODO controller.processInputLine
    Ok{views.html.index(dominionAsText)}
  }
}
