import * as THREE from './vendor/three.module.js';

const PRODUCTS = [
  { id:'prestige', photo:'assets/reference-prestige-shell-front.png', photoBack:'assets/reference-prestige-back-render.png', front:'assets/label-prestige-front-round.png', back:'assets/label-prestige-back-generated.svg', frontShape:'none', backShape:'round', frontCrop:{x:0,y:0,w:1,h:1}, backCrop:{x:0,y:0,w:1,h:1}, frontY:[.68,1.86], backY:[.68,1.86], frontArc:2.05, backArc:1.36, cap:'#c19a53', glass:'#60310e', silhouette:'prestige' },
  { id:'guinness', photo:'assets/reference-guinness-shell-front.png', photoBack:'assets/reference-guinness-back-render.png', front:'assets/label-guinness-front-round.png', back:'assets/label-guinness-back-generated.svg', frontShape:'none', backShape:'round', frontCrop:{x:0,y:0,w:1,h:1}, backCrop:{x:0,y:0,w:1,h:1}, frontY:[.68,1.86], backY:[.68,1.86], frontArc:2.05, backArc:1.36, cap:'#c4a363', glass:'#352216', silhouette:'guinness' },
  { id:'malta', photo:'assets/reference-malta-shell-front.png', photoBack:'assets/reference-malta-back-render.png', front:'assets/label-malta-front-round.png', back:'assets/label-malta-back-generated.svg', frontShape:'none', backShape:'round', frontCrop:{x:0,y:0,w:1,h:1}, backCrop:{x:0,y:0,w:1,h:1}, frontY:[.68,1.86], backY:[.68,1.86], frontArc:2.05, backArc:1.36, cap:'#bea366', glass:'#60310e', silhouette:'malta' }
];

const PROFILES = {"prestige":[[0,0.041],[0.092,0.517],[0.185,0.554],[0.279,0.572],[0.372,0.574],[0.464,0.567],[0.558,0.567],[0.651,0.567],[0.745,0.567],[0.839,0.567],[0.93,0.567],[1.024,0.567],[1.117,0.569],[1.211,0.569],[1.305,0.569],[1.396,0.572],[1.49,0.574],[1.583,0.576],[1.677,0.579],[1.771,0.59],[1.862,0.59],[1.956,0.574],[2.05,0.535],[2.143,0.474],[2.237,0.394],[2.328,0.333],[2.422,0.289],[2.516,0.264],[2.609,0.253],[2.701,0.278],[2.794,0.273]],"guinness":[[0,0.112],[0.093,0.536],[0.187,0.563],[0.28,0.574],[0.374,0.568],[0.467,0.561],[0.561,0.559],[0.654,0.559],[0.747,0.561],[0.841,0.561],[0.934,0.563],[1.028,0.565],[1.121,0.568],[1.215,0.57],[1.308,0.572],[1.402,0.574],[1.495,0.577],[1.588,0.579],[1.682,0.581],[1.775,0.586],[1.869,0.59],[1.962,0.581],[2.056,0.554],[2.149,0.503],[2.242,0.427],[2.336,0.353],[2.429,0.304],[2.523,0.268],[2.616,0.255],[2.71,0.286],[2.803,0.264]],"malta":[[0,0.106],[0.092,0.521],[0.184,0.558],[0.278,0.571],[0.37,0.571],[0.463,0.569],[0.557,0.569],[0.649,0.571],[0.741,0.571],[0.835,0.571],[0.927,0.574],[1.019,0.574],[1.113,0.574],[1.206,0.574],[1.3,0.578],[1.392,0.578],[1.484,0.578],[1.578,0.581],[1.67,0.585],[1.762,0.59],[1.856,0.59],[1.949,0.571],[2.041,0.532],[2.135,0.463],[2.227,0.384],[2.321,0.324],[2.413,0.282],[2.505,0.261],[2.599,0.252],[2.692,0.287],[2.784,0.264]]};

