import React from 'react';
import {AbsoluteFill,OffthreadVideo,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig,Easing} from 'remotion';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
const Ad:React.FC<{frame:number;fps:number}>=({frame,fps})=>{
 const enter=spring({frame:frame-30,fps,config:{damping:18,stiffness:125,mass:.8}});
 const lift=ease(frame,76,121);
 const hit=spring({frame:frame-121,fps,config:{damping:13,stiffness:180}});
 const opacity=interpolate(frame,[29,38],[0,1],clamp);
 return <div style={{position:'absolute',left:153,top:1090,width:775,height:595,opacity,transform:`perspective(1100px) translateY(${(1-enter)*240-lift*65}px) rotateX(${(1-enter)*8-lift*1.5}deg) scale(${.82+enter*.18+lift*.06})`,transformOrigin:'center top',filter:'drop-shadow(0 24px 32px #0008)'}}>
 <div style={{height:'100%',background:'#0a0c10',border:`3px solid rgba(255,65,75,${.4+lift*.55})`,borderRadius:27,boxShadow:`0 0 ${lift*33}px rgba(255,48,61,.45)`,overflow:'hidden'}}>
 <div style={{height:80,background:'#fff',display:'flex',alignItems:'center',padding:'0 24px',gap:16}}>
 <div style={{width:51,height:51,borderRadius:'50%',background:'linear-gradient(145deg,#101010,#e32d39)',display:'grid',placeItems:'center',fontSize:24,color:'white',fontWeight:900}}>C</div>
 <div style={{fontFamily:'Arial,sans-serif',color:'#111',fontSize:21,fontWeight:800}}>COACHING FITNESS<div style={{fontSize:14,fontWeight:400,color:'#737373'}}>Sponsorisé · Annonce</div></div>
 <div style={{marginLeft:'auto',color:'#777',fontSize:31}}>···</div></div>
 <div style={{height:405,position:'relative',background:'radial-gradient(ellipse at 30% 65%,#4d0b14,#090b10 60%)',overflow:'hidden'}}>
 <div style={{position:'absolute',left:28,top:54,fontFamily:'Arial Black,Montserrat,Arial,sans-serif',fontWeight:1000,color:'white',fontSize:53,lineHeight:1.03,letterSpacing:-2,transform:`translateX(${(1-ease(frame,58,78))*35}px)`}}>TRANSFORM<br/><span style={{color:'#ff4049'}}>YOUR BODY</span></div>
 <div style={{position:'absolute',left:30,top:209,width:470,height:4,background:'#ff3b46',boxShadow:'0 0 15px #f34'}}/>
 <div style={{position:'absolute',left:30,top:232,color:'#e6e7ea',fontFamily:'Arial,sans-serif',fontSize:23,letterSpacing:2}}>STRENGTH · MINDSET · RESULTS</div>
 <div style={{position:'absolute',right:24,bottom:18,fontSize:120,fontWeight:900,color:'#fff1',fontFamily:'Arial Black'}}>FIT</div>
 <div style={{position:'absolute',left:30,bottom:25,color:'white',fontSize:35,fontFamily:'Arial Black,Arial,sans-serif',fontWeight:900,opacity:ease(frame,118,142),transform:`scale(${1+Math.max(0,hit)*.04})`,textShadow:'0 0 16px #f33'}}>PERSONAL COACHING</div>
 </div><div style={{height:110,background:'#f7f8fb',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 28px',fontFamily:'Arial,sans-serif'}}>
 <div style={{color:'#111',fontSize:20,fontWeight:800}}>Atteins tes objectifs<div style={{color:'#555',fontSize:16,fontWeight:400,marginTop:5}}>Programme adapté à ton niveau</div></div>
 <div style={{background:'#e92c39',color:'white',padding:'15px 18px',borderRadius:9,fontSize:19,fontWeight:900}}>EN SAVOIR PLUS</div>
 </div></div></div>;
};
export const CoachingAdMotion:React.FC=()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const zoom=interpolate(frame,[0,30,75,120,179],[1,1.025,1.035,1.12,1.18],clamp);
 const pan=interpolate(frame,[0,75,179],[0,-12,-45],clamp);
 return <AbsoluteFill style={{background:'#0b0d11',overflow:'hidden'}}>
 <div style={{position:'absolute',left:0,top:0,width:1080,height:1920,transform:`translateY(${pan}px) scale(${zoom})`,transformOrigin:'50% 63%'}}>
 <OffthreadVideo src={staticFile('facebook-capture.mp4')} muted style={{width:1080,height:1920,objectFit:'contain',background:'#c4c9cf'}}/>
 <Ad frame={frame} fps={fps}/></div>
 <AbsoluteFill style={{pointerEvents:'none',background:'radial-gradient(ellipse at 50% 53%,transparent 64%,#0005 100%)'}}/>
 </AbsoluteFill>;
};