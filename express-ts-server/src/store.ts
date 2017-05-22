import * as Collections from 'typescript-collections';
import Player from './player'

export default class Store {
    players: Collections.Dictionary<number, Player>;

    constructor() {
        this.players = new Collections.Dictionary<number, Player>();
    }
}

