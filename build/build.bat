@echo off
cls
g++ ../src/flappy.cpp ../src/player.cpp ../src/level.cpp -o "Flappy Bird" -std=c++11 -lmingw32 -lsdl2main -lsdl2_image -lsdl2 -lsdl2_ttf -lsdl2_mixer
