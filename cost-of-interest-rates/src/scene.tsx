import React from 'react';
import {AbsoluteFill,Easing,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
const cl={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...cl,easing:Easing.inOut(Easing.cubic)});
const palette={gold:'#D4AF37',red:'#FF3B30',black:'#080B10'};
const scenes=[{name:'COMMERCE',image:'shop.svg'},{name:'USINE',image:'factory.svg'},{name:'MAISON',image:'house.svg'}];
const Arrow:React.FC<{x:number;y:number;f:number;delay:number}>=({x,y,f,delay})=>{
 const p=ease(f,30+delay,145),lift=ease(f,150,260);
 return <g transform={'translate('+x+' '+(y-115*p-80*lift)+')'} opacity={p}>
 <path d="M-19 75 V-14 H-42 L0 -75 L42 -14 H19 V75Z" fill="#FF3B30" stroke="#ff9d98" strokeWidth="3" style={{filter:'drop-shadow(0 0 13px #FF3B30)'}}/>
 </g>;
};
const Balance:React.FC<{f:number}>=({f})=>{
 const a=ease(f,290,350),tilt=Math.sin((f-340)*.055)*2.5*ease(f,330,380),zoom=1+ease(f,385,479)*.12;
 return <div style={{position:'absolute',inset:0,opacity:a,transform:'scale('+zoom+')'}}>
 <div style={{position:'absolute',left:0,top:65,width:'100%',textAlign:'center',fontSize:32,letterSpacing:8,color:'#D4AF37'}}>RENDEMENT ET RISQUE</div>
 <svg viewBox="0 0 1920 1080" width="1920" height="1080">
 <defs><linearGradient id="metal" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#624817"/><stop offset=".25" stopColor="#f7e4a7"/><stop offset=".52" stopColor="#a87b25"/><stop offset=".8" stopColor="#ebc769"/><stop offset="1" stopColor="#6d501c"/></linearGradient></defs>
 <ellipse cx="960" cy="958" rx="365" ry="39" fill="#D4AF37" opacity=".14"/>
 <path d="M760 937 L1160 937 L1100 901 L820 901Z" fill="url(#metal)"/>
 <path d="M930 903 L990 903 L976 355 L944 355Z" fill="url(#metal)"/>
 <circle cx="960" cy="344" r="43" fill="url(#metal)" stroke="#f6df99" strokeWidth="6"/>
 <g transform={'rotate('+tilt+' 960 350)'}>
 <path d="M410 350 Q960 335 1510 350" fill="none" stroke="url(#metal)" strokeWidth="30" strokeLinecap="round"/>
 <g stroke="#D4AF37" strokeWidth="6" fill="none"><path d="M500 352 L375 670 L625 670Z"/><path d="M1420 352 L1295 670 L1545 670Z"/></g>
 <path d="M320 665 Q500 830 680 665Z" fill="url(#metal)" stroke="#f7df9c" strokeWidth="4"/>
 <path d="M1240 665 Q1420 830 1600 665Z" fill="url(#metal)" stroke="#f7df9c" strokeWidth="4"/>
 {Array.from({length:5},(_,i)=><g key={i}><ellipse cx={450+i*25} cy={681-i*12} rx="34" ry="10" fill="#f0c75d" stroke="#765618" strokeWidth="4"/><rect x={416+i*25} y={663-i*12} width="68" height="17" fill="#b78d2e" stroke="#f6d879" strokeWidth="3"/></g>)}
 <text x="1415" y="718" textAnchor="middle" fill="#161a1c" fontSize="92" fontWeight="900">£</text>
 <text x="1494" y="727" textAnchor="middle" fill="#161a1c" fontSize="40" fontWeight="900">DM</text>
 </g>
 <path d="M420 580 L420 500 L385 500 L450 425 L515 500 L480 500 L480 580" fill="#D4AF37" opacity=".72"/>
 <path d="M1480 480 L1480 560 L1515 560 L1450 630 L1385 560 L1420 560 L1420 480" fill="#FF3B30" opacity=".72"/>
 </svg>
 <div style={{position:'absolute',left:115,top:805,width:700,textAlign:'center',fontSize:38,fontWeight:900,color:'#D4AF37',letterSpacing:1}}>RENDEMENT DES INTÉRÊTS</div>
 <div style={{position:'absolute',right:110,top:805,width:700,textAlign:'center',fontSize:38,fontWeight:900,color:'#fff',letterSpacing:1}}>RISQUE DE CHANGE</div>
 </div>;
};
export const CostOfInterestRates:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const appear=spring({frame:f,fps,config:{stiffness:75,damping:20}});
 const disappear=ease(f,296,330),cost=ease(f,155,195)*(1-ease(f,283,315));
 const push=interpolate(f,[0,150,285],[1,1.065,1.12],cl);
 return <AbsoluteFill style={{background:palette.black,color:'#fff',fontFamily:'Arial,Helvetica,sans-serif',overflow:'hidden'}}>
 <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 55%,#2c2416,transparent 70%)'}}/>
 <div style={{position:'absolute',inset:0,opacity:(1-disappear)*appear,transform:'scale('+push+')'}}>
 {scenes.map((s,i)=><div key={s.name} style={{position:'absolute',left:45+i*625,top:160,width:590,height:710,overflow:'hidden',border:'2px solid #9e7d3a',boxShadow:'0 0 45px #000b'}}>
 <img src={require('remotion').staticFile('environments/'+s.image)} style={{width:'100%',height:'100%',objectFit:'cover',filter:'contrast(1.13) saturate(.75) brightness(.78)',transform:'scale('+(1.07+f*.00015)+')'}}/>
 <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#080B1077,transparent 48%,#080B10e8)'}}/>
 <div style={{position:'absolute',bottom:27,left:0,width:'100%',textAlign:'center',fontSize:33,fontWeight:900,letterSpacing:5,color:'#fff'}}>{s.name}</div>
 </div>)}
 <svg style={{position:'absolute',inset:0}} width="1920" height="1080">
 {Array.from({length:13},(_,i)=><line key={i} x1="0" x2="1920" y1={160+i*70} y2={160+i*70} stroke="#D4AF37" opacity=".08"/>)}
 {[345,960,1580].map((x,i)=><React.Fragment key={i}><circle cx={x} cy="325" r="64" fill="#0b1115dd" stroke="#D4AF37" strokeWidth="4"/><text x={x} y="348" fontSize="67" textAnchor="middle" fill="#D4AF37" fontWeight="900">%</text><Arrow x={x+185} y={520} f={f} delay={i*8}/></React.Fragment>)}
 </svg>
 <div style={{position:'absolute',left:0,top:455,width:'100%',textAlign:'center',opacity:cost,transform:'scale('+(0.85+.15*cost)+')'}}>
 <span style={{background:'#080B10e8',padding:'20px 55px',fontWeight:900,fontSize:103,letterSpacing:2,textShadow:'0 0 22px #FF3B3070'}}>COÛT DU CRÉDIT <span style={{color:'#FF3B30'}}>↑</span></span>
 </div>
 </div>
 {Array.from({length:65},(_,i)=>{const p=ease(f,297+i%12,344+i%12),a=i*2.399,r=80+i*17;return <div key={i} style={{position:'absolute',left:960+Math.cos(a)*r*p,top:540+Math.sin(a)*r*p,width:3+i%4,height:3+i%4,background:'#D4AF37',borderRadius:'50%',opacity:p*(1-p)*3,boxShadow:'0 0 9px #D4AF37'}}/>})}
 <Balance f={f}/>
 <AbsoluteFill style={{pointerEvents:'none',boxShadow:'inset 0 0 145px #000c'}}/>
 </AbsoluteFill>;
};