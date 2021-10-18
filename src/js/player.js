let windowWidth = 400;
let windowHeight = 650;

class Player {

   constructor() {
      this.x = 40;
      this.y = windowHeight/2;

      this.animation = [];
      this.playerAnimationIndex = 0;
      this.playerAnimationSpeed = 0.2;

      this.gravity = 0.6;
      this.velocity = 0.0;
      this.lift = 9.8;
   }

   preload() {
      this.playerSprite = loadImage("../res/bird.png");
      this.playerAnimationData = loadJSON('./js/data/playerAnimation.json');
   }

   setup() {
      let frames = this.playerAnimationData.frames;
      for(let i = 0; i <= frames.length-1; i++) {
         let position = frames[i].position;
         let subImg = this.playerSprite.get(position.x,position.y,position.w,position.h);
         this.animation.push(subImg);
      }
  }

  keyPressed() {
     if(keyCode === 32) {
        this.velocity -= this.lift;
     }
  }

   update() {
      this.playerAnimationIndex += this.playerAnimationSpeed;
      this.velocity += this.gravity;
      this.y += this.velocity;
    }

   render() {
      let index = floor(this.playerAnimationIndex) % this.animation.length;
      image(this.animation[index],this.x,this.y);
   }

}
