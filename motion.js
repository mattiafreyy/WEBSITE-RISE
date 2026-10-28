/* All scene geometry is deterministic and reversible. No wheel interception. */
(function(root){
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const lerp=(a,b,t)=>a+(b-a)*t;
const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
const interval=(p,a,b)=>clamp((p-a)/(b-a));

// Observed camera path: fast middle pullback, then a nearly imperceptible tail.
const roomKeys=[[0,3.4],[.0668,3.1212],[.1388,2.4611],[.2109,1.9569],[.283,1.5877],[.355,1.3324],[.427,1.1701],[.499,1.0796],[.571,1.04],[.643,1.0303],[.787,1.0145],[.931,1.0015],[1,1]];
function sampleCurve(keys,p,column=1){
 p=clamp(p);let k=keys.findIndex((v,i)=>i&&v[0]>=p);if(k<1)k=keys.length-1;
 const a=keys[k-1],b=keys[k],span=b[0]-a[0],t=interval(p,a[0],b[0]);
 const slope=i=>(keys[i+1][column]-keys[i][column])/(keys[i+1][0]-keys[i][0]);
 const tangent=i=>{if(i===0)return slope(0);if(i===keys.length-1)return slope(i-1);const left=slope(i-1),right=slope(i);if(left*right<=0)return 0;return 2*left*right/(left+right)};
 const t2=t*t,t3=t2*t;return(2*t3-3*t2+1)*a[column]+(t3-2*t2+t)*span*tangent(k-1)+(-2*t3+3*t2)*b[column]+(t3-t2)*span*tangent(k);
}
function roomProgress(p){return 1-(sampleCurve(roomKeys,p)-1)/2.4}
function room(p,w,h){
 const mobile=w<=700;
 const imageW=mobile?Math.max(w/.876,h/2):Math.max(w,h*16/9),imageH=imageW*(mobile?2:9/16);
 const screen=mobile?{x:.3547390103340149,y:.43023377656936646,w:.48074471950531006,h:.13520944118499756}:{x:.34323543310165405,y:.33822327852249146,w:.3135291337966919,h:.3135290741920471};
 const fullScale=mobile?1.02:Math.max(w/(imageW*screen.w),h/(imageH*screen.h))*1.068;
 const t=roomProgress(p);
 return {scale:lerp(fullScale,1,t),imageW,imageH,originX:mobile?.438:screen.x+screen.w/2,originY:mobile?.5:screen.y+screen.h/2,hold:p>=.72,screen};
}
function cards(p,index,h){const center=.5076+index*.1984;const local=(p-center)/.1984;return {x:[-15,19,-12,16][index],y:local*-h*1.3,angle:clamp(local,-1,1)*-15*(index%2?-1:1),opacity:1-clamp((Math.abs(local)-.85)/.35),scale:1-Math.min(.025,Math.abs(local)*.01)}}
function finale(p,w,h){
 const keys=[[0,.7,-155,-.04,.60],[.074,1.1,-123.5,-.06,.41],[.162,1.2,-20.8,-.13,.02],[.25,2.565,3.65,-.12,-.03],[.338,4.516,8.2,-.09,-.02],[.426,6.473,12.77,-.02,0],[.515,25.794,14,0,0],[.60,Math.max(w,h)/100*4,14,0,0],[1,Math.max(w,h)/100*4,14,0,0]];
 let k=keys.findIndex((v,i)=>i&&v[0]>=p);if(k<1)k=keys.length-1;const a=keys[k-1],b=keys[k],t=interval(p,a[0],b[0]);
 return{scale:sampleCurve(keys,p,1),rotation:sampleCurve(keys,p,2),x:sampleCurve(keys,p,3)*w,y:sampleCurve(keys,p,4)*h,opacity:smooth(interval(p,.015,.07)),panel:smooth(interval(p,.65,1))};
}
function skew(v){return clamp(-v*.13,-5.5,5.5)}
const api={clamp,lerp,smooth,interval,room,cards,finale,skew};root.DelreyMotion=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
