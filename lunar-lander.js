
let stars = [];

function setup() {
createCanvas(600,700);
frameRate(40);
//code for the stars in the background
for (let i = 0; i < 300; i++) {
    const star = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        alpha: Math.random(), 
        snow: Math.random(),
    };
    stars.push(star);
 }

}

//background

function scenery(){
     push(); 
    fill(0, 0, 20);
    rect(0, 0, width, height);
    pop();
   
} 
//the moon
function moon(){
    push();
    fill(166, 166, 166);
    noStroke();
    rect(0, 600, width, height);
    fill(150, 150, 150);
    ellipse(95, 640, 20, 30);
    ellipse(203, 685, 50, 40);
    ellipse(250, 615, 35);
    ellipse(60, 700, 50, 40);
    ellipse(355, 660, 55);
    ellipse(520, 670, 40, 35);
    ellipse(560, 620, 40);
    arc(440, 630, 60, 40, PI, 0);
    fill(100, 100, 100);
    arc(50, 605, 100, 40, PI, 0); 
    arc(470, 600, 80, 40, PI, 0);
     pop();

    }

//plant monster
let normalEyesVisible = true;
let rotationAngle = 0;
function plant(x,y){
     push();
     translate(x, y);
    
     rotate(radians(sin(rotationAngle) * 0.6));//inspired by chatgpt//
    //the body
    fill(0, 140, 0);
    ellipse(200, 300, 100);
    noStroke();
    rect(195, 200, 10, 55, 10);

    beginShape();
    noStroke();
    vertex(180, 140);
    bezierVertex(150, 180, 160, 205, 200, 210);
    vertex(180, 140);
    bezierVertex(250, 170, 220, 200, 200, 210);
    endShape(); 
    stroke(4);
    line(190, 170, 197, 200);

    if (normalEyesVisible) {
        //the normal eyes when you win or game i running
        fill(255, 255, 255);
        noStroke();
        ellipse(180, 290, 30);
        ellipse(220, 290, 30);
        fill(0, 0, 0);
        noStroke();
        ellipse(180, 295, 20);
        ellipse(220, 295, 20);
        fill(255, 255, 255);
        ellipse(182, 300, 7);
        ellipse(218, 300, 7);
    } else {
        // 'X' shapes for eyes when the game is lost
        stroke(255, 0, 0);
        strokeWeight(3);

        line(170, 280, 190, 300);
        line(170, 300, 190, 280);

        line(210, 280, 230, 300);
        line(210, 300, 230, 280);

        noStroke();
    }

    //mouth
    fill(0, 80, 0);  
    arc(200, 320, 40, 40, TWO_PI, PI);
    fill(160, 0, 0);
    ellipse(200, 336, 20, 7);
    pop();

    rotationAngle += 0.2;

}

// 
let gameIsRunning = false;
let plantY = 100;
let velocity = 0.5;
const acceleration = 0.1;
let softLanding = false; 
let gameEnd = false;
let gameState = "start";
//

//the reset/klick functions
function resetGame(){
    plantY = 0;
    gameIsRunning = true;
    gameEnd = false;
    normalEyesVisible = true;
}  

function mousePressed(){
  if (!gameIsRunning){ 
    gameState = "running";
    resetGame();
  }  
}  
  
//startscreen 
function startScreen(){
    scenery();
    
    textSize(50); 
    fill(255, 0, 255);  
    text("Press to start!", 150, 230);  

    textSize(50);
    fill(0, 255, 0);
    text("PLANT LANDER", 130, 150);
}  


   
//the draw function
function draw(){
    scenery();

//switch between states in the game
   if (gameState === "start"){
    startScreen();
   } else if (gameState === "running"){
    gameIsRunning = true;
   } else if (gameState === "end"){
    gameIsRunning = false;
    gameEnd  = true;
   }

   for (let star of stars) {
    fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 255);
    ellipse(star.x, star.y, 3);
    star.alpha = star.alpha;
    star.y += star.snow;     

    if(star.y > height){
        star.y = 0; 
    } 
}  
   moon();  
   plant(100, plantY);  

//to make it fly
     if (gameIsRunning === true){
        plantY = plantY + velocity;
        velocity = velocity + acceleration;  

    if (keyIsDown (32)) {
        velocity = velocity - acceleration*3;
    }  
 } 
 
 //When you die/win/end the game
    if (plantY >= 250){
        softLanding = velocity < 2; //Inspired by chatgpt//
        gameIsRunning = false;
        gameEnd = true;
        gameState = "end";
         
        textSize(50);
        if (softLanding) {
            roots = true;
            fill(0, 255, 0);
            text("WIN!", 250, 300);
            textSize (30);
            text("Press to restart", 200, 340);
            console.log("win");
        } else {
            normalEyesVisible = false;
            fill(255, 0, 0);
            text("GAME OVER!", 160, 300);
            textSize (30);
            text("Press to restart", 200, 340);
            console.log("game over");
        } 
    } 
  }  
   
   