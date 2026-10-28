import React from 'react';
import {AbsoluteFill,OffthreadVideo,Easing,interpolate,staticFile,useCurrentFrame} from 'remotion';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
export const WomanMuscleGrowth:React.FC=()=>{
 const f=useCurrentFrame();
 // Anatomical growth and body motion MUST come from the photorealistic source video.
 // Remotion only handles framing and cinematic grading; it does not fake muscle growth.
 const zoom=interpolate(f,[0,30,90,120,149],[1,1.035,1.065,1.085,1.12],{...clamp,easing:Easing.inOut(Easing.cubic)});
 const drift=interpolate(f,[0,90,120,149],[0,0,-15,0],clamp);
 const glow=interpolate(f,[0,30,90,120,149],[.13,.15,.27,.37,.22],clamp);
 return <AbsoluteFill style={{backgroundColor:'#07090c',overflow:'hidden'}}>
  <AbsoluteFill style={{transform:`translateX(${drift}px) scale(${zoom})`,transformOrigin:'center'}}>
   <OffthreadVideo src={staticFile('woman-muscle-growth.mp4')} muted style={{width:'100%',height:'100%',objectFit:'cover'}}/>
  </AbsoluteFill>
  <AbsoluteFill style={{background:'linear-gradient(90deg,rgba(0,0,0,.12),transparent 30%,transparent 72%,rgba(0,0,0,.16))',pointerEvents:'none'}}/>
  <AbsoluteFill style={{background:`radial-gradient(ellipse at 72% 33%,rgba(230,36,45,${glow}),transparent 57%)`,mixBlendMode:'screen',pointerEvents:'none'}}/>
  <AbsoluteFill style={{boxShadow:'inset 0 0 115px rgba(0,0,0,.52)',pointerEvents:'none'}}/>
 </AbsoluteFill>;
};
