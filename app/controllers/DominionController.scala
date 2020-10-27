package controllers

import com.google.inject.{Guice, Injector}
import de.htwg.wt.dominion.controller.IController
import de.htwg.wt.dominion.controller.maincontroller.Controller
import de.htwg.wt.dominion.{CardMain, Dominion, DominionModule, PlayerMain}
import javax.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}

class DominionController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  val dominionObj = Dominion

  val injector: Injector = Guice.createInjector(new DominionModule);
  val dominionController: IController = injector.getInstance(classOf[Controller])

  val dominionServer: Unit = dominionObj.main(null);
  val playerServer: Unit  = PlayerMain.main(null);
  val cardServer: Unit  = CardMain.main(null);

  val dominionAsText: String = dominionController.getControllerMessage

  def index = Action {
    Ok{views.html.index()}
  }

  def dominion = Action {
    Ok{dominionAsText}
  }
}
