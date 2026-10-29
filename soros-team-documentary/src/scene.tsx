import React from 'react';
import {AbsoluteFill,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';
const c={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const fade=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],c);
export const Scene=()=>{
const f=useCurrentFrame(),team=fade(f,60,100),room=fade(f,125,160),line=fade(f,185,270);
const points=Array.from({length:80},(_,i)=>[i*15,85+i*4+Math.sin(i*.27)*24]);
const path=points.map(([x,y],i)=>(i?'L':'M')+x+' '+y).join(' ');
return <AbsoluteFill style={{background:'#080B10',color:'#fff',fontFamily:'Arial,sans-serif'}}>
<div style={{position:'absolute',top:40,width:'100%',textAlign:'center',fontSize:64,fontWeight:900,color:'#D4AF37'}}>SOROS ET SON ÉQUIPE</div>
<div style={{opacity:1-room}}>
{['soros.jpg','druckenmiller.webp'].map((file,i)=><div key={file} style={{position:'absolute',left:i?1030:team?250:655,top:155,width:600,height:600,opacity:i?team:1,overflow:'hidden',border:'3px solid #D4AF37'}}>
<Img src={staticFile('portraits/'+file)} style={{width:'100%',height:'100%',objectFit:'cover',filter:'grayscale(.7) sepia(.3)'}}/>
<div style={{position:'absolute',bottom:0,background:'#080B10dd',width:'100%',textAlign:'center',padding:'20px 0',fontSize:36,fontWeight:900}}>{i?'STANLEY DRUCKENMILLER':'GEORGE SOROS'}</div></div>)}
<svg width="1920" height="1080" style={{position:'absolute',inset:0}}>
<line x1="340" x2={340+1240*fade(f,10,100)} y1="910" y2="910" stroke="#D4AF37" strokeWidth="6"/>
{[['1930','BUDAPEST',350,15],['1947','LONDRES',960,40],['1956','ÉTATS-UNIS',1570,70]].map(([year,city,x,t])=><g key={year} opacity={fade(f,Number(t),Number(t)+20)}><circle cx={Number(x)} cy="910" r="14" fill="#D4AF37"/><text x={Number(x)} y="870" fontSize="45" fontWeight="900" textAnchor="middle" fill="#D4AF37">{year}</text><text x={Number(x)} y="965" fontSize="25" textAnchor="middle">{city}</text></g>)}
</svg></div>
<div style={{position:'absolute',inset:0,opacity:room,background:'radial-gradient(ellipse at center,#263239,#080B10 75%)'}}>
{Array.from({length:7},(_,i)=><div key={i} style={{position:'absolute',left:60+i*270,top:300+i%2*70,width:230,height:230,background:'#10202b',border:'12px solid #4e5d67',boxShadow:'0 30px 25px #000'}}>
<svg width="230" height="230"><path d="M10 170 L45 120 L90 135 L140 65 L210 90" stroke="#D4AF37" fill="none" strokeWidth="3"/></svg></div>)}
<div style={{position:'absolute',left:300,top:230,width:1320,height:570,background:'#080B10e8',border:'3px solid #D4AF37'}}>
<div style={{padding:28,fontSize:32,color:'#D4AF37'}}>LIVRE STERLING · GRAPHIQUE ILLUSTRATIF</div>
<svg width="1250" height="440"><defs><clipPath id="reveal"><rect width={1200*line} height="440"/></clipPath></defs><g clipPath="url(#reveal)"><path d={path} transform="translate(25 0)" stroke="white" strokeWidth="6" fill="none"/></g></svg>
</div>
<div style={{position:'absolute',bottom:60,width:'100%',textAlign:'center',fontSize:48,fontWeight:900,opacity:fade(f,250,290)}}>STRATÉGIE COLLECTIVE — 1992</div></div>
</AbsoluteFill>;
};