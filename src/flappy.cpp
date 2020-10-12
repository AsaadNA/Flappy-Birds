#include "headers/flappy.h"

void Flappy::Update(uint32_t animationDelta)
{
   if(currentGameState == PLAYING) 
   {
      if(!letUserStart)
      {
         if(!level->getGameStatus()) level->Update(e,animationDelta);
         else 
         {
            currentGameState = GAMEOVER;
            std::cout << "\nGame Score: " << level->getScoreCount() << "\n";
         }
      } 
   }

   else 
   {
      std::cout << "Press Space to Restart\n";
      level->Restart();
      currentGameState = PLAYING;
      letUserStart = true;
   }
}

void Flappy::Render()
{
   SDL_RenderClear(renderer);
   
   SDL_SetRenderDrawColor(renderer,255,0,0,0);
   level->Render();
   SDL_SetRenderDrawColor(renderer,255,255,255,255);

   SDL_RenderPresent(renderer);
}

void Flappy::Create()
{
   running = true;
   level = new Level(renderer);
}

Flappy::Flappy()
{
   SDL_Init(SDL_INIT_VIDEO);

   window = SDL_CreateWindow("Flappy Birds" , SDL_WINDOWPOS_UNDEFINED , SDL_WINDOWPOS_UNDEFINED , windowWidth , windowHeight,SDL_WINDOW_SHOWN);
   assert(window && "Creating Window");

   renderer = SDL_CreateRenderer(window,0,SDL_RENDERER_ACCELERATED | SDL_RENDERER_PRESENTVSYNC);
   assert(renderer && "Creating Renderer");

   Create();

   while(running)
   {
      animationDelta = (SDL_GetTicks() / 100) % 3;

      if(SDL_PollEvent(&e))
      {
         switch(e.type)
         {
            case SDL_QUIT: {
               running = false;
            } break;

            case SDL_KEYDOWN: {
               if(e.key.keysym.sym == SDLK_SPACE) letUserStart = false; 
            }break;
         }
      }

      Update(animationDelta);
      Render();
   }
}

Flappy::~Flappy()
{
   delete level;
}

//

int main(int argc , char** argv)
{
   Flappy *game = new Flappy();
}