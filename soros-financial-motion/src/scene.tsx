import React from 'react';
import {AbsoluteFill,Easing,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
import {copy} from './copy';
const C={black:'#080B10',gold:'#D4AF37',white:'#F4F5F8'};
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
const windowOpacity=(f:number,start:number,end:number,fade=12)=>interpolate(f,[start,start+fade,end-fade,end],[0,1,1,0],clamp);
const smooth=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.out(Easing.cubic)});
const font='Montserrat, Arial Black, Arial, sans-serif';

const Chart:React.FC<{frame:number;fall?:boolean}>=({frame,fall=false})=>{
 const pts=Array.from({length:60},(_,i)=>{const x=80+i*30;const y=fall?310+i*8+Math.sin(i*.63)*24:520-Math.sin(i*.36)*100-i*2+Math.sin(i*.9)*35;return [x,y]});
 const d=pts.map(([x,y],i)=>`${i?'L':'M'} ${x} ${y}`).join(' ');
 return <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position:'absolute',inset:0,opacity:.27}}>
  <defs><linearGradient id={fall?'fallFill':'riseFill'} x1="0" y1="0" x2="0" y2="1"><stop stopColor={fall?'#d94b51':C.gold} stopOpacity=".28"/><stop offset="1" stopColor={C.black} stopOpacity="0"/></linearGradient></defs>
  {Array.from({length:9},(_,i)=><line key={i} x1="0" x2="1920" y1={110+i*112} y2={110+i*112} stroke="#8c96a4" strokeOpacity=".17"/>)}
  {Array.from({length:15},(_,i)=><line key={i} y1="0" y2="1080" x1={100+i*130} x2={100+i*130} stroke="#8c96a4" strokeOpacity=".12"/>)}
  <path d={d} fill="none" stroke={fall?'#ff6069':C.gold} strokeWidth="5" strokeDasharray="2500" strokeDashoffset={2500*(1-smooth(frame,fall?75:0,fall?138:68))} style={{filter:'drop-shadow(0 0 10px currentColor)'}}/>
 </svg>;
};
const Text:React.FC<{children:React.ReactNode;size:number;color?:string;weight?:number;spacing?:number;style?:React.CSSProperties}>=({children,size,color=C.white,weight=900,spacing=0,style})=><div style={{fontFamily:font,fontWeight:weight,fontSize:size,letterSpacing:spacing,color,lineHeight:1.05,whiteSpace:'nowrap',...style}}>{children}</div>;

export const SorosFinancialMotion:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const one=windowOpacity(f,0,80,10);
 const two=windowOpacity(f,69,158,12);
 const three=interpolate(f,[145,161],[0,1],clamp);
 const oneMove=interpolate(f,[66,84],[0,-270],clamp);
 const dateIn=spring({frame:f-79,fps,config:{stiffness:115,damping:18}});
 const goldHit=spring({frame:f-183,fps,config:{stiffness:185,damping:16}});
 const firstCount=interpolate(f,[0,58],[0,10],{...clamp,easing:Easing.out(Easing.cubic)});
 const thirdCount=interpolate(f,[151,188],[0,1],{...clamp,easing:Easing.out(Easing.cubic)});
 const lastZoom=interpolate(f,[195,239],[1,1.08],clamp);
 const shake=f>=96&&f<108?Math.sin(f*3.1)*interpolate(f,[96,108],[7,0],clamp):0;
 return <AbsoluteFill style={{background:C.black,overflow:'hidden',color:C.white}}>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 53% 52%,#19212a 0%,#080b10 72%)'}}/>
  <Chart frame={f}/>
  <AbsoluteFill style={{opacity:two}}><Chart frame={f} fall/></AbsoluteFill>
  {Array.from({length:26},(_,i)=><div key={i} style={{position:'absolute',left:(i*371)%1920,top:(i*173)%1080,width:2,height:2,background:C.gold,opacity:f>=163?interpolate(f,[163,188,239],[0,.48,.15],clamp):0,transform:`translateY(${f*(.3+i%3)}px)`}}/>)}
  <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center,transparent 38%,#0009 100%)'}}/>
  <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',opacity:one,transform:`translateX(${oneMove}px) scale(${1+smooth(f,0,72)*.07})`}}>
   <Text size={202} spacing={-9}>{Math.round(firstCount).toLocaleString('fr-FR')} <span style={{fontSize:116}}>MILLIARDS $</span></Text>
   <div style={{height:3,width:750,background:`linear-gradient(90deg,transparent,${C.gold},transparent)`,marginTop:40,boxShadow:f>55?'0 0 28px #d4af37':'none'}}/>
   <Text size={36} color={C.gold} spacing={8} weight={650} style={{marginTop:35}}>{copy.positionLabel}</Text>
  </div>
  <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',opacity:two,transform:`translateX(${interpolate(dateIn,[0,1],[210,0],clamp)+shake}px)`}}>
   <div style={{height:3,width:interpolate(f,[76,112],[0,1100],clamp),background:C.gold,marginBottom:52,boxShadow:'0 0 20px #d4af3770'}}/>
   <Text size={119} spacing={-3}>{copy.date}</Text>
   <Text size={54} color={C.gold} spacing={10} style={{marginTop:38,opacity:smooth(f,104,121)}}>{copy.blackWednesday}</Text>
  </div>
  <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',opacity:three,transform:`scale(${(f>=183?interpolate(goldHit,[0,1],[1.13,1],clamp):1)*lastZoom})`}}>
   <Text size={210} color={C.gold} spacing={-8} style={{textShadow:'0 0 46px #d4af3740'}}>{(f>=188?'1':thirdCount.toFixed(2).replace('.',','))} <span style={{fontSize:120}}>MILLIARD $</span></Text>
   <Text size={53} color={C.white} spacing={11} style={{marginTop:43,opacity:smooth(f,182,201)}}>{copy.gainLabel}</Text>
  </div>
  <div style={{position:'absolute',left:65,bottom:48,width:320,height:3,background:`linear-gradient(90deg,${C.gold} ${(f/239)*100}%,#66717b40 0)`}}/>
 </AbsoluteFill>;
};