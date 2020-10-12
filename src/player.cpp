#include "headers/player.h"

Player::Player(SDL_Renderer* renderer)
{
   this->renderer = renderer;

   texture = IMG_LoadTexture(renderer,"res/bird.png");
   assert(texture && "Loading bird texture");
   SDL_QueryTexture(texture,NULL,NULL,&textureRect.w,&textureRect.h);

   textureRect.x = xPos;
   textureRect.y = yPos;
   textureRect.w /= spriteCount;

   sourceRect.x = 0;
   sourceRect.y = 0;
   sourceRect.w = textureRect.w;
   sourceRect.h = textureRect.h;

   collisionRect = textureRect;
   collisionRect.w -= 10;
   collisionRect.h -= 9;
}

void Player::Restart()
{
   textureRect.x = xPos;
   textureRect.y = constYPos;
   collisionRect.y = constYPos;
   rotationAngle = 0.0f;
}

void Player::Update(SDL_Event& e,uint32_t animationDelta)
{
   sourceRect.x = textureRect.w * animationDelta;

   if(e.type == SDL_KEYDOWN && e.key.repeat == 0)
   {
      switch(e.key.keysym.sym)
      {
         case SDLK_SPACE: {
            velocity -= lift;
            if(rotationAngle != maxAngle)
               rotationAngle = -maxAngle;
            else 
               rotationAngle = 0.0f;
         } break;
      }
   } else if(e.type == SDL_KEYUP) { if(rotationAngle <= 90.0f) rotationAngle += 1.8f;}

   velocity += gravity;
   textureRect.y += velocity;

   //Add a lil bit of air resistance when player reaches that upward threshold
   if(textureRect.y < updwardBounds) {
      velocity *= airResistance;
   }

   if(textureRect.y > downwardBounds) {
      velocity = 0;
      textureRect.y = downwardBounds;
   }

   collisionRect.y = textureRect.y;
}

SDL_Rect& Player::getRect() 
{ 
   return collisionRect; 
}

void Player::Render()
{
   //SDL_RenderDrawRect(renderer,&collisionRect);
   SDL_RenderCopyEx(renderer,texture,&sourceRect,&textureRect,rotationAngle,NULL,SDL_FLIP_NONE);
}