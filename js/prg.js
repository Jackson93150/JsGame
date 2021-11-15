import Perso from "./perso.js";
import Sprite from "./sprite.js";
import Tir from "./tir.js";
import Dio from "./dio.js";
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
const fps = 60;
let perso = new Perso();
let feu = new Sprite(28, 46, 0, 0, 16, 1);
feu.img.src = "./assets/feu.png";
feu.img.onload = function () {
  feu.load();
};

let dio = new Dio(139.2,120,0,0,19,1);
dio.img.src = "./assets/dio.png";
dio.img.onload = function () {
  dio.load();
};

let dioknife = new Sprite(200,167,0,0,11,1);
dioknife.img.src = "./assets/dioknife.png";
dioknife.img.onload = function () {
  dioknife.load();
};

let knifevec = [];

let keysPressed = {};
let background = new Image();
background.src = "./assets/background.png";
let background2 = new Image();
background2.src = "./assets/background2.png";
let background3 = new Sprite(640, 781, 0, 0, 1, 1);
background3.img.src = "./assets/background3.png";
background3.img.onload = function () {
  background3.load();
};
let arme = new Image();
arme.src = "./assets/arme.png";
let robot = new Sprite(113, 213, 0, 0, 1, 1);
robot.img.src = "./assets/robot.png";
robot.img.onload = function () {
  robot.load();
};
let robot2 = new Sprite(113, 213, 0, 0, 1, 1);
robot2.img.src = "./assets/robot.png";
robot2.img.onload = function () {
  robot2.load();
};
let bgx = 0;
let bgx2 = 0;
let bgx3 = 0;
let bgs = 1;
let state = 0;
let tirvec = [];
let alitirvec = [];
let alienvec = [];
let robotvec = [];
let beamvec = [];
let newarme = false;
robotvec.push(robot);
robotvec.push(robot2);
let start = false;
let portal = new Sprite(640, 640, background.width * 1.4, cnv.height / 2, 8, 1);
portal.img.src = "./assets/portal.png";
portal.img.onload = function () {
  portal.load();
};
let starto = new Sprite(1920, 1080, 0, 0, 1, 1);
starto.img.src = "./assets/start.png";
starto.img.onload = function () {
  starto.load();
};
portal.slow = 6;
portal.sslow = 6;
let explosionvec = [];
let healthbar = new Sprite(604, 80, 0, 0, 1, 10);
healthbar.img.src = "./assets/healthbar.png";
healthbar.img.onload = function () {
  healthbar.load();
};

let energy = new Sprite(604, 108.83, 0, 0, 1, 6);
energy.img.src = "./assets/energy.png";
energy.img.onload = function () {
  energy.load();
};

let zawarudo = new Sprite(1282, 722.83, 0, 0, 1, 43);
zawarudo.img.src = "./assets/zawarudo.png";
zawarudo.img.onload = function () {
  zawarudo.load();
};

zawarudo.slow = 2;
zawarudo.sslow = 2;

let konodio = new Sprite(960,540, 0, 0, 1, 49);
konodio.img.src = "./assets/konodio.png";
konodio.img.onload = function () {
  konodio.load();
};
konodio.slow = 2;
konodio.sslow = 2;

let teleportation = new Sprite(64, 64, perso.posx, perso.posy, 4, 8);
teleportation.img.src = "./assets/teleportation.png";
teleportation.img.onload = function () {
  teleportation.load();
};

let teleportation2 = new Sprite(960, 540, 0, 0, 1, 54);
teleportation2.img.src = "./assets/teleportation2.png";
teleportation2.img.onload = function () {
  teleportation2.load();
};

teleportation2.slow = 2;
teleportation2.sslow = 2;

let beam = new Sprite(4564, 175, 200, 200, 1, 26);
beam.img.src = "./assets/kamehameha.png";
beam.img.onload = function () {
  beam.load();
};
beam.slow = 2;
beam.sslow = 2;
let beam2 = new Sprite(4564, 175, 0, 0, 1, 26);
beam2.img.src = "./assets/kamehameha.png";
beam2.img.onload = function () {
  beam2.load();
};
beam2.slow = 2;
beam2.sslow = 2;
beamvec.push(beam);
beamvec.push(beam2);

