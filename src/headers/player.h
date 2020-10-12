#ifndef PLAYER_H
#define PLAYER_H

#include <SDL2/sdl.h>
#include <SDL2/sdl_image.h>

#include <assert.h>
#include <iostream>
#include <stdint.h>

class Player {

public:

   Player(SDL_Renderer* renderer);

   void Update(SDL_Event& e,uint32_t animationDelta);
   void Render();
   void Restart();

   SDL_Rect& getRect();

private:

   SDL_Renderer* renderer = nullptr;

private:
   
   const int spriteCount = 3;

   float xPos = 100.0f;
   float yPos = 315.0f;
   const float constYPos = yPos;

   float gravity = 0.52f;
   float velocity = 0.0f;
   float lift = 11.0f;
   float airResistance = 0.9f;

   int updwardBounds = 20;
   int downwardBounds = 876;

   SDL_Texture *texture = nullptr;
   
   SDL_Rect textureRect;
   SDL_Rect sourceRect;
   SDL_Rect collisionRect;

   float rotationAngle = 0.0f;
   float maxAngle = 20.0f;

};

#endif