export default class Perso {
    constructor(){
        this.cnv = document.getElementById("myCanvas");
        this.ctx = this.cnv.getContext("2d");
        this.posx = 200;
        this.posy = 200;
        this.img = new Image();
        this.img.src = "./assets/perso.png";
        this.acceleration = 0;
        this.acceleration2 = 0;
        this.speedx = 0;
        this.speedy = 0;
        this.turbo_power = -0.25;
        this.turbo_stop = 0.15;
        this.movement_left = -0.07;
        this.movement_right = 0.07;
    }
    draw(){
        this.ctx.drawImage(
            this.img,
            this.posx,
            this.posy,
        );
    }
    setup_gravity(){
        this.speedx += this.acceleration;
        this.speedy += this.acceleration2+0.07;
        this.posx += this.speedx;
        this.posy += this.speedy;
        this.acceleration *= 0.0;
        this.acceleration2 *= 0.0;
    }
    fly() {
        this.acceleration2 += this.turbo_power;
    }
    stop_fly() {
        this.acceleration2 += this.turbo_stop;
    }
    fly_left() {
        this.acceleration += this.movement_left;
    }
    fly_right() {
        this.acceleration += this.movement_right;
    }
    limite(perimetre) {
        // limite pour le bas de l'écran
        while (this.posy + 60.0 > perimetre) {
            this.posy = perimetre - 65.0;
            this.speedy = 0.0;
            break;
        }
    }
    limite2(perimetre) {
        // limite pour le haut de l'écran
        while (this.posy < perimetre) {
            this.posy = perimetre;
            this.speedy = 0.0;
            break;
        }
    }
    limite3(perimetre) {
        // limite pour le coté gauche de l'écran
        while (this.posx < perimetre) {
            this.posx = perimetre;
            this.speedx = 0.0;
            break;
        }
    }
    limite4(perimetre) {
        // limite pour le coté droit de l'écran
        while (this.posx + 30.0 > perimetre) {
            this.posx = perimetre - 30.0;
            this.speedx = 0.0;
            break;
        }
    }
}

