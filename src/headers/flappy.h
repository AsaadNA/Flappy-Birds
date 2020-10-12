#ifndef FLAPPY_H
#define FLAPPY_H

#include "level.h"

class Flappy {

public:

    Flappy();
   ~Flappy();

private:

   void Create();
   void Update(uint32_t animationDelta);
   void Render();

private:

   SDL_Window* window = nullptr;
   SDL_Renderer* renderer = nullptr;

   SDL_Event e;

   const int windowWidth = 768;
   const int windowHeight = 896;

   uint32_t animationDelta;

   bool running = false;
   bool letUserStart = true;

   enum gameStates
   {
      PLAYING,
      GAMEOVER
   };

   gameStates currentGameState = PLAYING;

private:

   Level* level = nullptr;

};

#endif