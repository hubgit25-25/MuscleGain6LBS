import React from 'react';
import {AbsoluteFill,Easing,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
const cl={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...cl,easing:Easing.inOut(Easing.cubic)});
const Bolt:React.FC<{scale?:number}>=({scale=1})=><svg width={220*scale} height={320*scale} viewBox="0 0 220 320"><path d="M122 8 31 174h80l-20 138 103-182h-85z" fill="#4ADE80" stroke="#fff" strokeWidth="4" strokeLinejoin="round" style={{filter:'drop-shadow(0 0 25px #22c55e)'}}/></svg>;
export const EnergyBoostMotion:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const entrance=spring({frame:f,fps,config:{damping:17,stiffness:95}});
 const fill=ease(f,30,105),pct=Math.round(10+90*fill);
 const green=ease(f,58,83),full=ease(f,105,118),final=ease(f,120,145);
 const impact=spring({frame:f-105,fps,config:{damping:12,stiffness:200}});
 const shake=f>=105&&f<119?Math.sin((f-105)*2.9)*9*(1-(f-105)/14):0;
 const zoom=interpolate(f,[0,30,90,105,120,149],[.85,1,1.06,1.14,1.02,1.08],cl);
 const color=pct<35?'#EF4444':pct<70?'#FACC15':'#4ADE80';
 return <AbsoluteFill style={{background:'#080B10',fontFamily:'Montserrat,Arial,sans-serif',overflow:'hidden'}}>
 <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 48%,#123b28,transparent 62%)',opacity:.35+.65*green}}/>
 <div style={{position:'absolute',inset:0,transform:'translateX('+shake+'px) scale('+zoom+')'}}>
 <div style={{position:'absolute',left:140,top:500,width:800,height:860,opacity:(1-final)*entrance,transform:'translateY('+((1-entrance)*150)+'px)'}}>
 <svg viewBox="0 0 800 860" width="800" height="860">
 <defs><linearGradient id="battery" x1="0" y1="1" x2="0" y2="0"><stop stopColor="#16A34A"/><stop offset=".65" stopColor={color}/><stop offset="1" stopColor="#DCFCE7"/></linearGradient><clipPath id="charge"><rect x="146" y={708-570*pct/100} width="508" height={570*pct/100} rx="28"/></clipPath></defs>
 <rect x="325" y="25" width="150" height="45" rx="17" fill="#566d66" stroke="#8bcaa0" strokeWidth="5"/>
 <rect x="95" y="65" width="610" height="700" rx="65" fill="#0d1a1b" stroke="#9dbcb0" strokeWidth="13"/>
 <rect x="135" y="104" width="530" height="622" rx="39" fill="#0a1113" stroke="#315444" strokeWidth="5"/>
 <rect x="146" y="135" width="508" height="573" rx="28" fill="url(#battery)" clipPath="url(#charge)" style={{filter:'drop-shadow(0 0 22px '+color+')'}}/>
 <rect x="150" y="108" width="30" height="607" rx="15" fill="#ffffff" opacity=".08"/>
 <path d="M190 118 H600" stroke="#fff" strokeWidth="7" opacity=".2"/>
 </svg>
 <div style={{position:'absolute',left:0,top:290,width:800,textAlign:'center',fontSize:148,fontWeight:950,color:'white',textShadow:'0 0 24px '+color+',0 6px 18px #000'}}>{pct}<span style={{fontSize:76}}>%</span></div>
 </div>
 <div style={{position:'absolute',left:140,top:510,width:800,height:850,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',opacity:final,transform:'scale('+(0.7+0.3*final)+')'}}>
 <Bolt scale={1.3}/>
 <div style={{marginTop:70,fontSize:73,fontWeight:950,color:'#fff',whiteSpace:'nowrap',textShadow:'0 0 20px #22c55e'}}>PLUS D’<span style={{color:'#4ADE80'}}>ÉNERGIE</span></div>
 </div>
 <div style={{position:'absolute',left:540,top:945,width:20,height:20,borderRadius:'50%',border:'5px solid #4ADE80',opacity:(1-ease(f,105,142))*full,transform:'translate(-50%,-50%) scale('+(1+ease(f,105,142)*36)+')',boxShadow:'0 0 28px #22c55e'}}/>
 {Array.from({length:65},(_,i)=>{const a=i*2.399963,r=100+i%12*29,p=ease(f,105+i%7,140+i%7),x=540+Math.cos(a)*r*p,y=940+Math.sin(a)*r*p;return <div key={i} style={{position:'absolute',left:x,top:y,width:3+i%5,height:3+i%5,borderRadius:'50%',background:i%4===0?'white':'#4ADE80',opacity:(1-p)*full,boxShadow:'0 0 14px #22c55e'}}/>})}
 {Array.from({length:8},(_,i)=>{const a=i*Math.PI/4+f*.015,r=320+Math.sin(f*.1+i)*15,x=540+Math.cos(a)*r,y=920+Math.sin(a)*r;return <svg key={i} width="100" height="150" style={{position:'absolute',left:x,top:y,opacity:ease(f,35,60)*(1-final)*(.4+.35*Math.sin(f*.25+i))}}><polyline points="50,0 35,50 65,65 40,110 50,150" stroke="#4ADE80" strokeWidth="5" fill="none" style={{filter:'drop-shadow(0 0 10px #22c55e)'}}/></svg>})}
 </div>
 <AbsoluteFill style={{pointerEvents:'none',boxShadow:'inset 0 0 150px #000b'}}/>
 </AbsoluteFill>;
};