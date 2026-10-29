import React from 'react';
import {AbsoluteFill,Easing,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const fade=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
const notes=[{code:'FRF',name:'FRANC FRANÇAIS',num:'100',base:'#879c9b',ink:'#27474d'},{code:'DEM',name:'DEUTSCHE MARK',num:'100',base:'#b6a482',ink:'#534a34'},{code:'GBP',name:'LIVRE STERLING',num:'20',base:'#9c9b8d',ink:'#484b42'}];
const Note:React.FC<{i:number;f:number}>=({i,f})=>{
 const n=notes[i],enter=spring({frame:f-i*9,fps:30,config:{damping:17,stiffness:85}}),exit=fade(f,66,86);
 const x=210+i*560,y=350+Math.sin(f*.045+i*2)*13;
 return <div style={{position:'absolute',left:x,top:y,width:430,height:255,opacity:enter*(1-exit*.86),transform:'perspective(1000px) rotateY('+(Math.sin(f*.026+i)*7)+'deg) rotateZ('+(-3+i*3)+'deg) translateY('+((1-enter)*120-exit*95)+'px) scale('+(1-exit*.25)+')',filter:'drop-shadow(0 22px 35px #000b)'}}>
 <svg viewBox="0 0 430 255" width="430" height="255">
 <defs><pattern id={'pattern'+i} width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0 6 Q6 0 12 6 M0 12 Q6 6 12 12" fill="none" stroke={n.ink} strokeWidth=".6" opacity=".28"/></pattern></defs>
 <rect x="2" y="2" width="426" height="251" rx="7" fill={n.base} stroke="#ded7b5" strokeWidth="4"/>
 <rect x="12" y="12" width="406" height="231" fill={'url(#pattern'+i+')'} stroke={n.ink} strokeWidth="2"/>
 <rect x="25" y="25" width="380" height="205" rx="3" fill="none" stroke={n.ink} strokeWidth="2"/>
 <ellipse cx="215" cy="127" rx="110" ry="95" fill="#d6d2b7" opacity=".5" stroke={n.ink} strokeWidth="5"/>
 <ellipse cx="215" cy="127" rx="85" ry="76" fill="none" stroke={n.ink} strokeWidth="2"/>
 {Array.from({length:20},(_,k)=><path key={k} d={'M215 127 Q'+(90+k*12)+' 22 '+(55+k*17)+' 215'} stroke={n.ink} strokeWidth=".8" fill="none" opacity=".28"/>)}
 <text x="38" y="65" fontSize="42" fontWeight="900" fill={n.ink}>{n.num}</text>
 <text x="310" y="215" fontSize="44" fontWeight="900" fill={n.ink}>{n.num}</text>
 <text x="215" y="118" fontSize="22" textAnchor="middle" fontWeight="900" fill={n.ink}>{n.code}</text>
 <text x="215" y="147" fontSize="11" textAnchor="middle" letterSpacing="3" fill={n.ink}>EUROPE • 1992</text>
 </svg>
 <div style={{position:'absolute',top:290,width:'100%',textAlign:'center',fontWeight:900,letterSpacing:2,color:'#f4f0e5',fontSize:25,textShadow:'0 3px 12px #000'}}>{n.name}</div>
 </div>;
};
const Chart:React.FC<{f:number}>=({f})=>{
 const inChart=fade(f,73,96),trace=fade(f,91,135),y0=310,y1=710;
 const pts=Array.from({length:110},(_,i)=>{const x=175+i*14.4;const y=510+Math.sin(i*.17)*55+Math.sin(i*.49)*19+Math.cos(i*.063)*38;return [x,y]});
 const path=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
 return <div style={{position:'absolute',left:0,top:0,width:1920,height:1080,opacity:inChart}}>
 <svg width="1920" height="1080" viewBox="0 0 1920 1080">
 <defs><linearGradient id="gold" x1="0" x2="1"><stop stopColor="#8c6d20"/><stop offset=".5" stopColor="#f1d889"/><stop offset="1" stopColor="#b68b30"/></linearGradient><clipPath id="reveal"><rect x="160" y="0" width={1600*trace} height="1080"/></clipPath></defs>
 {Array.from({length:7},(_,i)=><line key={i} x1="170" x2="1750" y1={300+i*70} y2={300+i*70} stroke="#71807a" opacity=".12"/>)}
 <line x1="165" x2="1755" y1={y0} y2={y0} stroke="url(#gold)" strokeWidth="5"/>
 <line x1="165" x2="1755" y1={y1} y2={y1} stroke="url(#gold)" strokeWidth="5"/>
 <text x="180" y="286" fill="#D4AF37" fontSize="25" letterSpacing="2">LIMITE SUPÉRIEURE</text>
 <text x="180" y="754" fill="#D4AF37" fontSize="25" letterSpacing="2">LIMITE INFÉRIEURE</text>
 <g clipPath="url(#reveal)"><path d={path} stroke="#ffffff" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" fill="none" style={{filter:'drop-shadow(0 0 9px #ffffff75)'}}/></g>
 </svg>
 </div>;
};
export const ERM1992:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const titleOut=fade(f,68,89),chartIn=fade(f,78,100),focus=fade(f,165,210);
 const pulse=f>=165?1+Math.sin((f-165)*.13)*.015:1;
 const push=interpolate(f,[0,75,165,239],[1,1.035,1.035,1.16],clamp);
 return <AbsoluteFill style={{background:'#080B10',color:'#fff',fontFamily:'Montserrat,Arial,sans-serif',overflow:'hidden'}}>
 <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 48%,#18231d,transparent 68%)'}}/>
 <div style={{position:'absolute',inset:0,transform:'scale('+push+')'}}>
 {notes.map((_,i)=><Note key={i} i={i} f={f}/>)}
 <Chart f={f}/>
 <div style={{position:'absolute',left:0,top:95,width:'100%',textAlign:'center',fontSize:35,letterSpacing:9,fontWeight:800,color:'#D4AF37',opacity:1-titleOut}}>EUROPE · 1992</div>
 <div style={{position:'absolute',top:765,width:'100%',textAlign:'center',opacity:chartIn,transform:'scale('+pulse+')'}}>
 <div style={{fontSize:91,fontWeight:950,color:'#D4AF37',letterSpacing:-3,textShadow:'0 0 '+(14+focus*25)+'px #D4AF3770'}}>1 GBP = 2,95 DEM</div>
 </div>
 <div style={{position:'absolute',left:0,top:920,width:'100%',display:'flex',justifyContent:'center',gap:100,opacity:focus*.25,color:'#b4c1b7',fontSize:40,fontWeight:800,letterSpacing:8}}><span>FRF</span><span>DEM</span><span>GBP</span></div>
 </div>
 <AbsoluteFill style={{pointerEvents:'none',boxShadow:'inset 0 0 160px #000b'}}/>
 </AbsoluteFill>;
};