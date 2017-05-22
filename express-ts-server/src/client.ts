import * as ws from 'websocket';
import Engine from './engine';
import Player from './player';

let log = (message:string) => {
    console.log(Date.now() + " " + message);
}

export class Client {
    isKnown:boolean;
    name:string;
    color:string;
    connection:ws.connection;
    engine:Engine;
    player:Player;

    constructor(connection:ws.connection, engine:Engine) {
        this.engine = engine;
        this.connection = connection;
        this.isKnown = false;
        this.name = "";
        log(`Connection accepted.`);

        // user sent some message
        connection.on('message', this.onMessage.bind(this));
        // this.engine.onChange = this.onUpdate.bind(this);
        // user disconnected
    }

    onUpdate() {
        // this.connection.sendUTF(JSON.stringify({ money:this.engine.money}));
    }

    htmlEntities(str:any):string {
        return String(str)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    onMessage(message:ws.IMessage) {
        // console.log('message: ' + message.type);
        if (message.type === 'utf8' && message.utf8Data != undefined) {
            console.log('data: ' + message.utf8Data);
            var pack = JSON.parse(message.utf8Data);
            if (pack.type == 'auth') {
                let id:number = pack.data.id;
                if (id != undefined) {
                    this.player = this.engine.playerActions.getPlayer(id);
                    console.log(` player auth ${id}`);
                } else {
                    console.error("player id undefined");
                }
            }
            if (pack.type == 'crdset') {
                var data = pack.data;
                this.engine.playerActions.setCoordinates(this.player.id, data.x, data.y);
                console.log(` set coords ${data.x} ${data.y}`);
            }
            if (pack.type == 'upgrade') {
                this.engine.playerActions.upgradeMine(this.player.id);
            }
            // if (this.isKnown === false) {
            //     this.isKnown = true;
            //     this.name = this.htmlEntities(message.utf8Data);
            //     log(' User is known as: ' + name);
            // } else { 
            //     log(' Received Message from ' + name + ': ' + message.utf8Data);
            // }
            // this.connection.sendUTF(JSON.stringify({ money:this.engine.money}));
        }
    }
}