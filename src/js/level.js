/*** LEVEL ** */

class Level {

   constructor() {
      this.mbX1 = 0;
      this.mbX2 = windowWidth; //movingBackgroundX

      this.player = new Player();
   
      this.pipeArr = [];
      this.pipeArr.push(new Pipe(200));
      this.pipeArr.push(new Pipe(450));
      
      this.levelSpeed = this.pipeArr[0].getLevelSpeed();
      this.hasGameStarted = false;
  }

   preload() {
      this.movingBackground = loadImage("../res/bg.png");
      this.ground           = loadImage("../res/wholeGround.png");
      this.player.preload();
      this.pipeArr.forEach(pipe => {
         pipe.preload();
      });   
   }

   setup() {
      this.movingBackground.resize(windowWidth,windowHeight);
      this.ground.resize(windowWidth,windowHeight);   
      this.player.setup();
   }

   keyPressed() {
      if(keyCode === 32) {
         if(this.hasGameStarted === false) { this.hasGameStarted = true; }
      } if(this.hasGameStarted) { this.player.keyPressed(); }
   }

   update() {

      if (this.hasGameStarted) {

         /* Updates the moving background */

         if (this.mbX1 <= -windowWidth) { this.mbX1 = windowWidth; }
         if (this.mbX2 <= -windowWidth) { this.mbX2 = windowWidth; }
         this.mbX1 -= this.levelSpeed;
         this.mbX2 -= this.levelSpeed;

         this.player.update();
         this.pipeArr.forEach(pipe => {
            pipe.update();
         });
      }
   }

   render() {
      image(this.movingBackground,this.mbX1,0);
      image(this.movingBackground,this.mbX2,0);
      //this.pipes.render();
      this.pipeArr.forEach(pipe => {
         pipe.render();
      });
      
      image(this.ground,0,0);
      this.player.render();
   }
}
