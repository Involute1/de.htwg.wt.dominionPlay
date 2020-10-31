package controllers

import com.google.inject.{Guice, Injector}
import de.htwg.wt.dominion.controller.IController
import de.htwg.wt.dominion.controller.maincontroller.Controller
import de.htwg.wt.dominion.{CardMain, Dominion, DominionModule, PlayerMain}
import javax.inject.Inject
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}

class DominionController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

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
    Ok{views.html.index(dominionController.toHTML)}
  }

  def process(input: String): Action[AnyContent] = Action {
    dominionController.eval(input)
    Ok{views.html.index(dominionController.toHTML)}
  }

  def about(): Action[AnyContent] = Action {
    Ok{views.html.about()}
  }

}