function bgmove(){
  bgx2 -= bgs;
}

function robotdm() {
  for (let i = 0; i < robotvec.length; i++) {
    if (robotvec[i].state == false) {
      if (robotvec[i].hp == 5) {
        if (robotvec[i].posY + 213 <= cnv.height) {
          robotvec[i].posY += 20;
        } else {
          robotvec[i].hp = 4;
        }
      }
      if (robotvec[i].hp == 4) {
        if (robotvec[i].posY >= 0) {
          robotvec[i].posY -= 20;
        } else {
          robotvec[i].hp = 5;
        }
      }
    }
  }
}

function beamcol() {
  for (let i = 0; i < beamvec.length; i++) {
    if (
      perso.posy > beamvec[i].posY + beamvec[i].Ly ||
      perso.posx + 30 < beamvec[i].posX ||
      perso.posy + 58 < beamvec[i].posY ||
      perso.posx > beamvec[i].posX + beamvec[i].Lx
    ) {
      beamvec[i].state = false;
    } else {
      if(robotvec[i].hp != 3){
        if (robotvec[i].state == true) {
          if (beamvec[i].state == false) {
            perso.pv -= 1;
            if (healthbar.anim_id != 9) {
              healthbar.anim_id += 1;
            }
            beamvec[i].state = true;
          }
        }
      }
    }
  }
}

function robotattack() {
  for (let i = 0; i < robotvec.length; i++) {
    if(robotvec[i].hp != 3){
      if (robotvec[i].state == true) {
        beamvec[i].draw();
        if (beamvec[i].anim_id == 25) {
          robotvec[i].state = false;
          beamvec[i].anim_id = 0;
        }
      }
    }
  }
}

function changestate() {
  for (let i = 0; i < robotvec.length; i++) {
    robotvec[i].state = true;
  }
}

function portalhit() {
  if (
    perso.posy > portal.posY + portal.Ly ||
    perso.posx + 30 < portal.posX ||
    perso.posy + 58 < portal.posY ||
    perso.posx > portal.posX + portal.Lx
  ) {
  } else {
    perso.stop();
    if (portal.state == false) {
      portal.state = true;
      teleportation.posX = perso.posx - 20;
      teleportation.posY = perso.posy;
    }
  }
}

function playback() {
  var myAudio = new Audio("./assets/fond.mp3");
  myAudio.play();
}

function scaleZa() {
  zawarudo.hRatio = cnv.width / zawarudo.Lx;
  zawarudo.vRatio = cnv.height / zawarudo.Ly;
  zawarudo.centerShift_x = (cnv.width - zawarudo.Lx * zawarudo.hRatio) / 2;
  zawarudo.centerShift_y = (cnv.height - zawarudo.Ly * zawarudo.vRatio) / 2;
}

