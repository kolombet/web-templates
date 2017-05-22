import Store from './store';
import PlayerController from './player-controller'
import PlayerActions from './player-actions'

class Engine {
  store:Store;
  playerController:PlayerController;
  playerActions:PlayerActions;
  currentTime: number = 0;
  delta: number = 1000;
  tickTime: number = 0;

  constructor() {
    this.store = new Store();
    this.playerController = new PlayerController(this);
    this.playerActions = new PlayerActions(this);
    
    if (this.currentTime == 0)
      this.currentTime = Date.now();
    setInterval(this.update.bind(this), 1000 / 60);
  }

  update() {
    var dt = Date.now() - this.currentTime;
    this.tickTime += dt;
    if (this.tickTime > this.delta) {
      this.tickTime -= this.delta;
      this.tick();
    }
  }

  tick() {
    this.playerController.update();
  }
}

export default Engine
