/* Exact DELREY extrusion. Dependency-free WebGL, no CDN and no placeholder image.
   Geometry: assets/hero-symbol-mesh.json, authored from the supplied SVG outline. */
(function () {
  'use strict';
  const host = document.getElementById('brand-object');
  const canvas = document.getElementById('brand-canvas');
  if (!host || !canvas) return;
  const poster=document.createElement('img');poster.src='assets/hero-symbol-poster.webp';poster.alt='';poster.className='brand-poster';host.append(poster);canvas.hidden=true;
  const sequence=document.createElement('div');sequence.className='brand-sequence';sequence.hidden=true;host.append(sequence);
  let atlasRequested=false,atlasReady=false,lastPose;
  function fallbackFrame(p,reduced){
    const fallback=host.dataset.renderer!=='webgl';
    const frame=Math.round(p*32);sequence.style.backgroundPosition=`${frame%6*20}% ${Math.floor(frame/6)*20}%`;
    host.dataset.frame=String(frame);
    if(fallback&&!reduced&&!atlasRequested&&!['initializing','mesh-loading'].includes(host.dataset.renderer)){
      atlasRequested=true;const image=new Image();
      image.onload=()=>{atlasReady=true;sequence.style.backgroundImage='url("assets/hero-symbol-rotation-atlas.webp")';if(lastPose)pose(...lastPose)};
      image.onerror=()=>{host.dataset.fallback='poster-unavailable-sequence'};
      image.src='assets/hero-symbol-rotation-atlas.webp';
    }
    sequence.hidden=!(fallback&&!reduced&&atlasReady);
    poster.hidden=!sequence.hidden||(!fallback&&!reduced);
    host.dataset.presentation=!fallback&&!reduced?'webgl':sequence.hidden?'poster':'prerendered-3d';
  }
  host.dataset.renderer='initializing';
  function pose(y,w,h,reduced,route,scene){
    lastPose=[y,w,h,reduced,route,scene];
    const mobile=w<=700,stop=scene.work?.top||h*3;
    const p=reduced?0:Math.min(1,Math.max(0,y/(h*2.5)));
    const visibility=route==='home'?Math.min(1,Math.max(0,(stop-y-h*.5)/(h*.5))):0;
    const alpha=visibility*(1-Math.min(.65,Math.max(0,y/h)*.42));
    const width=mobile?Math.min(174,w*.43):Math.min(330,w*.255),height=width*420/512;
    const x=mobile?w*.51-p*w*.04:w*.72+Math.sin(p*Math.PI)*w*.07;
    const top=mobile?h*(.18+p*.38):h*(.12+p*.46);
    host.style.opacity=String(alpha);host.style.width=width+'px';host.style.height=height+'px';host.style.left='0';host.style.top='0';
    host.style.transform=`translate3d(${x}px,${top}px,0)`;
    fallbackFrame(p,reduced);
    return{p,alpha,width,height};
  }
  window.DelreyScene={update:pose};
  // Production uses the visually verified, genuinely rendered 3D sequence.
  // The retained mesh renderer is activated only by an explicit development mode.
  if(host.dataset.rendererMode!=='webgl'){host.dataset.renderer='prerendered-default';return}
  let gl;
  try{gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false,powerPreference:'low-power'})}catch(_){host.dataset.renderer='context-unavailable';return}
  if(!gl){host.dataset.renderer='context-unavailable';return}
  const vertex = `
    attribute vec3 position; attribute vec3 normal;
    uniform mat3 rotation; uniform float aspect;
    varying vec3 worldNormal; varying vec3 worldPosition;
    void main(){
      vec3 p=rotation*position;
      worldNormal=rotation*normal;worldPosition=p;
      float z=4.2-p.z;
      gl_Position=vec4(p.x*3.05/aspect,p.y*3.05,1.020202*z-.2020202,z);
    }`;
  const fragment = `
    precision highp float;
    varying vec3 worldNormal; varying vec3 worldPosition;
    float box(float x,float a,float b,float edge){return smoothstep(a-edge,a+edge,x)*(1.0-smoothstep(b-edge,b+edge,x));}
    void main(){
      vec3 N=normalize(worldNormal),V=normalize(vec3(0.,0.,4.2)-worldPosition),R=reflect(-V,N);
      float ceiling=box(R.y,.26,.81,.055),strip=box(R.x,-.70,-.53,.03),edge=box(R.x,.52,.62,.025);
      float floor=box(R.y,-.86,-.68,.04);
      vec3 env=vec3(.085,.092,.105)+ceiling*vec3(.91,.91,.87)+strip*vec3(.57,.65,.76)+edge*vec3(.82,.82,.79)+floor*.22;
      float fill=max(0.,dot(N,normalize(vec3(-.5,.8,1.))));
      float fresnel=pow(1.-max(0.,dot(N,V)),4.);
      vec3 H=normalize(normalize(vec3(-1.,2.,3.))+V);
      float spec=pow(max(dot(N,H),0.),70.);
      vec3 color=env*(.55+.45*fill)+vec3(.12)*fill+vec3(.65)*spec+fresnel*.24;
      color=pow(color,vec3(.82));
      gl_FragColor=vec4(color,1.);
    }`;
  function shader(type, source) {
    const s = gl.createShader(type); gl.shaderSource(s, source); gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){host.dataset.renderer=type===gl.VERTEX_SHADER?'vertex-shader-failed':'fragment-shader-failed';host.dataset.rendererDetail=(gl.getShaderInfoLog(s)||'Compilation failed').slice(0,500);throw Error('3D shader unavailable')}
    return s;
  }
  let program, count = 0, ready = false, lastKey = '', latest;
  try {
    program = gl.createProgram(); gl.attachShader(program, shader(gl.VERTEX_SHADER, vertex)); gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS)){host.dataset.renderer='shader-link-failed';host.dataset.rendererDetail=(gl.getProgramInfoLog(program)||'Link failed').slice(0,500);return}
    gl.useProgram(program); gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL); gl.enable(gl.CULL_FACE); gl.cullFace(gl.BACK);
  } catch (_) { return; }
  const rotationLocation = gl.getUniformLocation(program, 'rotation');
  const aspectLocation = gl.getUniformLocation(program, 'aspect');
  function buffer(name, array) {
    const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(array),gl.STATIC_DRAW);
    const loc=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,3,gl.FLOAT,false,0,0);
  }
  function rotation(x,y,z){
    const a=Math.cos(x),b=Math.sin(x),c=Math.cos(y),d=Math.sin(y),e=Math.cos(z),f=Math.sin(z);
    return new Float32Array([c*e,c*f,-d,b*d*e-a*f,b*d*f+a*e,b*c,a*d*e+b*f,a*d*f-b*e,a*c]);
  }
  function update(y,w,h,reduced,route,scene) {
    latest=[y,w,h,reduced,route,scene];
    const {p,alpha,width,height}=pose(y,w,h,reduced,route,scene);
    canvas.hidden=reduced||!ready;
    if(!ready||alpha===0||document.hidden)return;
    if(reduced)return;
    const angle=p;
    const key=[Math.round(angle*600),Math.round(width),Math.round(height),reduced].join(':');
    if(key===lastKey)return;lastKey=key;
    const dpr=Math.min(1.75,window.devicePixelRatio||1),cw=Math.round(width*dpr),ch=Math.round(height*dpr);
    if(canvas.width!==cw||canvas.height!==ch){canvas.width=cw;canvas.height=ch;gl.viewport(0,0,cw,ch)}
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.uniform1f(aspectLocation,width/height);gl.uniformMatrix3fv(rotationLocation,false,rotation(.36+angle*.60,-.42+angle*3.1,-.12+angle*.5));
    gl.drawElements(gl.TRIANGLES,count,gl.UNSIGNED_SHORT,0);
  }
  host.dataset.renderer='mesh-loading';
  fetch('assets/hero-symbol-mesh.json').then(r=>{if(!r.ok)throw Error('mesh unavailable');return r.json()}).then(mesh=>{
    buffer('position',mesh.positions);buffer('normal',mesh.normals);
    const b=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,b);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(mesh.indices),gl.STATIC_DRAW);
    count=mesh.indices.length;ready=true;host.dataset.renderer='webgl';canvas.hidden=false;poster.hidden=true;if(latest)update(...latest);
  }).catch(()=>{host.dataset.renderer='mesh-load-failed';canvas.hidden=true;poster.hidden=false});
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();ready=false;host.dataset.renderer='context-lost';canvas.hidden=true;poster.hidden=false});
  window.DelreyScene={update};
})();
