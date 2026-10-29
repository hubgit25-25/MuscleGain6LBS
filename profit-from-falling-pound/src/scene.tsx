import React from 'react';
import {AbsoluteFill,Easing,interpolate,useCurrentFrame} from 'remotion';
const GOLD='#D4AF37',RED='#FF3B30',BG='#080B10';
const opts={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const progress=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...opts,easing:Easing.inOut(Easing.cubic)});
const Label:React.FC<{value:string;color?:string;size?:number}>=({value,color='#fff',size=104})=><span style={{fontSize:size,fontWeight:900,color,letterSpacing:1,textShadow:'0 5px 26px #000c'}}>{value}</span>;
export const ProfitFromFallingPound:React.FC=()=>{
 const f=useCurrentFrame(),initial=progress(f,10,48),sale=progress(f,58,112),buy=progress(f,137,198),gain=progress(f,208,279),reverse=progress(f,303,351),loss=progress(f,369,426);
 const firstFade=1-progress(f,294,327);
 const downPts=Array.from({length:70},(_,i)=>[i*14,100+i*5+Math.sin(i*.28)*16]);
 const upPts=Array.from({length:70},(_,i)=>[i*14,425-i*5+Math.sin(i*.28)*15]);
 const line=(pts:number[][])=>pts.map(([x,y],i)=>(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)).join(' ');
 const barOpacity=progress(f,12,45);
 return <AbsoluteFill style={{background:BG,color:'#fff',fontFamily:'Arial,Helvetica,sans-serif',overflow:'hidden'}}>
 <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 55%,#242019 0%,#080B10 70%)'}}/>
 <div style={{position:'absolute',top:62,left:0,width:'100%',textAlign:'center',fontSize:54,fontWeight:900,letterSpacing:8,color:'#f6f6f6'}}>GAGNER À LA BAISSE</div>
 <div style={{position:'absolute',top:145,left:0,width:'100%',textAlign:'center',fontSize:25,letterSpacing:5,color:GOLD}}>VENTE À DÉCOUVERT · EXEMPLE PÉDAGOGIQUE</div>
 <svg width="1920" height="1080" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
 {Array.from({length:10},(_,i)=><line key={'h'+i} x1="120" x2="1800" y1={245+i*68} y2={245+i*68} stroke={GOLD} opacity=".065"/>)}
 {Array.from({length:15},(_,i)=><line key={'v'+i} x1={140+i*120} x2={140+i*120} y1="245" y2="860" stroke={GOLD} opacity=".055"/>)}
 <g opacity={barOpacity*firstFade}><line x1="285" y1="778" x2="1625" y2="778" stroke={GOLD} strokeWidth="4" opacity=".5"/>
 {[410,960,1500].map((x,i)=><circle key={i} cx={x} cy="778" r="12" fill={GOLD}/>)}</g>
 </svg>
 <div style={{position:'absolute',left:160,top:340,width:1600,display:'flex',alignItems:'center',justifyContent:'space-around',opacity:firstFade}}>
 <div style={{opacity:initial,transform:'translateY('+(1-initial)*60+'px)'}}><Label value="100 £"/></div>
 <div style={{opacity:sale,transform:'scale('+(.75+.25*sale)+')'}}><Label value="→" color={GOLD} size={95}/></div>
 <div style={{opacity:sale,transform:'translateY('+(1-sale)*60+'px)'}}><Label value="300 DEM" color={GOLD}/></div>
 </div>
 <div style={{position:'absolute',top:535,width:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:60,opacity:buy*firstFade}}>
 <Label value="300 DEM" color={GOLD} size={70}/><Label value="→" color="#fff" size={64}/><Label value="250 DEM" size={70}/>
 </div>
 <div style={{position:'absolute',top:650,width:'100%',textAlign:'center',opacity:gain*firstFade,transform:'scale('+(.7+.3*gain)+')'}}>
 <Label value="+50 DEM" color={GOLD} size={150}/>
 </div>
 <svg style={{position:'absolute',left:430,top:630,opacity:gain*firstFade*.45}} width="1060" height="380">
 <defs><clipPath id="fallReveal"><rect width={980*gain} height="380"/></clipPath></defs>
 <g clipPath="url(#fallReveal)"><path d={line(downPts)} stroke={GOLD} strokeWidth="7" fill="none"/></g>
 </svg>
 <div style={{position:'absolute',inset:0,opacity:reverse,background:'radial-gradient(ellipse at center,#281014 0%,transparent 72%)'}}/>
 <svg width="1100" height="560" style={{position:'absolute',left:410,top:280,opacity:reverse}}>
 <defs><clipPath id="riseReveal"><rect width={1020*progress(f,320,421)} height="560"/></clipPath></defs>
 <g clipPath="url(#riseReveal)"><path d={line(upPts)} stroke={RED} strokeWidth="12" strokeLinecap="round" fill="none" style={{filter:'drop-shadow(0 0 14px #FF3B30)'}}/></g>
 <path d="M1000 68 L1038 0 L1075 68Z" fill={RED} opacity={progress(f,407,439)}/>
 </svg>
 <div style={{position:'absolute',top:735,width:'100%',textAlign:'center',opacity:loss,transform:'scale('+(.85+.15*loss)+')'}}>
 <Label value="PERTE POSSIBLE" color={RED} size={91}/>
 </div>
 <div style={{position:'absolute',bottom:40,right:65,padding:'12px 26px',background:'#171c22',border:'2px solid #D4AF37',borderRadius:6,fontSize:27,fontWeight:800,letterSpacing:2,color:'#f5e3b2'}}>EXEMPLE FICTIF</div>
 <AbsoluteFill style={{pointerEvents:'none',boxShadow:'inset 0 0 145px #000a'}}/>
 </AbsoluteFill>;
};