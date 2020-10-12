#ifndef LEVEL_H
#define LEVEL_H

#include "player.h"
#include "pipe.h"

#include <vector>

class Level {

public:

    Level(SDL_Renderer* renderer);
   ~Level();

   void Update(SDL_Event& e,uint32_t animationDelta);
   void Render();
   void Restart();
   void UpdateGround();

   bool getGameStatus() {
      return isGameOver;
   }

   int getScoreCount() {
      return scoreCount;
   }

private:

   SDL_Texture* staticBackground = nullptr;
   SDL_Rect staticRect;

   SDL_Texture* groundTexture = nullptr;
   SDL_Rect groundRectOne;
   SDL_Rect groundRectTwo;
   int groundSpeed = 0;

private:

   int scoreCount = 0;
   bool isGameOver = false;

   SDL_Renderer* renderer = nullptr;

   Utils utils;

   Player *player = nullptr;
   Pipe* testPipe = nullptr;

   std::vector<Pipe*> pipes;

};

#endif