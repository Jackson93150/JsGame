import Perso from "./perso.js";
import Sprite from "./sprite.js";
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
const fps = 60;
let perso = new Perso();
let feu = new Sprite(28, 46, 0, 0, 16, 1);
feu.img.src = "./assets/feu.png";
feu.img.onload = function () {
  feu.load();
};
let keysPressed = {};
let background = new Image();
background.src = "./assets/background.png"
let background2 = new Image();
background2.src = "./assets/background.png"
let bgx = 0;
let bgx2 = background.width*1.4;
let bgs = 2;

function backgloop(){
  if(bgx2 == 0){
    bgx = background.width*1.4;
  }
  if(bgx == 0){
    bgx2 = background.width*1.4;
  }
}

document.addEventListener("keydown", (event) => {
  keysPressed[event.key] = true;

  if(keysPressed["z"] && event.key == "d" || keysPressed["d"] && event.key == "z" ){
    perso.fly();
    perso.fly_right();
  }
  if(keysPressed["z"] && event.key == "q" || keysPressed["q"] && event.key == "z" ){
    perso.fly();
    perso.fly_left();
  }
  if(keysPressed["s"] && event.key == "d" || keysPressed["d"] && event.key == "s" ){
    perso.stop_fly();
    perso.fly_right();
  }
  if(keysPressed["s"] && event.key == "q" || keysPressed["q"] && event.key == "s" ){
    perso.stop_fly();
    perso.fly_left();
  }
  if(keysPressed["z"]){
    perso.fly();
  }
  if(keysPressed["s"]){
    perso.stop_fly();
  }
  if(keysPressed["d"]){
    perso.fly_right();
  }
  if(keysPressed["q"]){
    perso.fly_left();
  }
});

document.addEventListener("keyup", (event) => {
  delete keysPressed[event.key];
});

function update() {
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  backgloop();
  ctx.drawImage(background,bgx,0,background.width*1.4,background.height*1.4);
  ctx.drawImage(background2,bgx2,0,background.width*1.4,background.height*1.4);
  bgx-= bgs;
  bgx2-= bgs;
  perso.limite(cnv.height);
  perso.limite2(0);
  perso.limite3(0);
  perso.limite4(cnv.width);
  perso.setup_gravity();
  feu.posX = perso.posx - 4;
  feu.posY = perso.posy + 40;
  feu.draw();
  perso.draw();
  setTimeout(() => {
    requestAnimationFrame(update);
  }, 1000 / fps);
}

update();
