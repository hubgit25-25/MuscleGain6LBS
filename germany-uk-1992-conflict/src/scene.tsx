import React from 'react';
import {AbsoluteFill,Easing,Img,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
const cl={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...cl,easing:Easing.inOut(Easing.cubic)});
const LineChart:React.FC<{side:'de'|'uk';f:number}>=({side,f})=>{
 const isDE=side==='de',p=ease(f,isDE?60:104,isDE?103:141);
 const pts=Array.from({length:70},(_,i)=>{const t=i/69;return [55+t*720, isDE?300-185*t+Math.sin(t*25)*15+Math.sin(t*64)*6:125+178*t+Math.sin(t*23)*13+Math.sin(t*62)*8]});
 const d=pts.map(([x,y],i)=>(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)).join(' ');
 return <svg width="850" height="360" viewBox="0 0 850 360">
 <defs><clipPath id={'reveal'+side}><rect width={p*850} height="360"/></clipPath></defs>
 {Array.from({length:6},(_,i)=><line key={i} x1="45" x2="805" y1={40+i*54} y2={40+i*54} stroke="#ffffff" opacity=".11"/>)}
 {Array.from({length:10},(_,i)=><line key={i} x1={45+i*84} x2={45+i*84} y1="40" y2="310" stroke="#ffffff" opacity=".08"/>)}
 <g clipPath={'url(#reveal'+side+')'}><path d={d} fill="none" stroke={isDE?'#D4AF37':'#f3f6fa'} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" style={{filter:'drop-shadow(0 0 8px '+(isDE?'#D4AF37':'#fff')+')'}}/></g>
 </svg>;
};
const Arrow:React.FC<{reverse?:boolean;f:number;start:number;color:string}>=({reverse=false,f,start,color})=>{
 const p=ease(f,start,start+22);
 return <svg width="420" height="125" viewBox="0 0 420 125" style={{transform:reverse?'scaleX(-1)':'none',opacity:p,filter:'drop-shadow(0 0 18px '+color+')'}}>
 <path d={'M15 46 H'+(15+310*p)+' V26 L'+(15+385*p)+' 62 L'+(15+310*p)+' 99 V79 H15Z'} fill={color}/>
 </svg>;
};
export const GermanyUK1992:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const entry=spring({frame:f,fps,config:{damping:19,stiffness:70}});
 const label=ease(f,45,72),graph=ease(f,70,115),arrows=ease(f,145,178),final=ease(f,194,224);
 const push=interpolate(f,[0,100,180,239],[1.05,1.1,1.12,1.17],cl);
 return <AbsoluteFill style={{background:'#080B10',color:'#fff',fontFamily:'Arial,sans-serif',overflow:'hidden'}}>
 <div style={{position:'absolute',left:0,top:0,width:1920,height:850,display:'flex',transform:'scale('+push+')',transformOrigin:'center 45%'}}>
 <div style={{width:960,height:850,position:'relative',overflow:'hidden'}}>
 <Img src={staticFile('archives/berlin-1989.jpg')} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 38%',filter:'sepia(.35) contrast(1.2) brightness(.67)',transform:'scale('+(1.11+f*.0002)+')'}}/>
 <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#080B1099 0%,#080B1005 40%,#080B10 96%)'}}/>
 </div>
 <div style={{width:960,height:850,position:'relative',overflow:'hidden'}}>
 <Img src={staticFile('archives/chelmsford-1990.jpg')} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 44%',filter:'grayscale(1) contrast(1.35) brightness(.63)',transform:'scale('+(1.13+f*.00016)+')'}}/>
 <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#080B1099 0%,#080B1005 40%,#080B10 96%)'}}/>
 </div>
 </div>
 <AbsoluteFill style={{opacity:entry}}>
 <div style={{position:'absolute',top:65,left:0,width:960,textAlign:'center',fontWeight:900,fontSize:77,letterSpacing:5,color:'#D4AF37',textShadow:'0 4px 18px #000'}}>ALLEMAGNE</div>
 <div style={{position:'absolute',top:65,left:960,width:960,textAlign:'center',fontWeight:900,fontSize:77,letterSpacing:4,textShadow:'0 4px 18px #000'}}>ROYAUME-UNI</div>
 <div style={{position:'absolute',top:170,left:270,width:420,padding:16,textAlign:'center',border:'2px solid #D4AF37',fontSize:38,fontWeight:800,color:'#f0ce70',opacity:label}}>TAUX ÉLEVÉS</div>
 <div style={{position:'absolute',top:170,left:1200,width:520,padding:16,textAlign:'center',border:'2px solid #fff',fontSize:36,fontWeight:800,opacity:label}}>ÉCONOMIE FAIBLE</div>
 </AbsoluteFill>
 <div style={{position:'absolute',left:55,top:520,opacity:graph}}><LineChart side="de" f={f}/></div>
 <div style={{position:'absolute',left:1015,top:520,opacity:graph}}><LineChart side="uk" f={f}/></div>
 <div style={{position:'absolute',left:160,top:865,width:660,textAlign:'center',fontSize:28,fontWeight:800,letterSpacing:2,color:'#e8c16b',opacity:graph}}>BESOIN DE STABILITÉ ET DE TAUX ÉLEVÉS</div>
 <div style={{position:'absolute',left:1110,top:865,width:660,textAlign:'center',fontSize:28,fontWeight:800,letterSpacing:2,color:'#f0f0f0',opacity:graph}}>BESOIN DE RELANCE ET DE TAUX BAS</div>
 <div style={{position:'absolute',left:958,top:0,width:4,height:970,background:'#D4AF37',opacity:.55,boxShadow:'0 0 32px 9px #D4AF3760'}}/>
 <div style={{position:'absolute',left:748,top:378,opacity:arrows}}><Arrow f={f} start={145} color="#D4AF37"/></div>
 <div style={{position:'absolute',left:748,top:482,opacity:arrows}}><Arrow reverse f={f} start={153} color="#e4e6eb"/></div>
 <div style={{position:'absolute',top:976,left:0,width:'100%',textAlign:'center',fontWeight:900,fontSize:54,letterSpacing:4,opacity:final,textShadow:'0 0 22px #D4AF3770'}}>BESOINS CONTRADICTOIRES</div>
 <AbsoluteFill style={{pointerEvents:'none',boxShadow:'inset 0 0 160px #000c'}}/>
 </AbsoluteFill>;
};