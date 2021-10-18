let windowWidth = 400;
let windowHeight = 650;

class customRect { 
   constructor(x,y,w,h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
   }
}

function genRandomNumber(min, max) {
   return Math.random() * (max - min) + min;
}

function didCollide(rect1,rect2) {
   var x1 = rect2.x, y1 = rect2.y, x2 = x1 + rect2.w, y2 = y1 + rect2.h;
   if (rect1.x > x1) { x1 = rect1.x; }
   if (rect1.y > y1) { y1 = rect1.y; }
   if (rect1.x + rect1.w < x2) { x2 = rect1.x + rect1.w; }
   if (rect1.y + rect1.h < y2) { y2 = rect1.y + rect1.h; }
   return (x2 <= x1 || y2 <= y1) ? false : { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
}