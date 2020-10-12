#include "headers/level.h"

Level::Level(SDL_Renderer* renderer)
{
   this->renderer = renderer;

   staticRect.x = 0; staticRect.y = 0;
   staticBackground = utils.LoadTexture(renderer,"res/still.png",&staticRect.w, &staticRect.h);

   player = new Player(this->renderer);

   pipes.push_back(new Pipe(this->renderer,500));
   pipes.push_back(new Pipe(this->renderer,896));
   pipes.push_back(new Pipe(this->renderer,896+(896-550)));

   groundSpeed = pipes[0]->getPipeSpeed();
   groundRectOne.x = 0; groundRectOne.y = 0;
   groundTexture = utils.LoadTexture(renderer,"res/wholeGround.png",&groundRectOne.w,&groundRectOne.h);

   groundRectTwo = groundRectOne;
   groundRectTwo.x = 768;
}

void Level::UpdateGround()
{
   if(groundRectOne.x <= -768)
      groundRectOne.x = 768;
   else if(groundRectTwo.x <= -768)
      groundRectTwo.x = 768;

   groundRectOne.x -= groundSpeed;
   groundRectTwo.x -= groundSpeed;
}

void Level::Update(SDL_Event& e,uint32_t animationDelta)
{
   player->Update(e,animationDelta);

   for(auto & pipe : pipes) 
   {
      if(pipe->isColliding(player->getRect())) isGameOver = true;
      if(pipe->hasPassed(player->getRect())) scoreCount += 1;
      pipe->Update();
   }

   UpdateGround();
}

void Level::Restart()
{
   isGameOver = false;
   player->Restart();
   scoreCount = 0;
   for(auto & pipe : pipes) pipe->Restart();
}

void Level::Render()
{  
   SDL_RenderCopy(renderer,staticBackground,NULL,&staticRect);
   
   for(auto & pipe : pipes) pipe->Render();

   SDL_RenderCopy(renderer,groundTexture,NULL,&groundRectOne);
   SDL_RenderCopy(renderer,groundTexture,NULL,&groundRectTwo);

   player->Render();
}

Level::~Level()
{
   delete player;
   pipes.clear();
}