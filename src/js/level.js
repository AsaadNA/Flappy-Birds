class Level {

   constructor() {
      this.mbX1 = 0;
      this.mbX2 = windowWidth; //movingBackgroundX

      this.player = new Player();

      this.pipeArr = [];
      this.pipeArr.push(new Pipe(200,1.5));
      this.pipeArr.push(new Pipe(450,1.5));

      this.levelSpeed = this.pipeArr[0].getLevelSpeed();
      
      this.hasGameStarted = false;
      this.isDebugOn = false; 
   }

   preload() {
      this.movingBackground = loadImage("../res/bg.png");
      this.ground = loadImage("../res/wholeGround.png");
      this.player.preload();
      this.pipeArr.forEach(pipe => {
         pipe.preload();
      });
   }

   setup() {
      this.movingBackground.resize(windowWidth, windowHeight);
      this.ground.resize(windowWidth, windowHeight);
      this.player.setup();
   }

   keyPressed() {
      if(keyCode === 32) { if (this.hasGameStarted === false) { this.hasGameStarted = true; }} //this is the space; 
      if(this.hasGameStarted) { this.player.keyPressed(); }
      if(keyCode === 112) { this.isDebugOn = this.isDebugOn ? false : true; } //this is debug mode toggling
   }

   levelReset() {
      this.hasGameStarted = false;
      this.player.reset();
      this.pipeArr.forEach((pipe) => {
         pipe.reset();
      })
   }

   update() {

      if(!this.hasGameStarted) { this.player.animate(); } //this just animates the player even though the game has not started

      //this updates the moving background .. infinitly
      if (this.mbX1 <= -windowWidth) { this.mbX1 = windowWidth; }
      if (this.mbX2 <= -windowWidth) { this.mbX2 = windowWidth; }
      this.mbX1 -= this.levelSpeed;
      this.mbX2 -= this.levelSpeed;

      //updates the player and the pipes
      if (this.hasGameStarted) {
         this.player.update();
         this.pipeArr.forEach(pipe => {
            if(pipe.checkCollision(this.player.getPlayerRect())) { this.levelReset(); }
            pipe.update();
         });
      }
   }

   render() {
      image(this.movingBackground, this.mbX1, 0);
      image(this.movingBackground, this.mbX2, 0);
      this.pipeArr.forEach(pipe => {
         if(this.isDebugOn) { pipe.renderDebug(); } //Checking for debug mode toggle 
         pipe.render();
      }); image(this.ground, 0, 0);
      if(this.isDebugOn) {
         this.player.renderDebug();
      } this.player.render();
   }
}
