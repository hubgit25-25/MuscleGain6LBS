import React from 'react';
import {AbsoluteFill,Easing,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';

const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
const WHITE='#f9faff';
const RED='#ed193b';

export const Weight195LBS:React.FC=()=>{
 const frame=useCurrentFrame();
 const {fps}=useVideoConfig();
 const counter=Math.round(interpolate(frame,[0,29],[0,195],{...clamp,easing:Easing.out(Easing.cubic)}));
 const hit=spring({frame:frame-30,fps,config:{stiffness:260,damping:12,mass:.65}});
 const showLbs=spring({frame:frame-60,fps,config:{stiffness:170,damping:14}});
 const end=ease(frame,90,119);
 const impact=frame>=30?interpolate(frame,[30,33,43],[1,0.22,0],clamp):0;
 const shake=frame>=60&&frame<82?Math.sin(frame*3.9)*interpolate(frame,[60,64,82],[13,7,0],clamp):0;
 const numberScale=frame<30?interpolate(frame,[0,29],[.65,1.05],clamp):frame<60?interpolate(hit,[0,1],[1.55,1],clamp):1;
 const finalScale=1+end*.17;
 const glow=frame>=30?interpolate(frame,[30,42],[.9,.45],clamp):.2;
 const particles=Array.from({length:68},(_,i)=>{
   const angle=i*2.399963;
   const speed=2+(i*37%8);
   const elapsed=Math.max(0,frame-60);
   const distance=60+elapsed*speed*4;
   return {x:540+Math.cos(angle)*distance,y:900+Math.sin(angle)*distance*.9,r:2+i%5,opacity:frame>=60?interpolate(frame,[60,74,110],[.85,.65,0],clamp):0};
 });
 return <AbsoluteFill style={{overflow:'hidden',background:'#030305',color:WHITE,fontFamily:'Montserrat,Arial Black,Arial,sans-serif'}}>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 47%,#4d0b1d 0%,#1c0710 31%,#030305 72%)'}}/>
  <div style={{position:'absolute',left:-200,top:380,width:1480,height:920,borderRadius:'50%',background:'radial-gradient(ellipse,#ee1a3b35,transparent 65%)',filter:'blur(70px)',transform:`scale(${1+frame/300})`}}/>
  {Array.from({length:12},(_,i)=><div key={i} style={{position:'absolute',top:i*195-140,left:0,width:'100%',height:2,background:'linear-gradient(90deg,transparent,#ec2a4220,transparent)',transform:`rotate(-14deg) translateX(${Math.sin(frame*.025+i)*35}px)`}}/>)}
  {particles.map((p,i)=><div key={i} style={{position:'absolute',left:p.x,top:p.y,width:p.r,height:p.r,borderRadius:'50%',background:i%4===0?'white':RED,opacity:p.opacity,boxShadow:`0 0 15px ${RED}`}}/>)}
  <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',transform:`translate(${shake}px,${-20+end*5}px) scale(${finalScale})`}}>
   <div style={{display:'flex',alignItems:'baseline',justifyContent:'center',gap:frame>=60?20:0,whiteSpace:'nowrap',transform:`scale(${numberScale})`}}>
    <div style={{fontSize:330,fontWeight:1000,lineHeight:1,letterSpacing:-22,fontVariantNumeric:'tabular-nums',textShadow:`0 0 ${25+glow*55}px #fff9,0 0 100px #e21941`,filter:frame>=30&&frame<36?'blur(1.5px)':'none'}}>{counter}</div>
    {frame>=60&&<div style={{fontSize:100,fontWeight:1000,letterSpacing:-5,color:WHITE,opacity:interpolate(showLbs,[0,.5],[0,1],clamp),transform:`translateX(${interpolate(showLbs,[0,1],[120,0],clamp)}px) scale(${interpolate(showLbs,[0,1],[1.6,1],clamp)})`,textShadow:'0 0 24px #fff9,0 0 55px #e21941'}}>LBS</div>}
   </div>
  </div>
  <AbsoluteFill style={{background:'#fff',opacity:impact*.32,pointerEvents:'none'}}/>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at center,transparent 44%,#000b 100%)',pointerEvents:'none'}}/>
 </AbsoluteFill>;
};