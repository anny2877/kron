// Carrusel de imágenes de Kron en la pantalla de ingreso
(function(){
const D={"aud": "assets/car-aud.jpg", "kron": "assets/car-kron.jpg", "car": "assets/car-car.jpg", "vid": "assets/car-vid.jpg", "cam": "assets/car-cam.jpg"},O=['kron','aud','car','vid','cam','kron'],H=3,TI=.9,ZM=.07,N=O.length,TT=H*N;
const A={kron:'Mascota de Kron con audífonos',aud:'Audífonos sobre un escritorio',car:'Carpetas pastel apiladas',vid:'Videógrafa junto a un lago',cam:'Cámara al atardecer'};
const st=document.getElementById('kc');if(!st)return;
const sl=O.map((k,i)=>{const d=document.createElement('div');d.className='kcs';const im=new Image();im.src=D[k];im.alt=i===0?A[k]:'';im.decoding='async';d.appendChild(im);st.appendChild(d);return{d,im}});
const ez=p=>1-Math.pow(1-p,3),zm=(i,t)=>{const p=Math.min(t/H,1);return i===0?1+ZM*(1-p):1+ZM*p};
function draw(t){const c=Math.min(Math.floor(t/H),N-1),u=t-c*H;
 sl.forEach((s,i)=>{let v=false,x=0,z=1;
  if(c===0){if(i===0){v=true;z=zm(0,u)}}
  else{const pe=ez(Math.min(u/TI,1));
   if(i===c){v=true;x=(1-pe)*100;z=zm(i,u)}
   else if(i===c-1&&pe<1){v=true;x=-30*pe;z=zm(i,u+H)}}
  s.d.style.visibility=v?'visible':'hidden';s.d.style.transform='translate3d('+x+'%,0,0)';s.d.style.zIndex=i===c?2:1;s.im.style.transform='scale('+z+')'})}
if(matchMedia('(prefers-reduced-motion: reduce)').matches){draw(0);return}
let vt=0,last=performance.now(),paused=false;
st.addEventListener('mouseenter',()=>paused=true);st.addEventListener('mouseleave',()=>paused=false);
(function loop(now){const dt=Math.min((now-last)/1000,.1);last=now;
 if(st.offsetParent!==null){if(!paused)vt=(vt+dt)%TT;draw(vt)}
 requestAnimationFrame(loop)})(last);
})();
