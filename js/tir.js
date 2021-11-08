export default class Tir {
    constructor(x,y){
        this.x = x;
        this.y = y;                                                                                            
        this.img = new Image();
        this.img.src = "./assets/tir.png";
        this.cnv = document.getElementById("myCanvas");
        this.ctx = this.cnv.getContext("2d");
    }
    draw(limite){
        if(this.x < limite){
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
            );
        }
    }
    move(){
        this.x+=20;
    }
}