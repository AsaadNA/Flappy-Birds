class Player {

   constructor() {
      this.x = 40;
      this.y = windowHeight / 2;

      this.animation = [];
      this.playerAnimationIndex = 0;
      this.playerAnimationSpeed = 0.2;

      this.gravity = 0.6;
      this.velocity = 0.0;
      this.lift = 9.8;

      //Defining the collision boundary for the birdy....
      this.playerCollisionRect = new customRect(this.x,this.y,41,29);
   }

   getPlayerRect() { return this.playerCollisionRect; }

   reset() {
      this.x = 40;
      this.y = windowHeight/2;
      this.playerCollisionRect.y = windowHeight/2;
   }
   
   preload() {
      this.playerSprite = loadImage("../res/bird.png");
      this.playerAnimationData = loadJSON('./js/data/playerAnimation.json');
   }

   setup() {
      let frames = this.playerAnimationData.frames;
      for (let i = 0; i <= frames.length - 1; i++) {
         let position = frames[i].position;
         let subImg = this.playerSprite.get(position.x, position.y, position.w, position.h);
         this.animation.push(subImg);
      }
   }

   keyPressed() {
      if (keyCode === 32) {
         this.velocity -= this.lift;
      }
   }

   animate() {
      this.playerAnimationIndex += this.playerAnimationSpeed;
   }

   update() {
      this.animate();
      this.velocity += this.gravity;
      this.y += this.velocity;

      //Updating collision rects of the player;
      this.playerCollisionRect.x = this.x; this.playerCollisionRect.y = this.y;
   }

   renderDebug() {
      rect(this.playerCollisionRect.x,this.playerCollisionRect.y,this.playerCollisionRect.w,this.playerCollisionRect.h);
   }

   render() {
      let index = floor(this.playerAnimationIndex) % this.animation.length;
      image(this.animation[index], this.x, this.y);
   }
}
