export default class Player {
    id:number;
    x:number;
    y:number;
    mineLevel:number;

    constructor() {
        this.x = Math.floor(Math.random()*10);
        this.y = Math.floor(Math.random()*10);
        this.mineLevel = 0;
    }
}