function seeded(seed){let x=seed>>>0;return()=>{x=(x*1664525+1013904223)>>>0;return x/4294967296;};}
function profileRadius(profile,y){for(let i=1;i<profile.length;i++){const a=profile[i-1],b=profile[i];if(y<=b[0]){const t=(y-a[0])/(b[0]-a[0]);return a[1]+(b[1]-a[1])*Math.max(0,Math.min(1,t));}}return profile.at(-1)[1];}
function makeGlassProfile(profile){return profile.map(([y,r])=>new THREE.Vector2(r,y));}
function createBody(profile,material){const segments=160,rows=88,positions=[],uvs=[],indices=[];for(let j=0;j<=rows;j++){const v=j/rows,y=2.82*v,r=profileRadius(profile,y);for(let i=0;i<=segments;i++){const u=i/segments,a=u*Math.PI*2;positions.push(Math.sin(a)*r,y,Math.cos(a)*r);uvs.push((u+.75)%1,v);if(i<segments&&j<rows){const q=j*(segments+1)+i;indices.push(q,q+1,q+segments+1,q+1,q+segments+2,q+segments+1);}}}const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geometry.setIndex(indices);geometry.computeVertexNormals();return new THREE.Mesh(geometry,material);}
function makeNeck(){return null;}
function crownGeometry(radius=.28,teeth=28){const radial=448,ys=[0,.012,.02,.07,.08,.086],factors=[.95,1,1,1,.99,.94],positions=[],indices=[];for(let ring=0;ring<ys.length;ring++){const y=ys[ring],phase=Math.max(0,Math.min(1,(y-.003)/.017))*Math.max(0,Math.min(1,(.087-y)/.014)),amp=.021*phase;for(let i=0;i<=radial;i++){const angle=i/radial*Math.PI*2,r=radius*(factors[ring]+Math.cos(angle*teeth)*amp);positions.push(Math.sin(angle)*r,y,Math.cos(angle)*r);if(ring<ys.length-1&&i<radial){const q=ring*(radial+1)+i;indices.push(q,q+1,q+radial+1,q+1,q+radial+2,q+radial+1);}}}const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;}
function makeCrownCap(material,topMaterial,radius=.28){const group=new THREE.Group(),baseY=2.78,skirt=new THREE.Mesh(crownGeometry(radius,28),material),domeGeometry=new THREE.LatheGeometry([new THREE.Vector2(radius*.99,.086),new THREE.Vector2(radius*.96,.094),new THREE.Vector2(radius*.82,.105),new THREE.Vector2(radius*.58,.114),new THREE.Vector2(radius*.3,.119),new THREE.Vector2(0,.12)],160),dome=new THREE.Mesh(domeGeometry,topMaterial),hem=new THREE.Mesh(new THREE.TorusGeometry(radius*.94,.008,12,160),material),rolledEdge=new THREE.Mesh(new THREE.TorusGeometry(radius*.985,.0035,10,160),material);skirt.position.y=dome.position.y=baseY;hem.rotation.x=rolledEdge.rotation.x=Math.PI/2;hem.position.y=baseY+.009;rolledEdge.position.y=baseY+.084;skirt.castShadow=dome.castShadow=hem.castShadow=rolledEdge.castShadow=true;group.add(skirt,dome,hem,rolledEdge);return group;}
function labelPath(ctx,w,h,shape){ctx.beginPath();if(shape==='oval'){ctx.moveTo(w*.50,h*.012);ctx.bezierCurveTo(w*.88,h*.012,w*.99,h*.17,w*.965,h*.48);ctx.bezierCurveTo(w*.94,h*.82,w*.72,h*.99,w*.50,h*.985);ctx.bezierCurveTo(w*.27,h*.99,w*.06,h*.82,w*.035,h*.48);ctx.bezierCurveTo(w*.01,h*.17,w*.12,h*.012,w*.50,h*.012);}else{const r=Math.min(w,h)*.032;ctx.roundRect(w*.025,h*.008,w*.95,h*.984,r);}ctx.closePath();}
function loadLabel(url,crop,shape,gl){return new Promise(resolve=>{const image=new Image();image.onload=()=>{try{const sw=image.naturalWidth*(crop?.w??1),sh=image.naturalHeight*(crop?.h??1),sx=image.naturalWidth*(crop?.x??0),sy=image.naturalHeight*(crop?.y??0),ratio=Math.min(1,1024/sw,1400/sh),w=Math.max(1,Math.round(sw*ratio)),h=Math.max(1,Math.round(sh*ratio)),canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');if(shape!=='none'){labelPath(ctx,w,h,shape);ctx.clip();}ctx.drawImage(image,sx,sy,sw,sh,0,0,w,h);const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(8,gl.capabilities.getMaxAnisotropy());texture.minFilter=THREE.LinearMipmapLinearFilter;texture.magFilter=THREE.LinearFilter;texture.generateMipmaps=true;texture.needsUpdate=true;resolve(texture);}catch{resolve(null);}};image.onerror=()=>resolve(null);image.src=url;});}

function loadBottleAtlas(frontUrl,backUrl,profile,gl,glassHex){return new Promise(resolve=>{const load=url=>new Promise((done,fail)=>{const img=new Image();img.onload=()=>done(img);img.onerror=fail;img.src=url;});Promise.all([load(frontUrl),load(backUrl)]).then(([front,back])=>{try{const sourceWidth=512,hex=(glassHex||'#60310e').replace('#',''),baseColor=[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)||32),cut=(img)=>{const top=Math.round(img.naturalHeight*.078),bottom=Math.round(img.naturalHeight*.995),height=Math.round((bottom-top)*sourceWidth/img.naturalWidth),canvas=document.createElement('canvas');canvas.width=sourceWidth;canvas.height=height;const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,top,img.naturalWidth,bottom-top,0,0,sourceWidth,height);return {height,data:ctx.getImageData(0,0,sourceWidth,height).data};},f=cut(front),b=cut(back),width=1024,height=512,maxR=Math.max(...profile.map(p=>p[1])),canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const ctx=canvas.getContext('2d'),out=ctx.createImageData(width,height),blendEdge=.82,glassSample=(data,index,channel)=>{const alpha=data[index+3]/255;return data[index+channel]*alpha+baseColor[channel]*(1-alpha);};for(let y=0;y<height;y++){const worldY=2.82*(1-y/(height-1)),ratio=Math.max(.02,Math.min(1,profileRadius(profile,worldY)/maxR)),syF=Math.min(f.height-1,Math.round(y/(height-1)*(f.height-1))),syB=Math.min(b.height-1,Math.round(y/(height-1)*(b.height-1))),extent=ratio*sourceWidth*.238,cPlus=Math.round(sourceWidth*.5+extent),cMinus=Math.round(sourceWidth*.5-extent),offset=(sy,x)=>(sy*sourceWidth+Math.max(1,Math.min(sourceWidth-2,x)))*4,fp=offset(syF,cPlus),fm=offset(syF,cMinus),bp=offset(syB,cPlus),bm=offset(syB,cMinus),gainF=(fa,ba,c)=>{const fv=glassSample(f.data,fa,c),bv=glassSample(b.data,ba,c),target=(fv+bv)*.5;return target<4?1:Math.max(.78,Math.min(1.28,target/Math.max(4,fv)));},gainB=(fa,ba,c)=>{const fv=glassSample(f.data,fa,c),bv=glassSample(b.data,ba,c),target=(fv+bv)*.5;return target<4?1:Math.max(.78,Math.min(1.28,target/Math.max(4,bv)));},gfp=[0,1,2].map(c=>gainF(fp,bm,c)),gbm=[0,1,2].map(c=>gainB(fp,bm,c)),gfm=[0,1,2].map(c=>gainF(fm,bp,c)),gbp=[0,1,2].map(c=>gainB(fm,bp,c));for(let x=0;x<width;x++){const u=x/width,theta=(u-.5)*Math.PI*2,sn=Math.sin(theta),cs=Math.cos(theta),raw=Math.max(0,Math.min(1,(cs+blendEdge)/(2*blendEdge))),wf=raw*raw*(3-2*raw),side=sn>=0,xf=Math.max(1,Math.min(sourceWidth-2,Math.round(sourceWidth*.5+sn*extent))),xb=Math.max(1,Math.min(sourceWidth-2,Math.round(sourceWidth*.5-sn*extent))),fi=(syF*sourceWidth+xf)*4,bi=(syB*sourceWidth+xb)*4,oi=(y*width+x)*4,strength=Math.max(0,Math.min(1,(Math.abs(sn)-.12)/.88));for(let channel=0;channel<3;channel++){const fg=side?gfp[channel]:gfm[channel],bg=side?gbm[channel]:gbp[channel],fc=glassSample(f.data,fi,channel)*(1+(fg-1)*strength),bc=glassSample(b.data,bi,channel)*(1+(bg-1)*strength);out.data[oi+channel]=Math.round(fc*wf+bc*(1-wf));}out.data[oi+3]=255;}}const shifted=ctx.createImageData(width,height);for(let y=0;y<height;y++)for(let x=0;x<width;x++){const srcX=(x-width*.25+width)%width,src=(y*width+srcX)*4,dst=(y*width+x)*4;shifted.data[dst]=out.data[src];shifted.data[dst+1]=out.data[src+1];shifted.data[dst+2]=out.data[src+2];shifted.data[dst+3]=out.data[src+3];}ctx.putImageData(shifted,0,0);ctx.save();ctx.globalCompositeOperation='screen';for(const center of [0,width*.5,width]){const band=width*.022,gloss=ctx.createLinearGradient(center-band,0,center+band,0);gloss.addColorStop(0,'rgba(255,221,171,0)');gloss.addColorStop(.24,'rgba(255,233,198,.04)');gloss.addColorStop(.5,'rgba(255,242,220,.12)');gloss.addColorStop(.76,'rgba(255,233,198,.04)');gloss.addColorStop(1,'rgba(255,221,171,0)');ctx.fillStyle=gloss;ctx.fillRect(center-band,0,band*2,height);}ctx.restore();const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(8,gl.capabilities.getMaxAnisotropy());texture.minFilter=THREE.LinearMipmapLinearFilter;texture.magFilter=THREE.LinearFilter;texture.generateMipmaps=true;texture.needsUpdate=true;resolve(texture);}catch{resolve(null);}}).catch(()=>resolve(null));});}
function labelSurface(profile,yRange,arc,center,reverse=false){const rows=34,cols=52,positions=[],uvs=[],indices=[];for(let j=0;j<=rows;j++){const v=j/rows,y=yRange[0]+(yRange[1]-yRange[0])*v,r=profileRadius(profile,y)+.009;for(let i=0;i<=cols;i++){const u=i/cols,a=center+(u-.5)*arc;positions.push(Math.sin(a)*r,y,Math.cos(a)*r);uvs.push(reverse?1-u:u,v);if(i<cols&&j<rows){const q=j*(cols+1)+i;indices.push(q,q+1,q+cols+1,q+1,q+cols+2,q+cols+1);}}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();return g;}
function makeEnvMap(){const texture=new THREE.TextureLoader().load('assets/reflection-studio.jpg');texture.mapping=THREE.EquirectangularReflectionMapping;texture.colorSpace=THREE.SRGBColorSpace;texture.needsUpdate=true;return texture;}
function makeGroundShadow(){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),g=x.createRadialGradient(64,64,4,64,64,63);g.addColorStop(0,'rgba(0,0,0,.52)');g.addColorStop(.38,'rgba(0,0,0,.28)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,128,128);const tex=new THREE.CanvasTexture(c);const plane=new THREE.Mesh(new THREE.PlaneGeometry(2.1,1.12),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}));plane.rotation.x=-Math.PI/2;plane.position.set(0,.012,-.02);return plane;}
function addCondensation(root,product,seed,active){const profile=PROFILES[product.silhouette],random=seeded(seed),count=72,geometry=new THREE.SphereGeometry(1,8,6),material=new THREE.MeshPhysicalMaterial({color:0xc3b7a3,roughness:.2,metalness:0,clearcoat:.42,clearcoatRoughness:.18,transparent:true,opacity:.3});const drops=new THREE.InstancedMesh(geometry,material,count),dummy=new THREE.Object3D();let placed=0,attempts=0;while(placed<count&&attempts<count*6){attempts++;const y=.20+random()*2.30,a=random()*Math.PI*2;const front=Math.abs(Math.atan2(Math.sin(a),Math.cos(a))),back=Math.abs(Math.atan2(Math.sin(a-Math.PI),Math.cos(a-Math.PI)));const onFront=y>=product.frontY[0]&&y<=product.frontY[1]&&front<product.frontArc*.5,onBack=y>=product.backY[0]&&y<=product.backY[1]&&back<product.backArc*.5;if(onFront||onBack)continue;const r=profileRadius(profile,y)+.004,size=.0015+random()*.0035;dummy.position.set(Math.sin(a)*r,y,Math.cos(a)*r);dummy.scale.set(size*.88,size*1.35,size*.72);dummy.lookAt(dummy.position.x*1.2,y,dummy.position.z*1.2);dummy.updateMatrix();drops.setMatrixAt(placed++,dummy.matrix);}drops.count=placed;root.add(drops);return drops;}
function makeBottle(product,index,scene,renderer,onTextureReady){
  const profile=PROFILES[product.silhouette],root=new THREE.Group(),parts=new THREE.Group();
  const glassColor=new THREE.Color(product.glass);
  const glass=new THREE.MeshPhysicalMaterial({color:glassColor,roughness:.25,metalness:0,transmission:.14,thickness:.42,ior:1.48,clearcoat:.48,clearcoatRoughness:.2,attenuationColor:glassColor,attenuationDistance:1.6,envMapIntensity:.58});
  const liquidColor=product.silhouette==='guinness'?0x080604:product.silhouette==='malta'?0x1c0b05:0x241006;
  const liquid=new THREE.MeshPhysicalMaterial({color:liquidColor,roughness:.22,metalness:0,clearcoat:.72,clearcoatRoughness:.12,envMapIntensity:.72});
  const capMetal=new THREE.MeshPhysicalMaterial({color:product.cap,emissive:0x000000,emissiveIntensity:0,metalness:.99,roughness:.22,envMapIntensity:1.45,clearcoat:.18,clearcoatRoughness:.18,side:THREE.DoubleSide});
  const capTop=new THREE.MeshPhysicalMaterial({color:product.cap,metalness:.96,roughness:.2,envMapIntensity:1.55,clearcoat:.28,clearcoatRoughness:.14});
  const makePhotoLabel=texture=>new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide,transparent:true,alphaTest:.035,depthWrite:true,toneMapped:false});
  const body=createBody(profile,glass);body.castShadow=true;body.receiveShadow=true;parts.add(body);
  const liquidLine=product.silhouette==='prestige'?1.93:product.silhouette==='guinness'?2.05:1.96;
  const innerProfile=profile.filter(([y])=>y<liquidLine).map(([y,r])=>new THREE.Vector2(Math.max(.02,r-.018),y));
  innerProfile.push(new THREE.Vector2(Math.max(.02,profileRadius(profile,liquidLine)-.018),liquidLine),new THREE.Vector2(0,liquidLine));
  const fill=new THREE.Mesh(new THREE.LatheGeometry(innerProfile,80),liquid);fill.position.y=.012;fill.renderOrder=1;parts.add(fill);
  const capRadius=profileRadius(profile,2.82)*1.06;const neckRing=new THREE.Mesh(new THREE.TorusGeometry(capRadius*.83,.012,10,64),glass);neckRing.rotation.x=Math.PI/2;neckRing.position.y=2.79;parts.add(neckRing);
  const cap=makeCrownCap(capMetal,capTop,capRadius);parts.add(cap);
  const atlasTexture=loadBottleAtlas(product.photo,product.photoBack,profile,renderer,product.glass),frontTexture=loadLabel(product.front,product.frontCrop,product.frontShape,renderer),backTexture=loadLabel(product.back,product.backCrop,product.backShape,renderer);
  atlasTexture.then(texture=>{if(!texture){window.dispatchEvent(new CustomEvent('brana-texture-error',{detail:product.id}));return;}body.material=new THREE.MeshBasicMaterial({map:texture,toneMapped:false});body.material.needsUpdate=true;onTextureReady?.();});
  frontTexture.then(texture=>{if(!texture){window.dispatchEvent(new CustomEvent('brana-texture-error',{detail:product.id+' front'}));return;}const label=new THREE.Mesh(labelSurface(profile,product.frontY,product.frontArc,0),makePhotoLabel(texture));label.renderOrder=2;parts.add(label);onTextureReady?.();});
  backTexture.then(texture=>{if(!texture){window.dispatchEvent(new CustomEvent('brana-texture-error',{detail:product.id+' back'}));return;}const label=new THREE.Mesh(labelSurface(profile,product.backY,product.backArc,Math.PI,false),makePhotoLabel(texture));label.renderOrder=2;parts.add(label);onTextureReady?.();});
  const drops=addCondensation(parts,product,142+index*913,true);root.add(parts);const shadow=makeGroundShadow();scene.add(shadow);
  return {product,index,root,parts,glass,drops,shadow,atlasTexture,frontTexture,backTexture};
}

export function createBottleScene(canvas,onFailure,onSelection,onPauseChange){
 let renderer;try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:false});}catch{onFailure?.();return null;}
 const scene=new THREE.Scene();scene.environment=makeEnvMap();scene.environmentIntensity=.72;const camera=new THREE.PerspectiveCamera(34,1,.1,50);camera.position.set(0,1.68,6.1);camera.lookAt(0,1.42,-.22);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
 scene.add(new THREE.HemisphereLight(0xf5e4c7,0x1a1511,.88));const key=new THREE.DirectionalLight(0xffddb0,2.15);key.position.set(-3.6,5.4,4.5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-4;key.shadow.camera.right=4;key.shadow.camera.top=5;key.shadow.camera.bottom=-1;key.shadow.bias=-.0002;scene.add(key);const rim=new THREE.DirectionalLight(0xffb762,1.45);rim.position.set(3.5,3.6,-2.8);scene.add(rim);const fill=new THREE.DirectionalLight(0xe4efff,.68);fill.position.set(1.6,1.3,5);scene.add(fill);
  const carousel=new THREE.Group();
  carousel.position.z=-1.45;
  scene.add(carousel);
  const models=PRODUCTS.map((p,i)=>{
    const m=makeBottle(p,i,scene,renderer,()=>renderer.render(scene,camera));
    carousel.add(m.root);
    return m;
  });
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  let active=0,paused=reduce.matches,destroyed=false,raf=0;
  let manualPaused=reduce.matches,hoverPaused=false,touchPaused=false;
  let spinIndex=-1,spinAt=0,spinDuration=2400,pendingSpin=false,pendingSpinIndex=-1;
  let transitionStart=0,transitionTarget=0,transitionAt=0,transitionDuration=0;
  let swipeStart=null,skipClick=false,dpr=1;
  const radius=1.45,orbitStep=Math.PI*2/3,orbitCycle=4600/1.25;
  let orbitStart=performance.now(),orbitBase=0,pauseAt=paused?performance.now():0;
  const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();

  models.forEach((m,i)=>{
    const slot=-i*Math.PI*2/3;
    m.root.position.set(Math.sin(slot)*radius,0,Math.cos(slot)*radius);
    m.root.rotation.y=slot;
    m.root.visible=true;
    m.shadow.visible=true;
    m.root.scale.setScalar(i===0?1.14:.92);
    m.shadow.position.set(Math.sin(slot)*radius,.012,Math.cos(slot)*radius+carousel.position.z);
  });

  function render(){renderer.render(scene,camera);}
  function syncPaused(){
    const next=reduce.matches||manualPaused||hoverPaused||touchPaused;
    if(next===paused)return;
    paused=next;
    if(paused){
      announceFront(true);
      pauseAt=performance.now();
      cancelAnimationFrame(raf);
      raf=0;
      render();
    }else{
      const shift=performance.now()-pauseAt;
      orbitStart+=shift;
      transitionAt+=shift;
      spinAt+=shift;
      raf=requestAnimationFrame(tick);
    }
    onPauseChange?.(paused);
  }
  function resize(){
    const rect=canvas.getBoundingClientRect();
    if(!rect.width||!rect.height)return;
    dpr=Math.min(window.devicePixelRatio||1,1.35);
    renderer.setPixelRatio(dpr);
    renderer.setSize(rect.width,rect.height,false);
    camera.aspect=rect.width/rect.height;
    camera.updateProjectionMatrix();
    render();
  }
  function frontIndex(){
    let best=-Infinity,index=0;
    models.forEach((m,i)=>{
      const angle=-i*Math.PI*2/3+carousel.rotation.y;
      const score=Math.cos(angle);
      if(score>best){best=score;index=i;}
    });
    return index;
  }
  function orbitRotation(now){
    const elapsed=Math.max(0,now-orbitStart);
    return orbitBase+(elapsed/orbitCycle)*orbitStep;
  }
  function announceFront(force=false){
    const next=frontIndex();
    const angle=-next*Math.PI*2/3+carousel.rotation.y;
    if(!force&&Math.cos(angle)<.93)return;
    if(next!==active){active=next;onSelection?.(PRODUCTS[next].id);}
  }
  function beginSpin(index,now){
    if(reduce.matches)return;
    spinIndex=index;
    spinAt=now;
    spinDuration=2400;
    pendingSpin=false;
    pendingSpinIndex=-1;
  }
  function updateModels(now,snap=false){
    const alpha=snap?1:.14;
    models.forEach((m,i)=>{
      const slot=-i*Math.PI*2/3;
      const angle=slot+carousel.rotation.y;
      const front=Math.max(0,Math.cos(angle));
      const progress=spinIndex===i?Math.max(0,Math.min(1,(now-spinAt)/spinDuration)):0;
      const ease=1-Math.pow(1-progress,4);
      const targetScale=.92+front*.22+(spinIndex===i?.04*ease:0);
      m.root.scale.setScalar(m.root.scale.x+(targetScale-m.root.scale.x)*alpha);
      const push=spinIndex===i?.15*ease:0;
      const orbitalRadius=radius+push;
      m.root.position.set(Math.sin(slot)*orbitalRadius,0,Math.cos(slot)*orbitalRadius);
      m.root.rotation.y=slot+(spinIndex===i?Math.PI*8*ease:0);
      m.root.visible=true;
      m.shadow.position.set(Math.sin(angle)*orbitalRadius,.012,Math.cos(angle)*orbitalRadius+carousel.position.z);
      m.shadow.visible=true;
    });
  }
  function choose(id,spin=false,notify=true){
    const index=Math.max(0,PRODUCTS.findIndex(item=>item.id===id));
    const now=performance.now();
    active=index;
    spinIndex=-1;
    pendingSpin=spin&&!reduce.matches;
    pendingSpinIndex=pendingSpin?index:-1;
    const base=index*Math.PI*2/3;
    transitionStart=carousel.rotation.y;
    const delta=Math.atan2(Math.sin(base-transitionStart),Math.cos(base-transitionStart));
    transitionTarget=transitionStart+delta;
    transitionAt=now;
    transitionDuration=(reduce.matches||paused)?0:820;
    if(notify)onSelection?.(PRODUCTS[index].id);
    if(!transitionDuration){
      carousel.rotation.y=transitionTarget;
      orbitBase=carousel.rotation.y;
      orbitStart=now;
      if(pendingSpin)beginSpin(index,now);
    }
    if((!paused||spinIndex>=0||transitionDuration>0)&&raf===0)raf=requestAnimationFrame(tick);
    if(paused){pauseAt=now;updateModels(now,true);render();}
  }
  function spinActive(){
    if(reduce.matches)return;
    const index=active;
    choose(PRODUCTS[index].id,true,true);
    if(raf===0)raf=requestAnimationFrame(tick);
  }
  function setPaused(value){manualPaused=!!value;touchPaused=false;syncPaused();}
  function setHoverPaused(value){hoverPaused=!!value;syncPaused();}
  function clickedProduct(event){
    const rect=canvas.getBoundingClientRect();
    if(!rect.width||!rect.height)return -1;
    pointer.set(((event.clientX-rect.left)/rect.width)*2-1,-((event.clientY-rect.top)/rect.height)*2+1);
    raycaster.setFromCamera(pointer,camera);
    const hits=raycaster.intersectObjects(models.map(model=>model.root),true);
    if(!hits.length)return -1;
    let object=hits[0].object;
    while(object&&object.parent&&!models.some(model=>model.root===object))object=object.parent;
    return models.findIndex(model=>model.root===object);
  }
  function tick(now){
    if(destroyed||(paused&&spinIndex<0&&transitionDuration<=0)){raf=0;return;}
    if(transitionDuration){
      const t=Math.min(1,(now-transitionAt)/transitionDuration);
      const ease=1-Math.pow(1-t,3);
      carousel.rotation.y=transitionStart+(transitionTarget-transitionStart)*ease;
      if(t>=1){
        transitionDuration=0;
        orbitBase=carousel.rotation.y;
        orbitStart=now;
        if(pendingSpin)beginSpin(pendingSpinIndex,now);
      }
    }else if(!paused)carousel.rotation.y=orbitRotation(now);
    updateModels(now);
    if(spinIndex>=0&&now-spinAt>=spinDuration){
      spinIndex=-1;
      orbitBase=carousel.rotation.y;
      orbitStart=now;
      updateModels(now,true);
    }
    if(!transitionDuration&&spinIndex<0)announceFront();
    render();
    raf=requestAnimationFrame(tick);
  }
  function onKey(event){
    if(event.key==='ArrowRight'){event.preventDefault();choose(PRODUCTS[(frontIndex()+1)%PRODUCTS.length].id,false,true);}
    else if(event.key==='ArrowLeft'){event.preventDefault();choose(PRODUCTS[(frontIndex()+PRODUCTS.length-1)%PRODUCTS.length].id,false,true);}
    else if(event.key==='Enter'||event.key===' '){event.preventDefault();spinActive();}
  }
  function onDown(event){swipeStart={x:event.clientX,y:event.clientY};}
  function onUp(event){
    if(!swipeStart)return;
    const dx=event.clientX-swipeStart.x,dy=event.clientY-swipeStart.y;
    if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){
      choose(PRODUCTS[(frontIndex()+(dx<0?1:2))%PRODUCTS.length].id,false,true);
      skipClick=true;
      setTimeout(()=>{skipClick=false;},0);
    }
    swipeStart=null;
  }
  function onClick(event){
    if(event.detail===0)return;
    if(skipClick){skipClick=false;return;}
    const touchInput=event.pointerType==='touch'||(event.pointerType!=='mouse'&&window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    if(touchInput){
      if(touchPaused){touchPaused=false;syncPaused();return;}
      touchPaused=true;
      syncPaused();
    }
    const index=clickedProduct(event);
    if(index>=0)choose(PRODUCTS[index].id,true,true);
    else spinActive();
  }
  function onPointerEnter(event){if(event.pointerType==='mouse'||event.pointerType==='pen')setHoverPaused(true);}
  function onPointerLeave(event){if(event.pointerType==='mouse'||event.pointerType==='pen')setHoverPaused(false);}
  const onReduceChange=()=>syncPaused();
  canvas.addEventListener('keydown',onKey);
  canvas.addEventListener('pointerdown',onDown);
  canvas.addEventListener('pointerup',onUp);
  canvas.addEventListener('click',onClick);
  canvas.addEventListener('pointerenter',onPointerEnter);
  canvas.addEventListener('pointerleave',onPointerLeave);
  reduce.addEventListener?.('change',onReduceChange);
  const observer=new ResizeObserver(resize);
  observer.observe(canvas);
  resize();
  if(!paused)raf=requestAnimationFrame(tick);
  const contextLost=event=>{event.preventDefault();onFailure?.();};
  canvas.addEventListener('webglcontextlost',contextLost);

  return {
    select(id,opts={}){choose(id,opts.spin===true,true);},
    setPaused,
    spinActive,
    move(direction){
      const base=frontIndex();
      choose(PRODUCTS[(base+(direction>0?1:2))%PRODUCTS.length].id,false,true);
    },
    destroy(){
      destroyed=true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener('keydown',onKey);
      canvas.removeEventListener('pointerdown',onDown);
      canvas.removeEventListener('pointerup',onUp);
      canvas.removeEventListener('click',onClick);
      canvas.removeEventListener('pointerenter',onPointerEnter);
      canvas.removeEventListener('pointerleave',onPointerLeave);
      reduce.removeEventListener?.('change',onReduceChange);
      canvas.removeEventListener('webglcontextlost',contextLost);
      renderer.dispose();
    }
  };
}
