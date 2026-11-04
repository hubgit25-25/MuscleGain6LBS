import React from 'react';
import {AbsoluteFill, Composition, Img, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const GOLD = '#D4AF37';
const WHITE = '#F4F2ED';
const RED = '#FF3B30';
const clamp = {extrapolateLeft:'clamp' as const, extrapolateRight:'clamp' as const};

// Documentary photo references. Wikimedia file pages are used for the portraits;
// the trading-floor image is credited to the London Museum (CC BY-NC 4.0).
const DRUCKENMILLER = 'https://commons.wikimedia.org/wiki/Special:FilePath/Stanley_Druckenmiller.jpg';
const SOROS = 'https://commons.wikimedia.org/wiki/Special:FilePath/George_Soros%2C_2002.jpg';
const FLOOR = 'https://collections.londonmuseum.net/download/59/672/download_HG2566_07.jpg';

const Grain:React.FC=()=> <div style={{position:'absolute',inset:0,opacity:.12,pointerEvents:'none',backgroundImage:'repeating-linear-gradient(0deg,transparent 0px,transparent 3px,#fff 4px)',mixBlendMode:'soft-light'}}/>;

const PhotoScene:React.FC<{src:string;name:string;subtitle:string;start:number;end:number;position?:string}> = ({src,name,subtitle,start,end,position='center'})=>{
 const f=useCurrentFrame();
 const {fps}=useVideoConfig();
 const local=f-start;
 const enter=spring({frame:local,fps,config:{damping:18,stiffness:85}});
 const opacity=interpolate(f,[start,start+12,end-8,end],[0,1,1,0],clamp);
 const zoom=interpolate(local,[0,end-start],[1.08,1.2],clamp);
 return <AbsoluteFill style={{opacity,background:'#080B10'}}>
  <Img src={src} onError={()=>{}} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:position,transform:`scale(${zoom}) translateX(${(1-enter)*65}px)`,filter:'contrast(1.08) saturate(.72) brightness(.66)'}}/>
  <AbsoluteFill style={{background:'linear-gradient(90deg,rgba(4,7,12,.9),rgba(4,7,12,.24) 65%,rgba(4,7,12,.55)),linear-gradient(0deg,#05070b 0%,transparent 58%)'}}/>
  <div style={{position:'absolute',left:150,bottom:170,opacity:enter,transform:`translateY(${(1-enter)*25}px)`}}>
   <div style={{fontFamily:'Arial',fontSize:23,letterSpacing:8,color:GOLD,fontWeight:700,marginBottom:18}}>AXIOME / BLACK WEDNESDAY</div>
   <div style={{fontFamily:'Arial',fontSize:76,lineHeight:1,fontWeight:900,color:WHITE,letterSpacing:-2,textShadow:'0 8px 35px #000'}}>{name}</div>
   <div style={{fontFamily:'Arial',fontSize:25,letterSpacing:3,color:'#d5d7db',marginTop:18}}>{subtitle}</div>
   <div style={{width:180,height:5,background:GOLD,marginTop:28,boxShadow:`0 0 22px ${GOLD}`}}/>
  </div>
  <Grain/>
 </AbsoluteFill>;
};

