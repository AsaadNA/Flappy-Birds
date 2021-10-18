function genRandomNumber(min, max) {
   return Math.random() * (max - min) + min;
}

class vec2 {
   constructor(x,y) {
      this.x = x; this.y = y;
   }
}

class Pipe {

   
   constructor(x) {
      
      this.givenXPos = x;
      this.levelSpeed = 1.5;
      
      this.dpPosition = new vec2();
      this.upPosition = new vec2();
      
      this.upPosition.x = x;
      this.dpPosition.x = x;
      
      this.generateRandomizedPipes(50);
   }
   
   getLevelSpeed() { return this.levelSpeed; }
   
   generateRandomizedPipes(pipeGap) {
      let y = genRandomNumber(10,220);
      this.upPosition.y = -y;
      let leftOver = 400 - (y-pipeGap);
      this.dpPosition.y = leftOver;
   }

   preload() {
      this.upwardPipe   = loadImage("../res/upwardPipe.png")
      this.downwardPipe = loadImage("../res/downwardPip.png");
   }

   update() {

      //Only need to check one pipe since both pipes move at same speed;
      if(this.upPosition.x <= -104) {
         this.upPosition.x = 400; this.dpPosition.x = 400; //Reseting the position of the pipes;
         this.generateRandomizedPipes(50);
      }

      this.upPosition.x -= this.levelSpeed;
      this.dpPosition.x -= this.levelSpeed;
   }

   render() {
      image(this.upwardPipe,this.upPosition.x,this.upPosition.y);
      image(this.downwardPipe,this.dpPosition.x,this.dpPosition.y);
   }

}