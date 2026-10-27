import React from 'react';
import {AbsoluteFill,Easing,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
import {copy} from './copy';
const cl={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...cl,easing:Easing.inOut(Easing.cubic)});
const font='Montserrat, Arial Black, Arial, sans-serif';
const Yellow='#FFD600';
const Token:React.FC<{word:string;index:number;start:number;yellow:boolean;frame:number;fps:number}>=({word,index,start,yellow,frame,fps})=>{
 const p=spring({frame:frame-start-index*3,fps,config:{stiffness:210,damping:16,mass:.7}});
 const opacity=interpolate(frame,[start+index*3,start+index*3+6],[0,1],cl);
 return <span style={{display:'inline-block',marginRight:13,opacity,transform:`scale(${.82+p*.18}) translateY(${(1-p)*15}px)`,color:yellow?Yellow:'#fff',textShadow:'0 4px 12px #000c'}}>{word}</span>;
};
const Headline:React.FC<{text:string;start:number;frame:number;fps:number;highlight:(i:number)=>boolean;size?:number}>=({text,start,frame,fps,highlight,size=48})=><div style={{fontFamily:font,fontWeight:900,fontSize:size,lineHeight:1.27,letterSpacing:-1.1,textAlign:'center',maxWidth:790,margin:'auto'}}>{text.split(' ').map((word,i)=><Token key={i} word={word} index={i} start={start} frame={frame} fps={fps} yellow={highlight(i)}/>)}</div>;
const FitnessArtwork:React.FC=()=> <div style={{position:'absolute',inset:0,overflow:'hidden',background:'radial-gradient(ellipse at 65% 75%,#8b1520 0%,#320b14 32%,#08090d 72%)'}}>
 <svg width="100%" height="100%" viewBox="0 0 820 840" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="athlete" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#51525b"/><stop offset=".4" stopColor="#151820"/><stop offset="1" stopColor="#020306"/></linearGradient><radialGradient id="red"><stop stopColor="#fa253a" stopOpacity=".6"/><stop offset="1" stopColor="#fa253a" stopOpacity="0"/></radialGradient></defs>
 <ellipse cx="610" cy="400" rx="300" ry="440" fill="url(#red)"/>
 <path d="M565 218 Q525 235 514 280 L466 334 Q440 390 451 486 L435 840 H754 L716 484 Q735 383 686 327 L637 279 Q629 236 601 216Z" fill="url(#athlete)" stroke="#74727a" strokeOpacity=".35" strokeWidth="5"/>
 <path d="M532 320 Q581 360 642 320 M555 360 Q590 385 655 355 M549 420 Q595 447 655 420 M570 482 Q603 505 641 480" fill="none" stroke="#8c7378" strokeOpacity=".37" strokeWidth="9"/>
 <ellipse cx="581" cy="165" rx="73" ry="92" fill="#4c4144"/><path d="M510 153 Q516 56 583 60 Q654 65 654 155 Q611 125 576 132 Q550 139 510 153Z" fill="#101217"/>
 <path d="M518 247 Q455 244 416 308 L348 487 Q326 540 365 553 Q397 559 422 516 L498 380Z M666 247 Q739 252 758 326 L814 499 Q823 550 782 562 Q745 565 730 518 L651 377Z" fill="url(#athlete)" stroke="#6b6068" strokeOpacity=".5" strokeWidth="5"/>
 </svg><div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,#090b11dc 0%,#090b116b 65%,#090b110a 100%)'}}/></div>;