const TradingFloor:React.FC<{start:number;end:number}> = ({start,end})=>{
 const f=useCurrentFrame(); const local=f-start;
 const opacity=interpolate(f,[start,start+10,end-8,end],[0,1,1,0],clamp);
 const zoom=interpolate(local,[0,end-start],[1.02,1.15],clamp);
 return <AbsoluteFill style={{opacity,background:'#080B10'}}>
  <Img src={FLOOR} style={{width:'100%',height:'100%',objectFit:'cover',transform:`scale(${zoom})`,filter:'grayscale(1) contrast(1.15) brightness(.52)'}}/>
  <AbsoluteFill style={{background:'linear-gradient(90deg,#05070be8,#05070b40 60%,#05070b9c),linear-gradient(0deg,#05070b 0%,transparent 70%)'}}/>
  {Array.from({length:7},(_,i)=><div key={i} style={{position:'absolute',right:80+(i%3)*280,top:90+Math.floor(i/3)*220,width:210,height:130,border:'2px solid #b58b35',background:'linear-gradient(145deg,#101d25,#05080c)',boxShadow:'0 0 28px #d4af3728',padding:12,opacity:.9}}>
    <div style={{fontSize:13,color:GOLD,letterSpacing:2}}>FX / GBP</div>
    <svg viewBox="0 0 180 72" width="100%" height="72"><polyline points={Array.from({length:10},(_,j)=>`${j*20},${24+Math.sin(j*1.8+i)*14+(j>6?j*3:0)}`).join(' ')} fill="none" stroke={i%2?RED:'#70c6a0'} strokeWidth="3"/></svg>
    <div style={{fontSize:16,color:'#d7dbe0',fontFamily:'monospace'}}>1. {((1.82-i*.017)+Math.sin(f/14+i)*.006).toFixed(4)}</div>
  </div>)}
  <div style={{position:'absolute',left:130,bottom:125,color:WHITE,fontFamily:'Arial',fontSize:54,fontWeight:900,letterSpacing:2,textShadow:'0 5px 25px #000'}}>UNE SALLE DE MARCHÉ EN ÉBULLITION</div>
  <Grain/>
 </AbsoluteFill>;
};

const PositionCounter:React.FC<{start:number}> = ({start})=>{
 const f=useCurrentFrame(); const {fps}=useVideoConfig(); const local=f-start;
 const reveal=spring({frame:local,fps,config:{damping:16,stiffness:80}});
 const count=interpolate(local,[0,78],[0,10_000_000_000],{...clamp});
 const number=Math.floor(count).toLocaleString('fr-FR');
 const glow=interpolate(local,[0,35,78],[0,1,.72],clamp);
 return <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 48%,#242015 0%,#0b0c0f 48%,#030405 100%)',justifyContent:'center',alignItems:'center'}}>
  <div style={{position:'absolute',inset:0,background:'linear-gradient(115deg,transparent 0%,#d4af370c 48%,transparent 70%)'}}/>
  <div style={{fontFamily:'Arial',fontSize:26,fontWeight:800,letterSpacing:12,color:GOLD,opacity:reveal,marginBottom:35}}>TAILLE DE LA POSITION</div>
  <div style={{fontFamily:'Arial',fontSize:112,fontWeight:900,letterSpacing:-5,color:GOLD,textAlign:'center',transform:`scale(${interpolate(reveal,[0,1],[.82,1],clamp)})`,textShadow:`0 0 ${25+glow*45}px #d4af37aa,0 8px 40px #000`}}>
   {number} $
  </div>
  <div style={{width:850,height:3,background:'#5b4a23',marginTop:38,overflow:'hidden'}}>
   <div style={{height:'100%',width:`${Math.min(100,local/78*100)}%`,background:GOLD,boxShadow:`0 0 25px ${GOLD}`}}/>
  </div>
  <div style={{fontFamily:'Arial',fontSize:34,fontWeight:600,color:WHITE,letterSpacing:2,marginTop:34,opacity:reveal}}>Taille estimée de la position</div>
  <div style={{position:'absolute',bottom:62,fontFamily:'Arial',fontSize:16,letterSpacing:6,color:'#777d86'}}>ESTIMATION HISTORIQUE • 1992</div>
  <Grain/>
 </AbsoluteFill>;
};

export const BillionDollarPosition:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:'#080B10',fontFamily:'Arial,Helvetica,sans-serif',overflow:'hidden'}}>
  <PhotoScene src={DRUCKENMILLER} name="STANLEY DRUCKENMILLER" subtitle="LE GESTIONNAIRE DU QUANTUM FUND" start={0} end={60} position="center 35%"/>
  <PhotoScene src={SOROS} name="GEORGE SOROS" subtitle="LE FONDATEUR DE SOROS FUND MANAGEMENT" start={60} end={120} position="center 30%"/>
  <TradingFloor start={120} end={180}/>
  <PositionCounter start={180}/>
  <div style={{position:'absolute',top:40,left:60,fontSize:16,fontWeight:700,letterSpacing:5,color:'#ffffff80'}}>AXIOME — DOCUMENTAIRE FINANCIER</div>
 </AbsoluteFill>;
};
