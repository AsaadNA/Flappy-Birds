/*** LEVEL ** */

class Level {

   constructor() {
      this.levelSpeed = 1.5;
      this.mbX1 = 0;
      this.mbX2 = windowWidth; //movingBackgroundX

      this.player = new Player();
  }

   preload() {
      this.movingBackground = loadImage("../res/bg.png");
      this.ground = loadImage("../res/wholeGround.png");
      this.player.preload();
   }

   setup() {
      this.movingBackground.resize(windowWidth,windowHeight);
      this.ground.resize(windowWidth,windowHeight);   
      
      this.player.setup();
   }

   update() {

      /* Updates the moving background */

      if(this.mbX1 <= -windowWidth) { this.mbX1 = windowWidth; }
      if(this.mbX2 <= -windowWidth) { this.mbX2 = windowWidth; }
      this.mbX1 -= this.levelSpeed;
      this.mbX2 -= this.levelSpeed;

      this.player.update();
   }

   render() {
      image(this.movingBackground,this.mbX1,0);
      image(this.movingBackground,this.mbX2,0);
      image(this.ground,0,0);

      this.player.render();
   }
}
