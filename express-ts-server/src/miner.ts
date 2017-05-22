import * as Collections from 'typescript-collections';
import Player from './player'

class Engine {
  players:Collections.Dictionary<number, Player>;
  currentTime:number = 0;
  delta:number = 1000;
  tickTime:number = 0;
  miner:Miner;
  money:number = 0;
  onChange:Function;

  constructor() {
    this.players = new Collections.Dictionary<number, Player>();
      this.miner = new Miner();
      if (this.currentTime == 0)
        this.currentTime = Date.now();
      setInterval(this.update.bind(this), 1000/60);
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
    this.money += this.miner.moneyPerTick;
    if (this.onChange != null)
      this.onChange();
  }

  upgradeMiner() {
    if (this.money > this.miner.price) {
      this.money -= this.miner.price;
      this.miner.levelup();
    }
  }  
}

class Miner {
  //1 секунда - один ресурс (1 тик = 1/5 ресурса)
  moneyPerTick = .2/10;
  price = 100;

  levelup() {
    this.moneyPerTick *= 1.1;
    this.price *= 1.1;
  }
}
//диггер копает со скоростью т единиц за тик
//каждый апгрэйд повышает скорость на 10% и стоит на 10% дороже
export default Engine
