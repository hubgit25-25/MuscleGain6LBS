import React from 'react';
import {AbsoluteFill,Easing,OffthreadVideo,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {assets} from './assets';

const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});

/**
 * The person is deliberately VIDEO-ONLY: no SVG or cartoon fallback.
 * Footage must show a real/AI-generated adult stepping onto a digital scale.
 * Recommended framing: full body on left 60%, negative space on right.
 */
export const WeightScale195:React.FC=()=>{
 const frame=useCurrentFrame();
 const {fps}=useVideoConfig();
 const count=Math.round(interpolate(frame,[60,86],[0,195],{...clamp,easing:Easing.out(Easing.cubic)}));
 const entrance=spring({frame:frame-60,fps,config:{stiffness:170,damping:17}});
 const hit=spring({frame:frame-88,fps,config:{stiffness:260,damping:12,mass:.65}});
 const finalZoom=ease(frame,90,119);
 const shake=frame>=88?Math.sin(frame*3.5)*interpolate(frame,[88,93,103],[10,5,0],clamp):0;
 const countScale=frame>=88?interpolate(hit,[0,1],[1.22,1],clamp):1;
 const lineProgress=ease(frame,86,100);
 return <AbsoluteFill style={{overflow:'hidden',background:'#07080c',color:'white',fontFamily:'Montserrat,Arial Black,Arial,sans-serif'}}>
  <AbsoluteFill style={{transform:`scale(${1.015+finalZoom*.085}) translateX(${shake*.25}px)`,transformOrigin:'43% 52%'}}>
   <OffthreadVideo src={staticFile(assets.personVideo)} muted pauseWhenBuffering={false} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center'}}/>
  </AbsoluteFill>
  <AbsoluteFill style={{background:'linear-gradient(90deg,transparent 28%,#07070a22 65%,#06060999 100%)',pointerEvents:'none'}}/>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 45% 48%,transparent 48%,#0007 100%)',pointerEvents:'none'}}/>
  {frame>=60&&<div style={{position:'absolute',left:600,top:760,width:465,textAlign:'center',opacity:interpolate(entrance,[0,.5],[0,1],clamp),transform:`translateX(${interpolate(entrance,[0,1],[110,0],clamp)+shake}px) scale(${countScale*(1+finalZoom*.07)})`}}>
   <div style={{fontSize:159,fontWeight:1000,lineHeight:1,letterSpacing:-12,textShadow:'0 0 25px #fff9,0 0 65px #ff244b'} }>{count}</div>
   <div style={{fontSize:84,fontWeight:1000,letterSpacing:7,textShadow:'0 0 20px #fff9,0 0 42px #ff244b'}}>LBS</div>
  </div>}
  {frame>=86&&<svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
   <path d="M785 1060 L785 1300 L440 1540" stroke="#ff3358" strokeWidth="5" strokeDasharray="12 9" fill="none" strokeDashoffset={(1-lineProgress)*650} style={{filter:'drop-shadow(0 0 11px #ff3358)'}}/>
   <circle cx="440" cy="1540" r={10*lineProgress} fill="#ff3358"/>
  </svg>}
  {Array.from({length:38},(_,i)=>{const angle=i*2.399,r=Math.max(0,frame-88)*(2+i%5)*2.5;return <div key={i} style={{position:'absolute',left:835+Math.cos(angle)*r,top:930+Math.sin(angle)*r,width:2+i%5,height:2+i%5,borderRadius:'50%',background:i%3?'#f33':'white',opacity:frame>=88?interpolate(frame,[88,100,119],[.85,.7,0],clamp):0,boxShadow:'0 0 12px #f33'}}/>})}
 </AbsoluteFill>;
};