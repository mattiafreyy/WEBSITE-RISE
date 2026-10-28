/* Camera projection checks against bounds exported from the original Blender scene. */
const assert=require('node:assert/strict');
const M=require('../motion.js'),projection=require('../qa/mobile-room-aperture.json');
let passed=0;
for(const [w,h] of [[360,740],[375,667],[390,844],[430,932]]){
 let prior=Infinity;
 for(let i=0;i<=100;i++){
 const p=i/100,r=M.room(p,w,h);
 for(const k of ['x','y','w','h']){assert.equal(r.screen[k],projection.screen[k]);passed++;}
 assert(r.scale<=prior,'camera pulls back without reversal');prior=r.scale;passed++;
 const left=w/2+(r.screen.x-r.originX)*r.imageW*r.scale,right=w/2+(r.screen.x+r.screen.w-r.originX)*r.imageW*r.scale;
 assert(left>=12&&right<=w-12,'portrait TV has horizontal breathing room');passed++;
 assert(Math.abs((r.imageW*r.screen.w)/(r.imageH*r.screen.h)-9/16)<.00001,'mobile aperture is genuinely 9:16');passed++;
 assert(w/2-r.originX*r.imageW*r.scale<=.001&&w/2+(1-r.originX)*r.imageW*r.scale>=w-.001,'no empty side edges');passed++;
 if(p>=.9){const b=projection.sculpture_bounds;
 const x=w/2+(b.x-r.originX)*r.imageW*r.scale,y=h/2+(b.y-r.originY)*r.imageH*r.scale;
 assert(x>=12&&x+b.w*r.imageW*r.scale<=w-12&&y>=0&&y+b.h*r.imageH*r.scale<=h,'pullback reveals the complete sculpture and pedestal');passed++;
 }
 }
 assert(M.room(0,w,h).scale/M.room(1,w,h).scale>=1.7,'substantial visible pullback');passed++;
 assert(M.room(.8,w,h).scale-M.room(.95,w,h).scale>.05,'camera keeps moving through the later scene');passed++;
}
console.log(JSON.stringify({passed,coverage:'4 phones × 101 positions: vertical aperture, margins, continuous pullback, no empty edges, sculpture reveal'},null,2));
