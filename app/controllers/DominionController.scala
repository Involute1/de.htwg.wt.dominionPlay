package controllers

import com.google.inject.{Guice, Injector}
import de.htwg.wt.dominion.controller.maincontroller.Controller
import de.htwg.wt.dominion.{CardMain, Dominion, DominionModule, PlayerMain}
import javax.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}

class DominionController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  val dominionServer: Unit = Dominion.main(null);
  val playerServer: Unit  = PlayerMain.main(null);
//  val cardServer: Unit  = CardMain.main(null);

  val injector: Injector = Guice.createInjector(new DominionModule);
  val dominionController = injector.getInstance(classOf[Controller]);

  val dominionAsText: String = dominionController.controllerMessage;

  def index = Action {
    Ok{views.html.index("")}
  }

  def dominion = Action {
    Ok{dominionAsText}
  }
}
