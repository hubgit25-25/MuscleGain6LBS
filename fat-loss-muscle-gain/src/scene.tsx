import React from 'react';
import {AbsoluteFill,Easing,OffthreadVideo,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {assets} from './assets';

const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const tween=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});

// Anatomical illustration fallback, not a photographic human. The face is fixed
// and the SAME body's dimensions are continuously interpolated frame-by-frame.
const Anatomy:React.FC<{fat:number;muscle:number;flex:number}>=({fat,muscle,flex})=>{
 const waist=175-fat*48+muscle*7;
 const shoulder=190+muscle*43;
 const arm=58+muscle*24;
 const belly=58-fat*39;
 return <svg viewBox="0 0 700 1460" width="100%" height="100%" style={{overflow:'visible',filter:'drop-shadow(0 20px 35px #0009)'}}>
 <defs>
  <linearGradient id="skin" x1="0" x2="1"><stop stopColor="#633d32"/><stop offset=".22" stopColor="#a76f58"/><stop offset=".48" stopColor="#dbad8c"/><stop offset=".77" stopColor="#9a634f"/><stop offset="1" stopColor="#57382f"/></linearGradient>
  <radialGradient id="light"><stop stopColor="#ffe0bc" stopOpacity=".32"/><stop offset="1" stopColor="#ffe0bc" stopOpacity="0"/></radialGradient>
 </defs>
 <ellipse cx="350" cy="1400" rx="220" ry="35" fill="#0008"/>
 <path d="M245 910 L455 910 L478 1130 L442 1370 L356 1370 L350 1095 L344 1370 L258 1370 L222 1130Z" fill="url(#skin)" stroke="#533b32" strokeWidth="5"/>
 <path d="M222 900 L478 900 L475 1120 L364 1135 L350 1070 L336 1135 L225 1120Z" fill="#14171d" stroke="#34363b" strokeWidth="9"/>
 <g>
 <path d={`M${350-shoulder} 360 Q${350-shoulder-60} 370 ${350-shoulder-55} 490 L${350-shoulder-45} 720 Q${350-shoulder-35} 800 ${350-shoulder+arm} 790 L${350-shoulder+arm+22} 540Z`} fill="url(#skin)" stroke="#6c483b" strokeWidth="6"/>
 <path d={`M${350+shoulder} 360 Q${350+shoulder+60} 370 ${350+shoulder+55} 490 L${350+shoulder+45} 720 Q${350+shoulder+35} 800 ${350+shoulder-arm} 790 L${350+shoulder-arm-22} 540Z`} fill="url(#skin)" stroke="#6c483b" strokeWidth="6"/>
 </g>
 <path d={`M${350-shoulder} 355 Q350 304 ${350+shoulder} 355 L${350+waist+belly*.23} 820 Q${350+waist} 920 350 936 Q${350-waist} 920 ${350-waist-belly*.23} 820Z`} fill="url(#skin)" stroke="#664237" strokeWidth="8"/>
 <path d={`M350 375 Q${350-shoulder+24} 350 ${350-shoulder+15} 470 Q${350-shoulder+75} ${540+muscle*10} 344 523Z`} fill="#6e4538" opacity={.23+muscle*.3}/>
 <path d={`M350 375 Q${350+shoulder-24} 350 ${350+shoulder-15} 470 Q${350+shoulder-75} ${540+muscle*10} 356 523Z`} fill="#6e4538" opacity={.23+muscle*.3}/>
 <path d="M350 540 L350 890" stroke="#65473b" strokeWidth={4+muscle*6} opacity={.3+muscle*.25}/>
 {[0,1,2].map(i=><g key={i} opacity={muscle*.65}>
 <path d={`M${350-waist*.6} ${595+i*86} Q${350-waist*.24} ${572+i*86} 342 ${604+i*86} L340 ${653+i*86} Q${350-waist*.4} ${667+i*86} ${350-waist*.6} ${632+i*86}Z`} fill="#6b4638"/>
 <path d={`M${350+waist*.6} ${595+i*86} Q${350+waist*.24} ${572+i*86} 358 ${604+i*86} L360 ${653+i*86} Q${350+waist*.4} ${667+i*86} ${350+waist*.6} ${632+i*86}Z`} fill="#6b4638"/>
 </g>)}
 <path d="M306 260 L306 380 Q350 405 394 380 L394 260Z" fill="url(#skin)"/>
 <ellipse cx="350" cy="182" rx="110" ry="140" fill="url(#skin)" stroke="#805a4a" strokeWidth="5"/>
 <path d="M242 164 Q225 35 350 28 Q478 35 459 168 Q423 115 407 95 Q327 140 242 127Z" fill="#211b1a"/>
 <path d="M283 191 L323 195 M376 195 L418 191" stroke="#3b2925" strokeWidth="9" strokeLinecap="round"/>
 <path d="M350 208 L341 262 L362 266 M314 295 Q350 308 386 295" fill="none" stroke="#815748" strokeWidth="6" strokeLinecap="round"/>
 <ellipse cx="350" cy="590" rx={190+muscle*25} ry="350" fill="url(#light)" opacity=".6"/>
 <g opacity={flex}><path d={`M${350-shoulder-43} 460 Q${350-shoulder-90} 550 ${350-shoulder-30} 640`} stroke="#f1c6a6" strokeWidth="13" fill="none" opacity=".28"/><path d={`M${350+shoulder+43} 460 Q${350+shoulder+90} 550 ${350+shoulder+30} 640`} stroke="#f1c6a6" strokeWidth="13" fill="none" opacity=".28"/></g>
 </svg>;
};
export const FatLossMuscleGain:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const fat=tween(f,30,60),muscle=tween(f,60,91),flex=tween(f,92,119);
 const impact=spring({frame:f-92,fps,config:{damping:17,stiffness:110}});
 const zoom=interpolate(f,[0,30,60,90,119],[1,1.055,1.085,1.12,1.21],clamp);
 const glow=interpolate(f,[25,52,82,105,119],[0,.28,.18,.5,.25],clamp);
 return <AbsoluteFill style={{background:'#050609',overflow:'hidden'}}>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 25% 50%,#163a5738,transparent 58%),radial-gradient(ellipse at 85% 48%,#7d142c3d,transparent 58%),#07080b'}}/>
  <div style={{position:'absolute',left:-200,top:170,width:1450,height:1550,borderRadius:'50%',boxShadow:`inset 0 0 ${120+glow*100}px #c1284d`,opacity:.22+glow}}/>
  <AbsoluteFill style={{transform:`scale(${zoom*(1+Math.max(0,impact)*.012)}) translateY(${Math.sin(f*.045)*3}px)`,transformOrigin:'50% 52%'}}>
  {assets.transformationVideo?
   <OffthreadVideo src={staticFile(assets.transformationVideo)} muted style={{width:'100%',height:'100%',objectFit:'cover'}}/>:
   <div style={{position:'absolute',left:90,top:200,width:900,height:1580}}><Anatomy fat={fat} muscle={muscle} flex={flex}/></div>}
  </AbsoluteFill>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at center,transparent 43%,#000a 100%)',pointerEvents:'none'}}/>
  <div style={{position:'absolute',left:130,top:220,width:820,height:1350,borderRadius:'50%',border:'2px solid #ff4466',boxShadow:'0 0 65px #ff3355',opacity:glow*.22,pointerEvents:'none'}}/>
 </AbsoluteFill>;
};