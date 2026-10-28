/* Camera projection checks against bounds exported from the original Blender scene. */
const assert=require('node:assert/strict');
const M=require('../motion.js'),projection=require('../qa/mobile-room-aperture.json');
let passed=0;
for(const [w,h] of [[360,740],[375,667],[390,844],[430,932]])for(let i=0;i<=100;i++){
 const r=M.room(i/100,w,h);
 for(const k of ['x','y','w','h']){assert.equal(r.screen[k],projection.screen[k]);passed++;}
 const b=projection.sculpture_bounds;
 const left=w/2+(b.x-r.originX)*r.imageW*r.scale;
 const right=w/2+(b.x+b.w-r.originX)*r.imageW*r.scale;
 const top=h/2+(b.y-r.originY)*r.imageH*r.scale;
 const bottom=h/2+(b.y+b.h-r.originY)*r.imageH*r.scale;
 assert(left>=12&&right<=w-12&&top>=0&&bottom<=h,'complete sculpture and pedestal visible');passed++;
 const screenRight=w/2+(r.screen.x+r.screen.w-r.originX)*r.imageW*r.scale;
 assert(screenRight<=w-12,'screen right margin');passed++;
 assert(r.screen.w*r.imageW*r.scale<=w*.6,'screen under 60 percent of viewport');passed++;
 assert(Math.abs((r.imageW*r.screen.w)/(r.imageH*r.screen.h)-16/9)<.00001,'film aperture remains 16:9');passed++;
}
console.log(JSON.stringify({passed,coverage:'4 phone viewports × 101 camera positions: sculpture visibility, TV margins, exported aperture registration and film aspect ratio'},null,2));
