#ifndef UTILS_H
#define UTILS_H

#include <SDL2/sdl.h>
#include <SDL2/sdl_image.h>

#include <time.h>
#include <random>

class Utils {

public:

   SDL_Texture* LoadTexture(SDL_Renderer* r, const char* p,int* w , int* h)
   {
      SDL_Texture *texture = IMG_LoadTexture(r,p);
      if(!texture) std::cout << p << "\n";
      assert(texture);
      SDL_QueryTexture(texture,NULL,NULL,w,h);
      return texture;
   }

   int GenerateRandomNumber(int min , int max)
   {
      static bool first = true;
      if (first) 
      {  
         srand(time(NULL));
         first = false;
      } return min + rand() % (( max + 1 ) - min);
   }

};

#endif