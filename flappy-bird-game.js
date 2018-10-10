const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");


//load images
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//variables
let gap = 85;
let constant = pipeNorth.height + gap;

let birdX = 10;
let birdY = 150;

let gravity = 1.5;

let score = 0;

let fly = new Audio();
let point = new Audio();

//sounds

fly.src = "sounds/fly.mp3";
point.src = "sounds/score.mp3";

document.addEventListener("keydown", moveUp);

function moveUp() {
  birdY -= 25;
  fly.play();
}

let pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0
}

function draw() {

  ctx.drawImage(bg, 0, 0);

for(let i = 0; i < pipe.length; i++){
  ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
  ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

  pipe[i].x--;

  if(pipe[i].x == 125) {
    pipe.push({
      x: cvs.width,
      y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
    });
  }

  if(birdX + bird.width >= pipe[i].x &&
    birdX <= pipe[i].x + pipeNorth.width &&
    (birdY <= pipe[i].y + pipeNorth.height ||
      birdY + bird.height >= pipe[i].y+constant) ||
    birdY + bird.height >= cvs.height - fg.height){
      location.reload();
      setTimeout(1000);
      screaming_hawk.play();
    }

    if(pipe[i].x == 5) {
      score++;
      point.play();
    }
}

  ctx.drawImage(fg, 0, cvs.height - fg.height);

  ctx.drawImage(bird, birdX, birdY);

  birdY += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score: "+ score, 10, cvs.height - 20);

  requestAnimationFrame(draw);

}

draw();
