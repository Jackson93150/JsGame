export default class Sprite { // on va créer une class ou l'on va mettre les fonction pour load et draw les img
    constructor(Lx,Ly,posX,posY,RepetX,RepetY){
      this.Lx = Lx;
      this.Ly = Ly;
      this.posX = posX;
      this.posY = posY;
      this.RepetX = RepetX;
      this.RepetY = RepetY;
      this.all_img = [];
      this.img = new Image();
      this.anim_id = -1;
      this.cnv = document.getElementById("myCanvas");
      this.ctx = this.cnv.getContext("2d");
    }
    load(){
      let canvas1 = document.createElement("canvas");
      canvas1.width = this.Lx * this.RepetX;
      canvas1.height = this.Ly * this.RepetY;
      let context1 = canvas1.getContext("2d");
      context1.drawImage(this.img, 0, 0, this.Lx * this.RepetX, this.Ly * this.RepetY);
      for (let j = 0; j < 1; j += 1) {
        let imax = this.RepetX;
        for (let i = 0; i < imax; i += 1) {
          let canvasImageData1 = context1.getImageData(i * this.Lx, j * this.Ly, this.Lx, this.Ly);
          let canvas2 = document.createElement("canvas");
          canvas2.width = this.Lx;
          canvas2.height = this.Ly;
          let context2 = canvas2.getContext("2d");
          context2.putImageData(canvasImageData1, 0, 0);
          this.all_img.push(canvas2);
        }
      }
      this.anim_id = 0;
    }
    draw(){
      if (this.anim_id >= 0) {
        this.ctx.drawImage(
          this.all_img[this.anim_id],
          this.posX,
          this.posY,
          this.Lx,
          this.Ly
        );
        this.anim_id += 1;
        if (this.anim_id == this.all_img.length) {
          this.anim_id = 0;
        }
      }
    }
    clear(){
      this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
    }
}