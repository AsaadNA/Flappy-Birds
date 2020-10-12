#ifndef PIPE_H
#define PIPE_H

#include "utils.h"

class Pipe {

public:

   Pipe(SDL_Renderer* renderer , int x)
   {
      givenXPos = x;

      this->renderer = renderer;
      pipeTexture = utils.LoadTexture(renderer,"res/pipe.png",&updawardPipe.w,&updawardPipe.h);

      downwardPipe.w = updawardPipe.w;
      downwardPipe.h = updawardPipe.h;

      updawardPipe.x = x;
      downwardPipe.x = updawardPipe.x;

      //Lowest 120
      //Highest 726

      int y = utils.GenerateRandomNumber(120,650);

      updawardPipe.y = -y;
      int leftOver = windowWidth - (y - pipeGap);
      downwardPipe.y = leftOver;
      
      collisionRectUpdward = updawardPipe;
      collisionRectDownward = downwardPipe;
   }

   bool hasPassed(SDL_Rect r) 
   {
      return (updawardPipe.x+12 == r.x);
   }

   int getPipeSpeed() { return pipeSpeed; }

   void Restart()
   {
      updawardPipe.x = givenXPos;
      downwardPipe.x = givenXPos;
      collisionRectUpdward.x = updawardPipe.x;
      collisionRectDownward.x = downwardPipe.x;
   }

   void Update()
   {
      if(updawardPipe.x <= -200)
      {
         updawardPipe.x = windowWidth;
         downwardPipe.x = windowWidth;
         collisionRectDownward.x = windowWidth;
         collisionRectUpdward.x = windowWidth;
      }

      updawardPipe.x -= pipeSpeed;
      downwardPipe.x -= pipeSpeed;

      collisionRectUpdward.x = updawardPipe.x;
      collisionRectDownward.x = downwardPipe.x;
   }
   
   bool isColliding(SDL_Rect& rect)
   {
      return (SDL_HasIntersection(&collisionRectUpdward,&rect) || SDL_HasIntersection(&collisionRectDownward,&rect));
   }

   void Render()
   {
      //SDL_RenderDrawRect(renderer,&collisionRectUpdward);
      SDL_RenderCopyEx(renderer,pipeTexture,NULL,&updawardPipe,0.0f,NULL,SDL_FLIP_VERTICAL);
      //SDL_RenderDrawRect(renderer,&collisionRectDownward);
      SDL_RenderCopyEx(renderer,pipeTexture,NULL,&downwardPipe,0.0f,NULL,SDL_FLIP_NONE);
   }

private:

   const int pipeGap = 50;
   const int windowWidth = 896;
         int pipeSpeed = 2.50f;
         int givenXPos = 0;

   Utils utils;

   SDL_Renderer* renderer;
   SDL_Texture* pipeTexture;
   SDL_Rect updawardPipe , downwardPipe;
   SDL_Rect collisionRectUpdward , collisionRectDownward;
};

#endif