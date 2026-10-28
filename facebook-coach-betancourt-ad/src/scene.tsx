import React from 'react';
import {AbsoluteFill,Img,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig,Easing} from 'remotion';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const smooth=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
const Logo:React.FC=()=> <div style={{height:88,width:88,borderRadius:'50%',overflow:'hidden',border:'3px solid #16A34A',background:'#07180d',flexShrink:0}}><Img src={staticFile('assets/coach-betancourt-logo.png')} style={{width:'100%',height:'100%',objectFit:'contain'}}/></div>;
const Message:React.FC<{part:1|2;frame:number}>=({part,frame})=>{
 const lines=part===1?['PAS BESOIN','D’ÊTRE AU GYM','TOUS LES JOURS']:['ON N’AVAIT PAS BESOIN','D’ACHETER','PLEIN DE CHOSES'];
 return <div style={{display:'flex',flexDirection:'column',gap:16,justifyContent:'center',height:310}}>
 {lines.map((line,i)=><div key={line} style={{fontSize:part===2&&i===0?31:40,fontWeight:950,lineHeight:1.12,letterSpacing:-1,color:(part===1&&i===0)||(part===2&&i===2)?'#DCFCE7':'white',opacity:smooth(frame,i*6,i*6+10),transform:`translateY(${(1-smooth(frame,i*6,i*6+12))*28}px)`}}>{line}</div>)}
 </div>;
};
export const FacebookCoachBetancourtAd:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const appear=spring({frame:f,fps,config:{damping:17,stiffness:100}});
 const zoom=interpolate(f,[0,30,65,110,130,179],[.89,1,1.2,1.26,1,1.035],clamp);
 const tilt=interpolate(f,[0,30,100,130,179],[-5,0,1,0,0],clamp);
 const part=f<75?1:2;
 const pulse=1+(f>120?.025*Math.sin((f-120)*.25):0);
 return <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 35%,#176b3a,#14532D 55%,#061d11)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Montserrat,Arial,sans-serif'}}>
 <div style={{width:820,height:1470,borderRadius:72,padding:23,background:'#101919',boxShadow:'0 60px 100px #0009,0 0 75px #36a76633',transform:`translateY(${(1-appear)*380}px) perspective(1200px) rotateY(${tilt}deg) scale(${zoom})`,overflow:'hidden'}}>
 <div style={{height:'100%',background:'#f3f4f6',borderRadius:52,overflow:'hidden'}}>
 <div style={{height:90,background:'white',padding:'25px 34px',color:'#1877f2',fontWeight:900,fontSize:38}}>facebook</div>
 <div style={{margin:'25px 18px',borderRadius:28,background:'white',overflow:'hidden',boxShadow:'0 10px 35px #0002'}}>
 <div style={{display:'flex',alignItems:'center',gap:20,padding:24}}>
 <Logo/><div><div style={{fontSize:29,fontWeight:850,color:'#111827'}}>Coach Betancourt</div><div style={{fontSize:25,fontWeight:850,color:'#111827'}}>Naturopathe</div><div style={{fontSize:20,color:'#68747e'}}>Sponsorisé · 🌐</div></div></div>
 <div style={{padding:'5px 28px 26px',fontSize:22,lineHeight:1.35,color:'#111827'}}>Pas besoin d’être au gym tous les jours, on n’avait pas besoin d’acheter plein de choses.</div>
 <div style={{margin:'0 15px',height:770,borderRadius:24,background:'linear-gradient(135deg,#14532D,#16A34A)',padding:'60px 45px',boxSizing:'border-box',boxShadow:'inset 0 0 100px #062b1855'}}>
 <div style={{fontSize:24,fontWeight:800,letterSpacing:3,color:'#DCFCE7'}}>COACHING PERSONNALISÉ</div>
 <div style={{height:8,width:110,background:'#DCFCE7',borderRadius:9,marginTop:30}}/>
 <div style={{marginTop:110}}><Message part={part} frame={part===1?f-30:f-75}/></div>
 <div style={{fontSize:21,color:'#DCFCE7',marginTop:95}}>BIEN-ÊTRE  ·  NUTRITION  ·  SOUTIEN</div>
 </div>
 <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'30px 26px'}}>
 <div><div style={{fontSize:21,color:'#111827',fontWeight:850}}>Coach Betancourt Naturopathe</div><div style={{fontSize:18,color:'#6b7280'}}>Accompagnement personnalisé</div></div>
 <div style={{transform:`scale(${pulse})`,borderRadius:13,padding:'22px 26px',background:'#16A34A',fontSize:22,fontWeight:850,color:'white'}}>En savoir plus</div>
 </div>
 <div style={{borderTop:'1px solid #e5e7eb',padding:'25px 38px',color:'#6b7280',fontSize:20}}>♡ J’aime　　　 ▢ Commenter　　　 ↗ Partager</div>
 </div></div></div></AbsoluteFill>;
};