function ZaWarudoTokiOTomare() {
  if (zawarudo.state == true) {
    zawarudo.drawScale();
    if (zawarudo.anim_id == 42) {
      zawarudo.state = false;
      zawarudo.anim_id = 0;
    }
  }
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnAlien() {
  let y = getRandom(0, cnv.height - 82);
  let y2 = getRandom(0, cnv.height / 2);
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

function moveAlien(i) {
  alienvec[i].posX -= 5;
}

function backgstop() {
  let z = cnv.width - background.width * 1.4;
  if (bgx == z) {
    bgs = 0;
  }
}

function tirstart() {
  let tir = new Tir(perso.posx + 40, perso.posy + 29);
  tirvec.push(tir);
}

function stoplv2(){
  if(robotvec[0].hp == 3){
    perso.stop();
    teleportation2.posX = perso.posx-480;
    teleportation2.posY = perso.posy-270;
    teleportation2.draw();
    if(teleportation2.anim_id == 52){
      state = 3;
      teleportation2.anim_id = 52;
      perso.restart();
      if (healthbar.anim_id - 5 > 0) {
        healthbar.anim_id -= 5;
      } else {
        healthbar.anim_id = 0;
      }
    }
    dio.posY = cnv.height;
  }
}

function changeattack(){
  dio.attack = 1;
}

function tircol(i) {
  for (let j = 0; j < tirvec.length; j++) {
    if (
      tirvec[j].y > alienvec[i].posY + alienvec[i].Ly ||
      tirvec[j].x + 23 < alienvec[i].posX ||
      tirvec[j].y + 6 < alienvec[i].posY ||
      tirvec[j].x > alienvec[i].posX + alienvec[i].Lx
    ) {
    } else {
      alienvec[i].state = true;
      tirvec.splice(j, 1);
      let explosion = new Sprite(
        68,
        72,
        alienvec[i].posX,
        alienvec[i].posY,
        8,
        1
      );
      explosion.img.src = "./assets/explosion.png";
      explosion.img.onload = function () {
        explosion.load();
      };
      explosion.slow = 5;
      explosion.sslow = 5;
      explosionvec.push(explosion);
      var myAudio = new Audio("./assets/explosion.mp3");
      myAudio.volume = 0.1;
      myAudio.play();
      if (energy.anim_id != 5) {
        energy.anim_id += 1;
      }
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
  if (keysPressed["e"]) {
    if(state == 3){
      if (perso.posy > cnv.height/2-200 + arme.height || perso.posx + 30 < cnv.width/2-200 || perso.posy + 58 < cnv.height/2-200 || perso.posx > cnv.width/2-200 + arme.width){
      }
      else{
        perso.img.src = "./assets/perso2.png";
        newarme = true;
        dio.posY = cnv.height;
      }
    }
  }
  if (keysPressed["Enter"]) {
    if (start == false) {
      playback();
      start = true;
      state = 1;
    }
  }
  if (keysPressed["i"]) {
    if (energy.anim_id == 5) {
      zawarudo.state = true;
      energy.anim_id = 0;
      var myAudio = new Audio("./assets/zawarudo.mp3");
      myAudio.play();
    }
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

function level0(){
  ctx.drawImage(
    background,
    bgx,
    0,
    background.width * 1.4,
    background.height * 1.4
  );
  starto.hRatio = cnv.width / starto.Lx;
  starto.vRatio = cnv.height / starto.Ly;
  starto.centerShift_x = (cnv.width - starto.Lx * starto.hRatio) / 2;
  starto.centerShift_y = (cnv.height - starto.Ly * starto.vRatio) / 2;
  starto.drawScale();
}

function level1() {
  backgstop();
  scaleZa();
  ctx.drawImage(
    background,
    bgx,
    0,
    background.width * 1.4,
    background.height * 1.4
  );
  if (portal.hp == 5) {
    portal.posX = background.width * 1.4 - 400;
    portal.hp = 4;
  }
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

  for (let i = 0; i < alienvec.length; i++) {
    tircol(i);
  }

  for (let i = 0; i < alienvec.length; i++) {
    if (zawarudo.state == true) {
      alienvec[i].posX += 5;
      alienvec[i].slow = 9;
      alienvec[i].sslow = 9;
    }
    alienvec[i].draw();
    moveAlien(i);
    if (alienvec[i].anim_id == 12) {
      if (alienvec[i].slow == 2) {
        let fball = new Sprite(
          32,
          32,
          alienvec[i].posX + 20,
          alienvec[i].posY + 15,
          6,
          1
        );
        fball.img.src = "./assets/fireball.png";
        fball.img.onload = function () {
          fball.load();
        };
        alitirvec.push(fball);
      }
    }
    if (alienvec[i].posX < -82 || alienvec[i].state == true) {
      alienvec.splice(i, 1);
    }
  }

  for (let i = 0; i < alitirvec.length; i++) {
    if (zawarudo.state == true) {
      alitirvec[i].posX += 15;
      alitirvec[i].slow = 9;
      alitirvec[i].sslow = 9;
    }
    if (
      perso.posy > alitirvec[i].posY + alitirvec[i].Ly ||
      perso.posx + 30 < alitirvec[i].posX ||
      perso.posy + 58 < alitirvec[i].posY ||
      perso.posx > alitirvec[i].posX + alitirvec[i].Lx
    ) {
      alitirvec[i].draw();
      alitirvec[i].posX -= 15;
      if (alitirvec[i].posX < -32) {
        if (zawarudo.state == false) {
          alitirvec.splice(i, 1);
        }
      }
    } else {
      perso.pv -= 1;
      if (healthbar.anim_id != 9) {
        healthbar.anim_id += 1;
      }
      if (zawarudo.state == false) {
        alitirvec.splice(i, 1);
      }
    }
  }

  for (let i = 0; i < explosionvec.length; i++) {
    if (explosionvec[i].anim_id == 4) {
      explosionvec.splice(i, 1);
    } else {
      explosionvec[i].draw();
    }
  }

  portalhit();
  if (teleportation.anim_id < 19) {
    feu.draw();
    perso.draw();
  }

  for (let i = 0; i < tirvec.length; i++) {
    tirvec[i].draw(cnv.width);
    tirvec[i].move();
    if (tirvec[i].state == false) {
      tirvec.splice(i, 1);
    }
  }

  if (portal.state == true) {
    teleportation.draw();
  }
  ZaWarudoTokiOTomare();
  healthbar.drawSlice();
  energy.drawSlice();
  if (bgs == 0) {
    clearInterval(alinter);
  }
  if (teleportation.anim_id == 31) {
    state = 2;
    teleportation.anim_id = 1;
    perso.posx = 200;
    perso.posy = 200;
    bgs = 1;
    teleportation.posX = perso.posx - 20;
    teleportation.posY = perso.posy;
    perso.restart();
    if (healthbar.anim_id - 5 > 0) {
      healthbar.anim_id -= 5;
    } else {
      healthbar.anim_id = 0;
    }
    robotvec[0].posX = cnv.width - 113;
    beamvec[0].posX = cnv.width - beam.Lx + 80;
    beamvec[1].posX = cnv.width - beam.Lx + 80;
    robotvec[1].posX = cnv.width - 113;
    robotvec[1].posY = cnv.height - 213;
  }
}

function level2() {
  robotvec[0].posX = cnv.width - 113;
  beamvec[0].posX = cnv.width - beam.Lx + 80;
  beamvec[1].posX = cnv.width - beam.Lx + 80;
  robotvec[1].posX = cnv.width - 113;
  if (bgx2 == cnv.width - background2.width) {
    bgs = 0;
    for(let i = 0; i < robotvec.length;i++){
      robotvec[i].hp = 3;
    }
  }
  bgmove();
  ctx.drawImage(background2, bgx2, 0, background2.width, background2.height);
  perso.limite(cnv.height);
  perso.limite2(0);
  perso.limite3(0);
  perso.limite4(cnv.width);
  perso.setup_gravity();
  feu.posX = perso.posx - 4;
  feu.posY = perso.posy + 40;
  for (let i = 0; i < tirvec.length; i++) {
    tirvec[i].draw(cnv.width);
    tirvec[i].move();
    if (tirvec[i].state == false) {
      tirvec.splice(i, 1);
    }
  }
  stoplv2();
  if (teleportation.anim_id > 19 || teleportation.anim_id > 0) {
    feu.draw();
    perso.draw();
  }
  if (portal.state == true) {
    teleportation.draw();
  }
  if (teleportation.anim_id == 31) {
    portal.state = false;
  }
  robotdm();
  beamvec[0].posY = robotvec[0].posY + 20;
  beamvec[1].posY = robotvec[1].posY + 20;
  robotattack();
  beamcol();
  robotvec[0].draw();
  robotvec[1].draw();
  ZaWarudoTokiOTomare();
  healthbar.drawSlice();
  energy.drawSlice();
}

function level3(){
  background3.hRatio = cnv.width / background3.Lx;
  background3.vRatio = (cnv.height / background3.Ly)*background3.hRatio;
  background3.centerShift_x = (cnv.width - background3.Lx * background3.hRatio) / 2;
  background3.drawScale();
  dio.posX = cnv.width-140;
  dioknife.posX = cnv.width-200;
  if(teleportation2.state == false){
    teleportation2.drawback();
  }
  if(teleportation2.anim_id == 1){
    teleportation2.state = true;
  }
  if(newarme == false){
    ctx.drawImage(
      arme,
      cnv.width/2-200,
      cnv.height/2-200
    );
  }
  if(newarme == true){
    if(bgx3 < 300){
      background3.posY+=1;
      bgx3+=1;
      dio.posY-=1;
      konodio.centerShift_x = cnv.width;
    }
  }
  if(bgx3 == 300){
    if(konodio.state == false){
      konodio.hp = 4;
      konodio.hRatio = cnv.width / konodio.Lx;
      konodio.vRatio = cnv.height / konodio.Ly;
      konodio.centerShift_y = 0;
      konodio.drawScale();
    }
    if(konodio.centerShift_x > 0){
      konodio.centerShift_x -= 100;
    }
    if(konodio.anim_id == 1){
      var myAudio = new Audio("./assets/konodio.mp3");
      myAudio.play();
    }
    if(konodio.anim_id == 48){
      konodio.state = true;
      konodio.hp = 5;
      setTimeout(changeattack, 3000);
      konodio.anim_id = 0;
    }
  }
  perso.limite(cnv.height);
  perso.limite2(0);
  perso.limite3(0);
  perso.limite4(cnv.width);
  if(konodio.hp == 5){
    perso.setup_gravity();
  }
  feu.posX = perso.posx - 4;
  feu.posY = perso.posy + 40;
  for (let i = 0; i < tirvec.length; i++) {
    tirvec[i].draw(cnv.width);
    tirvec[i].move();
    if (tirvec[i].state == false) {
      tirvec.splice(i, 1);
    }
  }
  if(dio.attack == 1){
    if(dioknife.anim_id == 0){
      dioknife.posY = perso.posy;
    }
    if(dioknife.anim_id == 6){
      let knife = new Sprite(173,129,dioknife.posX-173,dioknife.posY,1,1);
      knife.img.src = "./assets/knife.png";
      knife.img.onload = function () {
        knife.load();
      };
      knifevec.push(knife);
    }
    dioknife.draw();
  }
  if(dio.attack == 0){
    dio.draw();
  }
  for(let i = 0 ; i < knifevec.length; i++){
    if (perso.posy > knifevec[i].posY + knifevec[i].Ly || perso.posx + 30 < knifevec[i].posX || perso.posy + 58 < knifevec[i].posY || perso.posx > knifevec[i].posX + knifevec[i].Lx){
      knifevec[i].draw();
      knifevec[i].posX -= 50;
      if(knifevec[i].posX-200 < 0){
        knifevec.splice(i,1);
      }
    }
    else{
      perso.pv -= 1;
      if (healthbar.anim_id != 9) {
        healthbar.anim_id += 1;
      }
      knifevec.splice(i,1);
    }
  }
  feu.draw();
  perso.draw();
  ZaWarudoTokiOTomare();
  healthbar.drawSlice();
  energy.drawSlice();
}

function update() {
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  if (state == 0) {
    level0();
  }
  if (state == 1) {
    level1();
  }
  if (state == 2) {
    level2();
  }
  if (state == 3) {
    level3();
  }
  setTimeout(() => {
    requestAnimationFrame(update);
  }, 1000 / fps);
}

var alinter = setInterval(spawnAlien, 2000);
setInterval(changestate, 3000);
update();
