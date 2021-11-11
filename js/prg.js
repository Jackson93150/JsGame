import Perso from "./perso.js";
import Sprite from "./sprite.js";
import Tir from "./tir.js";
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
background.src = "./assets/background.png";
let bgx = 0;
let bgs = 0.5;
let tirvec = [];
let alitirvec = [];
let alienvec = [];
let portal = new Sprite(640,640,background.width*1.4-400,cnv.height/2+100,8,1);
portal.img.src = "./assets/portal.png";
portal.img.onload = function () {
  portal.load();
};
portal.slow = 6;
portal.sslow = 6;
let explosionvec = [];


function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnAlien(){
  let y = getRandom(0,cnv.height-82);
  let y2 = getRandom(0,cnv.height/2)
  let ali = new Sprite(82, 62, cnv.width, y, 20, 1);
  ali.img.src = "./assets/alien.png";
  ali.img.onload = function () {
    ali.load();
  };
  let ali2 = new Sprite(82, 62, cnv.width, y2, 20, 1);
  ali2.img.src = "./assets/alien.png";
  ali2.img.onload = function () {
    ali2.load();
  };
  alienvec.push(ali);
  alienvec.push(ali2);
}

function moveAlien(i){
  alienvec[i].posX -= 5;
}

function backgstop() {
  let z = cnv.width - background.width * 1.4;
  if (bgx == z) {
    bgs = 0;
  }
}

function tirstart() {
  let tir = new Tir(perso.posx + 30, perso.posy + 28);
  tirvec.push(tir);
}

function tircol(i){
  for (let j = 0 ; j < tirvec.length ; j++){
    if (tirvec[j].y > alienvec[i].posY + alienvec[i].Ly || tirvec[j].x + 23 < alienvec[i].posX || tirvec[j].y + 6 < alienvec[i].posY ||tirvec[j].x > alienvec[i].posX + alienvec[i].Lx) {
    } 
    else{
      alienvec[i].state = true;
      tirvec.splice(j,1);
      let explosion = new Sprite(68,72,alienvec[i].posX,alienvec[i].posY,8,1);
      explosion.img.src = "./assets/explosion.png";
      explosion.img.onload = function () {
        explosion.load();
      };
      explosion.slow = 5;
      explosion.sslow = 5;
      explosionvec.push(explosion);
    }
  }
}

document.addEventListener("keydown", (event) => {
  keysPressed[event.key] = true;
  if (
    (keysPressed["z"] && event.key == "d" && event.key == "j") ||
    (keysPressed["d"] && event.key == "z" && event.key == "j")
  ) {
    perso.fly();
    perso.fly_right();
    tirstart();
  }
  if (
    (keysPressed["z"] && event.key == "q" && event.key == "j") ||
    (keysPressed["q"] && event.key == "z" && event.key == "j")
  ) {
    perso.fly();
    perso.fly_left();
    tirstart();
  }
  if (
    (keysPressed["s"] && event.key == "d" && event.key == "j") ||
    (keysPressed["d"] && event.key == "s" && event.key == "j")
  ) {
    perso.stop_fly();
    perso.fly_right();
    tirstart();
  }
  if (
    (keysPressed["s"] && event.key == "q" && event.key == "j") ||
    (keysPressed["q"] && event.key == "s" && event.key == "j")
  ) {
    perso.stop_fly();
    perso.fly_left();
    tirstart();
  }

  if (
    (keysPressed["z"] && event.key == "d") ||
    (keysPressed["d"] && event.key == "z")
  ) {
    perso.fly();
    perso.fly_right();
  }
  if (
    (keysPressed["z"] && event.key == "q") ||
    (keysPressed["q"] && event.key == "z")
  ) {
    perso.fly();
    perso.fly_left();
  }
  if (
    (keysPressed["s"] && event.key == "d") ||
    (keysPressed["d"] && event.key == "s")
  ) {
    perso.stop_fly();
    perso.fly_right();
  }
  if (
    (keysPressed["s"] && event.key == "q") ||
    (keysPressed["q"] && event.key == "s")
  ) {
    perso.stop_fly();
    perso.fly_left();
  }
  if (keysPressed["j"]) {
    tirstart();
  }
  if (keysPressed["z"]) {
    perso.fly();
  }
  if (keysPressed["s"]) {
    perso.stop_fly();
  }
  if (keysPressed["d"]) {
    perso.fly_right();
  }
  if (keysPressed["q"]) {
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
  backgstop();
  ctx.drawImage(
    background,
    bgx,
    0,
    background.width * 1.4,
    background.height * 1.4
  );
  portal.draw();
  portal.posX -= bgs;
  bgx -= bgs;
  perso.limite(cnv.height);
  perso.limite2(0);
  perso.limite3(0);
  perso.limite4(cnv.width);
  perso.setup_gravity();
  feu.posX = perso.posx - 4;
  feu.posY = perso.posy + 40;
  feu.draw();
  perso.draw();

  for (let i = 0; i < tirvec.length; i++) {
    tirvec[i].draw(cnv.width);
    tirvec[i].move();
    if (tirvec[i].state == false) {
      tirvec.splice(i, 1);
    }
  };

  for(let i = 0; i < alienvec.length; i++) {
    tircol(i);
  }

  for(let i = 0; i < alienvec.length; i++) {
    alienvec[i].draw();
    moveAlien(i);
    if(alienvec[i].anim_id == 12){
      if(alienvec[i].slow == 2){
        let fball = new Sprite(32, 32, alienvec[i].posX+20, alienvec[i].posY+15, 6, 1);
        fball.img.src = "./assets/fireball.png";
        fball.img.onload = function () {
          fball.load();
        };
        alitirvec.push(fball);
      }
    }
    if(alienvec[i].posX < -82 || alienvec[i].state == true){
      alienvec.splice(i,1);
    }
  }

  for(let i = 0; i < alitirvec.length; i++){
    if (perso.posy > alitirvec[i].posY + alitirvec[i].Ly || perso.posx + 30 < alitirvec[i].posX || perso.posy + 58 < alitirvec[i].posY ||perso.posx > alitirvec[i].posX + alitirvec[i].Lx) {
      alitirvec[i].draw();
      alitirvec[i].posX -= 15;
      if(alitirvec[i].posX < -32){
        alitirvec.splice(i,1);
      }
    }
    else{
      perso.pv -= 1;
      alitirvec.splice(i,1);
    }
  }

  for(let i = 0; i < explosionvec.length;i++){
    if(explosionvec[i].anim_id == 4){
      explosionvec.splice(i,1);
    }
    else{
      explosionvec[i].draw();
    }
  }

  if(bgs == 0){
    clearInterval(alinter);
  }

  setTimeout(() => {
    requestAnimationFrame(update);
  }, 1000 / fps);
}

var alinter = setInterval(spawnAlien,2000);

update();

