/* Renderer lifecycle tests with a mock GL API. These do not verify GPU appearance. */
const fs=require('fs'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const code=fs.readFileSync(require('path').join(__dirname,'../brand-scene.js'),'utf8');
let assertions=0;const ok=(value,message)=>{assert(value,message);assertions++};
async function scene(mode){
 const dom=new JSDOM('<div id="brand-object"><canvas id="brand-canvas"></canvas></div>',{runScripts:'outside-only'}),w=dom.window,d=w.document;let draws=0;if(mode!=='prerender-default')d.getElementById('brand-object').dataset.rendererMode='webgl';
 Object.defineProperty(d,'hidden',{value:false,writable:true});Object.defineProperty(w,'devicePixelRatio',{value:3});
 const gl={VERTEX_SHADER:1,FRAGMENT_SHADER:2,COMPILE_STATUS:3,LINK_STATUS:4,createShader:type=>({type}),shaderSource(){},compileShader(){},getShaderParameter:s=>!(mode==='shader-failed'&&s.type===2),getShaderInfoLog:()=> 'Test compiler failure',createProgram:()=>({}),attachShader(){},linkProgram(){},getProgramParameter:()=>mode!=='link-failed',getProgramInfoLog:()=> 'Test linker failure',useProgram(){},enable(){},depthFunc(){},cullFace(){},getUniformLocation:()=>0,createBuffer:()=>({}),bindBuffer(){},bufferData(){},getAttribLocation:()=>0,enableVertexAttribArray(){},vertexAttribPointer(){},viewport(){},clearColor(){},clear(){},uniform1f(){},uniformMatrix3fv(){},drawElements(){draws++}};
 w.HTMLCanvasElement.prototype.getContext=()=>mode==='no-context'?null:gl;
 w.fetch=async()=>({ok:mode!=='mesh-failed',json:async()=>({positions:[0,0,0],normals:[0,0,1],indices:[0,0,0]})});
 w.eval(code);await new Promise(r=>setTimeout(r,0));
 return{dom,w,d,host:d.getElementById('brand-object'),canvas:d.getElementById('brand-canvas'),draws:()=>draws};
}
(async()=>{
 for(const [mode,status]of [['prerender-default','prerendered-default'],['no-context','context-unavailable'],['shader-failed','fragment-shader-failed'],['link-failed','shader-link-failed'],['mesh-failed','mesh-load-failed'],['working','webgl']]){
  const s=await scene(mode),ctx={work:{top:2116}};
  ok(s.host.dataset.renderer===status,mode+' is diagnosed');
  s.w.DelreyScene.update(0,1180,757,false,'home',ctx);const first=s.host.style.transform;
  s.w.DelreyScene.update(600,1180,757,false,'home',ctx);ok(first!==s.host.style.transform,mode+' moves along scroll path');
  s.w.DelreyScene.update(600,1180,757,true,'home',ctx);ok(s.host.style.transform===first,mode+' honors reduced motion');
  s.w.DelreyScene.update(0,390,844,false,'home',ctx);ok(parseFloat(s.host.style.width)<180,mode+' uses mobile size');
  s.w.DelreyScene.update(0,390,844,false,'services',ctx);ok(s.host.style.opacity==='0',mode+' hides on inner pages');
  if(mode==='working'){
   s.w.DelreyScene.update(0,1180,757,false,'home',ctx);ok(s.canvas.width<=Math.round(1180*.255*1.75),'DPR capped');const draws=s.draws();
   s.w.DelreyScene.update(0,1180,757,false,'home',ctx);ok(s.draws()===draws,'unchanged pose does not redraw');
   s.d.hidden=true;s.w.DelreyScene.update(500,1180,757,false,'home',ctx);ok(s.draws()===draws,'hidden tab does not redraw');
   s.canvas.dispatchEvent(new s.w.Event('webglcontextlost',{cancelable:true}));ok(s.canvas.hidden&&s.host.dataset.renderer==='context-lost','context loss restores poster');
  }
  s.dom.window.close();
 }
 console.log(JSON.stringify({passed:assertions,coverage:'Mock renderer lifecycle, fallback motion, diagnostics, mobile size, reduced motion, redraw limits and context loss',actualGPUAppearance:false},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
