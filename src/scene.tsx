import React from 'react';
import {AbsoluteFill,Easing,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';

const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const RED='#ff2446';

const Athlete:React.FC<{growth:number}>=({growth})=>{
 const arm=1+growth*.45;
 const pec=1+growth*.25;
 return <svg viewBox="0 0 900 1200" width="900" height="1200" style={{overflow:'visible',filter:'drop-shadow(0 30px 45px #000)'}}>
  <defs>
   <linearGradient id="skin" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#573128"/><stop offset=".27" stopColor="#d39a7d"/><stop offset=".67" stopColor="#9b5949"/><stop offset="1" stopColor="#452621"/></linearGradient>
   <radialGradient id="shine"><stop stopColor="#ff5b67" stopOpacity=".7"/><stop offset="1" stopColor="#ff5b67" stopOpacity="0"/></radialGradient>
  </defs>
  <path d="M315 850 Q450 800 585 850 L610 1200 L285 1200Z" fill="#15151b" stroke="#473c40" strokeWidth="8"/>
  <path d="M390 270 L390 390 Q450 445 510 390 L510 270Z" fill="url(#skin)"/>
  <g transform={`translate(300 465) scale(${arm} ${1+growth*.08})`}><path d="M0 -65 C-115 -95 -155 70 -135 215 Q-110 340 -38 290 Q20 240 40 20Z" fill="url(#skin)" stroke="#593127" strokeWidth="8"/><path d="M-110 50 Q-155 185 -75 250" stroke="#f7b296" strokeWidth="13" opacity=".5" fill="none"/></g>
  <g transform={`translate(600 465) scale(${arm} ${1+growth*.08})`}><path d="M0 -65 C115 -95 155 70 135 215 Q110 340 38 290 Q-20 240 -40 20Z" fill="url(#skin)" stroke="#593127" strokeWidth="8"/><path d="M110 50 Q155 185 75 250" stroke="#f7b296" strokeWidth="13" opacity=".5" fill="none"/></g>
  <path d="M330 390 Q450 340 570 390 L635 680 Q550 785 550 930 Q450 975 350 930 Q350 785 265 680Z" fill="url(#skin)" stroke="#482823" strokeWidth="9"/>
  <g transform={`translate(450 500) scale(${pec} ${1+growth*.12})`}>
   <path d="M-5 -100 Q-130 -150 -205 -55 Q-205 65 -15 90Z" fill="url(#skin)" stroke="#5c322a" strokeWidth="8"/>
   <path d="M5 -100 Q130 -150 205 -55 Q205 65 15 90Z" fill="url(#skin)" stroke="#5c322a" strokeWidth="8"/>
   <path d="M-175 -30 Q-105 -65 -25 -15 M175 -30 Q105 -65 25 -15" fill="none" stroke="#eeb298" strokeWidth="11" opacity=".45"/>
  </g>
  {[0,1,2].map(i=><g key={i} opacity={.4+growth*.45}><path d={`M370 ${660+i*75} Q405 ${640+i*75} 435 ${670+i*75} L430 ${718+i*75} Q385 ${735+i*75} 370 ${695+i*75}Z`} fill="#60352e"/><path d={`M530 ${660+i*75} Q495 ${640+i*75} 465 ${670+i*75} L470 ${718+i*75} Q515 ${735+i*75} 530 ${695+i*75}Z`} fill="#60352e"/></g>)}
  <path d="M450 630 L450 900" stroke="#3b2420" strokeWidth="9" opacity=".5"/>
  <path d="M360 125 Q365 25 450 25 Q535 25 540 125 L520 265 Q495 335 450 340 Q405 335 380 265Z" fill="url(#skin)" stroke="#4a2b27" strokeWidth="8"/>
  <path d="M360 140 Q350 30 445 13 Q545 20 540 140 Q500 115 500 75 Q440 112 365 105Z" fill="#161417"/>
  <path d="M398 185 L430 188 M470 188 L502 185" stroke="#231819" strokeWidth="11" strokeLinecap="round"/>
  <path d="M450 194 L437 253 L462 255 M417 287 Q450 305 483 287" fill="none" stroke="#5c3932" strokeWidth="7" strokeLinecap="round"/>
  <ellipse cx="450" cy="550" rx="320" ry="440" fill="url(#shine)" opacity={growth*.25}/>
 </svg>;
};

export const MuscleGain6LBS:React.FC=()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const growth=interpolate(frame,[48,122],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
 const count=Math.round(interpolate(frame,[55,118],[0,6],{...clamp,easing:Easing.out(Easing.cubic)}));
 const intro=interpolate(frame,[0,15,43,60],[0,1,1,0],clamp);
 const mid=interpolate(frame,[56,70,112,125],[0,1,1,0],clamp);
 const reveal=spring({frame:frame-120,fps,config:{damping:12,stiffness:150}});
 const particles=Array.from({length:45},(_,i)=>({x:540+Math.sin(i*2.4)*((i*73)%480),y:(frame*-(1+i%4)*1.7+250+i*83)%1750+130,size:2+i%6}));
 return <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 38%,#38121b 0%,#10090e 46%,#030305 88%)',color:'white',fontFamily:'Arial,Helvetica,sans-serif',overflow:'hidden'}}>
  <div style={{position:'absolute',top:340,left:90,transform:`translateY(${Math.sin(frame/28)*13}px) scale(${1+frame*.0005})`}}><Athlete growth={growth}/></div>
  <div style={{position:'absolute',inset:0,background:'linear-gradient(0deg,#000 0%,transparent 36%,transparent 80%,#0009)',pointerEvents:'none'}}/>
  {particles.map((p,i)=><div key={i} style={{position:'absolute',left:p.x,top:p.y,width:p.size,height:p.size,borderRadius:'50%',background:i%3===0?'#fff':RED,opacity:.2+growth*.5,boxShadow:`0 0 18px ${RED}`}}/>)}
  <div style={{position:'absolute',top:140,width:'100%',textAlign:'center',fontSize:30,fontWeight:900,letterSpacing:9,color:'#ff5066'}}>TRANSFORMATION / 006</div>
  <div style={{position:'absolute',top:375,width:'100%',textAlign:'center',fontSize:77,fontWeight:900,opacity:intro,transform:`translateY(${(1-intro)*50}px)`,textShadow:'0 5px 30px #000'}}>DÉVELOPPE TES MUSCLES</div>
  <div style={{position:'absolute',bottom:300,width:'100%',textAlign:'center',opacity:mid}}>
   <div style={{fontSize:160,fontWeight:900,textShadow:`0 0 60px ${RED}`}}>{count} <span style={{fontSize:75}}>LBS</span></div>
   <div style={{width:680,height:18,borderRadius:20,margin:'15px auto',background:'#4d1a28',overflow:'hidden'}}><div style={{width:`${growth*100}%`,height:'100%',background:RED,boxShadow:`0 0 20px ${RED}`}}/></div>
   <div style={{fontSize:32,letterSpacing:8,fontWeight:800}}>PROGRESSION MUSCULAIRE</div>
  </div>
  {frame>=120&&<div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',opacity:interpolate(reveal,[0,.5],[0,1],clamp),transform:`scale(${interpolate(reveal,[0,1],[1.5,1],clamp)})`}}>
   <div style={{fontSize:225,fontWeight:900,letterSpacing:-10,textShadow:`0 0 45px ${RED},0 0 130px ${RED},0 8px 35px #000`}}>+6 LBS</div>
   <div style={{fontSize:70,fontWeight:900,letterSpacing:10,textShadow:'0 5px 20px #000'}}>DE MUSCLE GAGNÉS</div>
   <div style={{width:350,height:8,background:RED,marginTop:40,boxShadow:`0 0 30px ${RED}`}}/>
  </div>}
  <div style={{position:'absolute',bottom:80,width:'100%',textAlign:'center',fontSize:25,letterSpacing:6,color:'#c3a8ae'}}>DÉPASSE TES LIMITES</div>
 </AbsoluteFill>;
};
