class Pipe {

   constructor(x, levelSpeed) {
      this.givenXPos = x;
      this.levelSpeed = levelSpeed;

      //Params for the lower pipe
      this.dpPosition = new customRect(x,0,63,360);
      this.dpCollisionRect = new customRect(this.dpPosition.x,0,63,360);

      //Params for the upper pipe
      this.upPosition = new customRect(x,0,63,360);
      this.upCollisionRect = new customRect(this.upPosition.x,0,63,360);
      
      this.generateRandomizedPipes(70);
   }

   getUpRect() { return this.upCollisionRect;}
   getDpRect() { return this.dpCollisionRect; }
   getLevelSpeed() { return this.levelSpeed; }

   generateRandomizedPipes(pipeGap) {
      let y = genRandomNumber(10, 220);

      //Upward pipe
      this.upPosition.y = -y;
      this.upCollisionRect.y = this.upPosition.y;

      let leftOver = 400 - (y - pipeGap);

      //Downward pipe
      this.dpPosition.y = leftOver;
      this.dpCollisionRect.y = this.dpPosition.y;
   }

   reset() {
      this.upPosition.x = this.givenXPos;
      this.dpPosition.x = this.givenXPos;
      this.dpCollisionRect.x = this.dpPosition.x;
      this.upCollisionRect.x = this.upCollisionRect.x;
   }

   preload() {
      this.upwardPipe = loadImage("../res/upwardPipe.png")
      this.downwardPipe = loadImage("../res/downwardPip.png");

      //Again manually feeding the size of the pipe image...
      this.dpCollisionRect.w = 63;
      this.dpCollisionRect.h = 360;
      this.upCollisionRect.w = 63;
      this.upCollisionRect.h = 360;
   }

   checkCollision(playerRect) {
      return (didCollide(this.dpCollisionRect,playerRect) || didCollide(this.upCollisionRect,playerRect));
   }

   update() {

      //Only need to check one pipe since both pipes move at same speed;
      if (this.upPosition.x <= -104) {
         this.upPosition.x = 400; this.dpPosition.x = 400; //Reseting the position of the pipes;
         this.generateRandomizedPipes(50);
      }

      this.upPosition.x -= this.levelSpeed; this.upCollisionRect.x = this.upPosition.x;
      this.dpPosition.x -= this.levelSpeed; this.dpCollisionRect.x = this.dpPosition.x;
   }

   renderDebug() {
      rect(this.dpCollisionRect.x, this.dpCollisionRect.y, this.dpCollisionRect.w, this.dpCollisionRect.h);
      rect(this.upCollisionRect.x, this.upCollisionRect.y, this.upCollisionRect.w, this.upCollisionRect.h);
   }

   render() {
      image(this.upwardPipe, this.upPosition.x, this.upPosition.y);
      image(this.downwardPipe, this.dpPosition.x, this.dpPosition.y);
   }
}