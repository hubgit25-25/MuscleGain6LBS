import React from 'react';
import {AbsoluteFill,Easing,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';

const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const P:React.FC<{coach?:boolean;frame:number}>=({coach=false,frame})=>{
 const head=coach?interpolate(frame,[45,85],[0,-12],clamp):interpolate(frame,[0,45],[0,8],clamp);
 const nod=coach&&frame>85?Math.sin((frame-85)*.17)*4:0;
 const hand=!coach?Math.sin(frame*.15)*28:0;
 return <svg viewBox="0 0 440 940" width="100%" height="100%">
 <ellipse cx="220" cy="900" rx="175" ry="32" fill="#0008"/>
 <path d="M120 620 L320 620 L350 930 L235 930 L220 725 L205 930 L90 930Z" fill={coach?'#11141a':'#343b46'}/>
 <path d="M125 305 Q220 260 315 305 L355 665 Q220 720 85 665Z" fill={coach?'#101218':'#9299a2'} stroke="#050609" strokeWidth="9"/>
 <path d="M105 340 Q45 370 55 500 L70 650" stroke="#b77c5d" strokeWidth={coach?72:58} strokeLinecap="round"/>
 <g transform={`translate(${coach?0:hand} 0)`}><path d="M335 340 Q400 380 375 500 L350 630" stroke="#b77c5d" strokeWidth={coach?72:58} strokeLinecap="round"/></g>
 <rect x="185" y="245" width="70" height="95" rx="30" fill="#b77c5d"/>
 <g transform={`rotate(${head+nod} 220 180)`}><ellipse cx="220" cy="165" rx="92" ry="115" fill="#bd8263"/><path d="M128 145 Q125 45 220 42 Q320 45 312 150 Q265 116 204 85 Q175 130 128 145Z" fill="#17151a"/><path d="M165 180 L200 182 M245 182 L280 180" stroke="#30221d" strokeWidth="9" strokeLinecap="round"/><path d="M220 190 L213 235 L232 237" stroke="#825442" strokeWidth="6" fill="none"/><path d="M192 268 Q220 278 250 266" stroke="#583a30" strokeWidth="6" fill="none"/></g>
 </svg>
};

export const CoachListening:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const zoom=interpolate(f,[0,45,90,149],[1,1.12,1.23,1.35],{...clamp,easing:Easing.inOut(Easing.cubic)});
 const focus=interpolate(f,[45,95],[0,-145],clamp);
 const end=spring({frame:f-105,fps,config:{damping:16,stiffness:100}});
 const breathe=Math.sin(f*.08)*3;
 const blur=f>120?interpolate(f,[120,149],[0,1.3],clamp):0;
 return <AbsoluteFill style={{background:'#07090c',overflow:'hidden'}}>
  <AbsoluteFill style={{transform:`translateX(${focus}px) translateY(${breathe}px) scale(${zoom})`,filter:`blur(${blur}px)`,transformOrigin:'50% 50%'}}>
   <AbsoluteFill style={{background:'linear-gradient(120deg,#121920,#29323a 48%,#090d12)'}}>
    {[0,1,2,3].map(i=><div key={i} style={{position:'absolute',left:i*320-70,top:110,width:18,height:1300,background:'#4d5a62',opacity:.45}}/>)}
    <div style={{position:'absolute',top:180,left:80,width:920,height:24,background:'#9eb2bd',boxShadow:'0 0 55px #e4f6ff99'}}/>
    {[0,1,2].map(i=><div key={i} style={{position:'absolute',left:80+i*350,top:660,width:190,height:440,border:'22px solid #555e65',borderRadius:25,opacity:.48}}/>)}
    <div style={{position:'absolute',top:1110,left:0,right:0,bottom:0,background:'linear-gradient(#252b30,#090b0e)'}}/>
    <div style={{position:'absolute',left:10,top:520,width:510,height:1130}}><P frame={f}/></div>
    <div style={{position:'absolute',left:530,top:410,width:550,height:1240,transform:`scale(${1+interpolate(end,[0,1],[0,.025],clamp)})`}}><P coach frame={f}/></div>
   </AbsoluteFill>
  </AbsoluteFill>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 55% 45%,transparent 35%,#0009 100%)'}}/>
  <AbsoluteFill style={{background:'linear-gradient(0deg,#000b,transparent 30%,transparent 80%,#0008)'}}/>
 </AbsoluteFill>
};