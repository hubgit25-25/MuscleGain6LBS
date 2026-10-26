import React from 'react';
import {AbsoluteFill,Easing,Img,OffthreadVideo,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {assets} from './assets';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
const PersonScale:React.FC<{frame:number}>=({frame})=>{
 const step=ease(frame,0,24);
 const y=interpolate(step,[0,1],[-105,0]);
 return <svg width="100%" height="100%" viewBox="0 0 650 1550" style={{overflow:'visible',filter:'drop-shadow(0 22px 28px #000a)'}}>
 <defs><linearGradient id="skin" x1="0" x2="1"><stop stopColor="#6f3e31"/><stop offset=".5" stopColor="#d9a07d"/><stop offset="1" stopColor="#8a5140"/></linearGradient><linearGradient id="shirt" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#5b606a"/><stop offset="1" stopColor="#151920"/></linearGradient></defs>
 <g transform={`translate(0 ${y})`}>
 <path d="M220 820 L430 820 L443 1115 L392 1390 L322 1390 L315 1050 L292 1390 L220 1390 L194 1115Z" fill="url(#skin)"/>
 <path d="M200 820 L438 820 L435 1000 L329 1020 L212 1000Z" fill="#101218" stroke="#40414b" strokeWidth="8"/>
 <path d="M212 1360 L305 1360 L308 1410 L185 1420 Q177 1390 212 1360 M344 1360 L425 1360 L475 1420 L340 1420Z" fill="#f3f2ee" stroke="#aaa" strokeWidth="7"/>
 <path d="M195 350 Q325 300 460 350 L485 825 Q325 870 165 825Z" fill="url(#shirt)" stroke="#0a0b10" strokeWidth="8"/>
 <path d="M193 370 Q125 390 108 520 L100 800" fill="none" stroke="url(#skin)" strokeWidth="87" strokeLinecap="round"/>
 <path d="M458 370 Q535 410 540 535 L535 805" fill="none" stroke="url(#skin)" strokeWidth="89" strokeLinecap="round"/>
 <path d="M276 240 L276 375 Q325 410 373 375 L373 240Z" fill="url(#skin)"/>
 <ellipse cx="325" cy="185" rx="112" ry="146" fill="url(#skin)"/>
 <path d="M210 180 Q205 40 324 30 Q452 35 438 180 Q394 143 380 95 Q307 145 210 140Z" fill="#17161b"/>
 <path d="M253 201 L293 204 M359 204 L397 201" stroke="#35251f" strokeWidth="10" strokeLinecap="round"/>
 <path d="M325 210 L315 269 L339 270 M288 301 Q325 313 362 301" fill="none" stroke="#6c453b" strokeWidth="7" strokeLinecap="round"/>
 </g>
 <g>
 <ellipse cx="325" cy="1470" rx="220" ry="56" fill="#0009"/>
 <path d="M145 1420 L505 1420 L542 1490 Q325 1545 108 1490Z" fill="#0a0e14" stroke="#66717a" strokeWidth="9"/>
 <path d="M160 1415 L490 1415 L510 1470 L140 1470Z" fill="#222932"/>
 <rect x="265" y="1435" width="125" height="40" rx="9" fill="#132b2b" stroke="#6b8c87" strokeWidth="5"/>
 <text x="327" y="1465" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="31" fill="#9afbd0">195</text>
 </g>
 </svg>;
};
export const WeightScale195:React.FC=()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const counter=Math.round(interpolate(frame,[30,57],[0,195],{...clamp,easing:Easing.out(Easing.cubic)}));
 const impact=spring({frame:frame-60,fps,config:{stiffness:260,damping:12,mass:.65}});
 const final=ease(frame,90,119);
 const appear=spring({frame:frame-30,fps,config:{stiffness:140,damping:17}});
 const shake=frame>=60?Math.sin(frame*3.7)*interpolate(frame,[60,65,79],[12,5,0],clamp):0;
 const zoom=interpolate(frame,[0,30,90,119],[1,1.065,1.085,1.15],clamp);
 const real=Boolean(assets.personVideo||assets.personImage);
 return <AbsoluteFill style={{overflow:'hidden',background:'#050609',color:'#fff',fontFamily:'Montserrat,Arial Black,Arial,sans-serif'}}>
 <AbsoluteFill style={{background:'radial-gradient(ellipse at 25% 43%,#4a1620 0%,#161218 48%,#030406 88%)'}}/>
 {[0,1,2,3].map(i=><div key={i} style={{position:'absolute',left:80+i*300,top:200,width:18,height:1330,background:'#47505a',opacity:.3}}/>)}
 <div style={{position:'absolute',left:70,top:260,width:930,height:24,background:'#bdc4c7',boxShadow:'0 0 80px #fff6'}}/>
 <div style={{position:'absolute',left:0,right:0,top:1540,bottom:0,background:'linear-gradient(#22232b,#050507)'}}/>
 <AbsoluteFill style={{transform:`translateX(${shake}px) scale(${zoom})`,transformOrigin:'42% 55%'}}>
  <div style={{position:'absolute',left:5,top:180,width:680,height:1460}}>
  {assets.personVideo?<OffthreadVideo src={staticFile(assets.personVideo)} muted style={{width:'100%',height:'100%',objectFit:'contain'}}/>:assets.personImage?<Img src={staticFile(assets.personImage)} style={{width:'100%',height:'100%',objectFit:'contain'}}/>:<PersonScale frame={frame}/>}
  </div>
 </AbsoluteFill>
 {frame>=30&&<div style={{position:'absolute',left:595,top:830,width:475,textAlign:'center',opacity:interpolate(appear,[0,.55],[0,1],clamp),transform:`translateX(${interpolate(appear,[0,1],[130,0],clamp)}px) scale(${frame>=60?interpolate(impact,[0,1],[1.28,1],clamp)*(1+final*.08):1})`}}>
  <div style={{fontSize:154,fontWeight:1000,letterSpacing:-10,lineHeight:1,textShadow:'0 0 27px #fff8,0 0 60px #f12345'}}>{counter}</div>
  <div style={{fontSize:79,fontWeight:1000,letterSpacing:9,textShadow:'0 0 25px #fff8'}}>LBS</div>
 </div>}
 {frame>=60&&<svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,pointerEvents:'none',opacity:interpolate(impact,[0,1],[0,.9],clamp)}}>
 <path d="M750 1050 L750 1310 L490 1450" fill="none" stroke="#ff3153" strokeWidth="5" strokeDasharray="13 10" style={{filter:'drop-shadow(0 0 14px #ff3153)'}}/><circle cx="490" cy="1450" r="13" fill="#ff3153"/>
 </svg>}
 {Array.from({length:36},(_,i)=>{const a=i*2.399,r=frame>=60?(frame-60)*(3+i%4)*3:0;return <div key={i} style={{position:'absolute',left:805+Math.cos(a)*r,top:925+Math.sin(a)*r,width:2+i%5,height:2+i%5,borderRadius:'50%',background:i%3===0?'#fff':'#f33',opacity:frame>=60?interpolate(frame,[60,72,118],[.9,.7,0],clamp):0,boxShadow:'0 0 15px #f33'}}/>})}
 <AbsoluteFill style={{background:'radial-gradient(ellipse at center,transparent 45%,#0009 100%)',pointerEvents:'none'}}/>
 </AbsoluteFill>;
};