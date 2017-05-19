import * as ws from 'websocket';
import Engine from './engine';

let log = (message:string) => {
    console.log(Date.now() + " " + message);
}

export class Client {
    isKnown:boolean;
    name:string;
    color:string;
    connection:ws.connection;
    engine:Engine;

    constructor(connection:ws.connection, engine:Engine) {
        this.engine = engine;
        this.connection = connection;
        this.isKnown = false;
        this.name = "";
        log(`Connection accepted.`);

        // user sent some message
        connection.on('message', this.onMessage.bind(this));
        this.engine.onChange = this.onUpdate.bind(this);
        // user disconnected
    }

    onUpdate() {
        this.connection.sendUTF(JSON.stringify({ money:this.engine.money}));
    }

    htmlEntities(str:any):string {
        return String(str)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    onMessage(message:ws.IMessage) {
        if (message.type === 'utf8') {
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