const FbPost:React.FC<{frame:number;fps:number}>=({frame,fps})=>{
 const first=frame>=30&&frame<76;const second=frame>=76&&frame<123;const final=frame>=123;
 const buttonPulse=1+Math.sin((frame-124)*.15)*.028;
 return <div style={{width:900,background:'#fff',borderRadius:30,overflow:'hidden',boxShadow:'0 30px 80px #0007',fontFamily:'Arial, sans-serif'}}>
 <div style={{height:115,display:'flex',alignItems:'center',gap:18,padding:'0 30px'}}>
 <div style={{width:70,height:70,borderRadius:'50%',background:'linear-gradient(135deg,#1c1d24,#ed3340)',display:'grid',placeItems:'center',fontSize:31,fontWeight:900,color:'white'}}>CF</div>
 <div><div style={{fontSize:29,fontWeight:800,color:'#16191d'}}>COACHING FITNESS <span style={{color:'#1877f2',fontSize:23}}>●</span></div><div style={{fontSize:21,color:'#6c737e',marginTop:5}}>Sponsorisé · <span style={{fontSize:21}}>🌐</span></div></div>
 <div style={{marginLeft:'auto',color:'#656b74',fontSize:38}}>···</div>
 </div>
 <div style={{padding:'0 30px 18px',fontSize:23,color:'#24272c',lineHeight:1.4}}>Un accompagnement adapté à votre quotidien.</div>
 <div style={{height:840,position:'relative',overflow:'hidden'}}>
 <FitnessArtwork/>
 <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',padding:25}}>
 {first?<Headline text={copy.firstHeadline} start={32} frame={frame} fps={fps} highlight={i=>i<2} size={58}/>:second?<Headline text={copy.secondHeadline} start={77} frame={frame} fps={fps} highlight={i=>i>=6} size={54}/>:final?<div style={{textAlign:'center',background:'#080b10a6',padding:'30px 20px',borderRadius:20,border:'1px solid #ffffff26'}}><div style={{fontFamily:font,fontWeight:900,fontSize:41,lineHeight:1.22,color:'white'}}><span style={{color:Yellow}}>PAS BESOIN</span> D’ÊTRE AU GYM<br/>TOUS LES JOURS</div><div style={{height:3,background:'#e63440',width:310,margin:'27px auto'}}/><div style={{fontFamily:font,fontWeight:900,fontSize:36,lineHeight:1.28,color:'white'}}>ON N’AVAIT PAS BESOIN<br/>D’ACHETER <span style={{color:Yellow}}>PLEIN DE CHOSES</span></div></div>:null}
 </div>
 <div style={{position:'absolute',bottom:20,left:25,fontSize:20,color:'#ffffffa8',letterSpacing:4,fontWeight:700}}>PERSONAL COACHING</div>
 </div>
 <div style={{height:115,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 28px',background:'#f1f2f5'}}>
 <div><div style={{color:'#1c1f23',fontSize:27,fontWeight:800}}>COACHING FITNESS</div><div style={{color:'#747981',fontSize:19,marginTop:4}}>Programme de coaching personnalisé</div></div>
 <div style={{background:'#e02c3d',borderRadius:9,padding:'18px 22px',fontSize:22,fontWeight:800,color:'white',transform:`scale(${final?buttonPulse:1})`,boxShadow:final?'0 0 18px #f03a4d70':'none'}}>En savoir plus</div>
 </div>
 <div style={{height:80,display:'flex',justifyContent:'space-around',alignItems:'center',borderTop:'1px solid #e5e7ea',color:'#727781',fontSize:24,fontWeight:700}}><span>♡ J’aime</span><span>▢ Commenter</span><span>↗ Partager</span></div>
 </div>;
};
export const FacebookCoachingAd:React.FC=()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const entrance=spring({frame,fps,config:{stiffness:110,damping:19}});
 const zoom=interpolate(frame,[0,29,75,122,179],[.87,1,1.07,1.1,1.18],cl);
 const pan=ease(frame,125,179)*-65;
 return <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 40%,#29323f,#0a0d14 73%)',overflow:'hidden'}}>
 <div style={{position:'absolute',left:0,top:0,right:0,height:140,background:'#fff',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 50px',fontFamily:'Arial,sans-serif',color:'#1877f2',fontSize:58,fontWeight:900}}><span>facebook</span><span style={{fontSize:36,color:'#333'}}>⌕　☰</span></div>
 <div style={{position:'absolute',left:0,right:0,top:143,height:85,background:'#fff',display:'flex',justifyContent:'space-around',alignItems:'center',color:'#727a86',fontSize:37,borderBottom:'2px solid #e2e5e9'}}><span style={{color:'#1877f2'}}>⌂</span><span>▣</span><span>♧</span><span>☰</span></div>
 <div style={{position:'absolute',top:260,left:0,right:0,display:'flex',justifyContent:'center',transform:`translateY(${(1-entrance)*280+pan}px) scale(${zoom})`,transformOrigin:'50% 55%'}}>
 <FbPost frame={frame} fps={fps}/></div>
 <div style={{position:'absolute',inset:0,pointerEvents:'none',boxShadow:'inset 0 0 130px #0003'}}/>
 </AbsoluteFill>;
};