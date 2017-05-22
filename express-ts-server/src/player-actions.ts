import Player from './player'
import Engine from './engine'

export default class PlayerActions {
    engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;
    }

    upgradeMine(playerID:number) {
        let player = this.engine.store.players.getValue(playerID);
        
    }

    setCoordinates(playerID:number, x:number, y:number) {
        let player = this.engine.store.players.getValue(playerID);
        player.x = x;
        player.y = y;
    }

    getPlayer(playerID: number) {
        let players = this.engine.store.players;
        let player = players.getValue(playerID);
        if (player == undefined) {
            player = new Player();
            player.id = playerID;
            console.log("created new player");
            players.setValue(playerID, player);
        }
        return player;
    }
}