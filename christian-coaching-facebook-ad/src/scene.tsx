import React from 'react';
import {AbsoluteFill,Easing,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
import {copy} from './copy';
const cl={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...cl,easing:Easing.inOut(Easing.cubic)});
const font='Montserrat, Arial Black, Arial, sans-serif';
const yellow='#FFD600';
const Icons:React.FC<{type:number}>=({type})=>{
 const common={fill:'none',stroke:'currentColor',strokeWidth:3,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
 return <svg viewBox="0 0 48 48" width="47" height="47" aria-hidden="true">
 {type===0&&<><circle cx="24" cy="24" r="19" {...common}/><path d="M14 24l7 7 14-16" {...common}/></>}
 {type===1&&<><path d="M11 36c1-18 15-25 27-24-1 13-9 26-27 24Z" {...common}/><path d="M13 35c6-7 13-13 23-20" {...common}/></>}
 {type===2&&<><path d="M6 18v12m6-17v22m6-16v10m12-10v10m6-16v22m6-17v12M18 24h12" {...common}/></>}
 {type===3&&<path d="M24 39 8 23C-2 12 14 3 24 15 34 3 50 12 40 23Z" {...common}/>}
 {type===4&&<><path d="M24 12c-7-5-13-5-19-3v27c7-2 13-1 19 3 6-4 12-5 19-3V9c-6-2-12-2-19 3Zm0 0v27" {...common}/><path d="M10 17h8m-8 7h8m12-7h8m-8 7h8" {...common}/></>}
 </svg>;
};
const Highlight:React.FC<{text:string;index:number}>=({text,index})=>{
 const bits=[['Programme ','100 % personnalisé'],['Nutrition ','adaptée à tes objectifs'],['Exercices ','selon ton niveau'],['Soutien moral ','et motivation'],['Conseils et accompagnement ','à chaque étape']][index];
 return <>{bits[0]}<span style={{color:yellow}}>{bits[1]}</span></>;
};
const Benefit:React.FC<{index:number;frame:number;fps:number}>=({index,frame,fps})=>{
 const start=[30,48,67,91,113][index];
 const progress=spring({frame:frame-start,fps,config:{stiffness:165,damping:17,mass:.7}});
 const alpha=interpolate(frame,[start,start+8],[0,1],cl);
 const pulse=frame>=start?1+Math.sin((frame-start)*.19)*.035:1;
 return <div style={{height:111,display:'flex',alignItems:'center',gap:20,opacity:alpha,transform:`translateX(${(1-progress)*80}px)`,background:'linear-gradient(90deg,#ffffff13,#ffffff05)',border:'1px solid #ffffff23',borderRadius:15,padding:'12px 19px',boxSizing:'border-box'}}>
 <div style={{width:63,height:63,flexShrink:0,display:'grid',placeItems:'center',borderRadius:14,background:'#e92b3b28',color:index===3?'#ff6472':yellow,transform:`scale(${pulse})`}}><Icons type={index}/></div>
 <div style={{fontFamily:font,fontSize:index===4?27:30,fontWeight:850,lineHeight:1.19,color:'#fff',letterSpacing:-.6}}><Highlight text={copy.benefits[index]} index={index}/></div>
 </div>;
};
const Post:React.FC<{frame:number;fps:number}>=({frame,fps})=>{
 const slogan=ease(frame,150,167);
 const cta=ease(frame,194,209);
 const pulse=1+Math.sin((frame-201)*.21)*.025;
 return <div style={{width:914,background:'#fff',borderRadius:26,overflow:'hidden',boxShadow:'0 36px 100px #0008',fontFamily:'Arial,sans-serif'}}>
 <div style={{height:111,display:'flex',alignItems:'center',gap:17,padding:'0 27px'}}>
 <div style={{width:72,height:72,borderRadius:'50%',background:'linear-gradient(145deg,#111821,#ee3445)',display:'grid',placeItems:'center',fontSize:29,fontWeight:900,color:'#fff'}}>CC</div>
 <div><div style={{fontSize:29,fontWeight:800,color:'#14171d'}}>{copy.brand}</div><div style={{fontSize:21,color:'#727985',marginTop:5}}>{copy.sponsored} · 🌐</div></div>
 <div style={{marginLeft:'auto',fontSize:37,color:'#777'}}>···</div></div>
 <div style={{padding:'0 27px 19px',fontSize:23,color:'#2c3035'}}>Un accompagnement conçu pour ton quotidien.</div>
 <div style={{height:1020,position:'relative',background:'radial-gradient(ellipse at 90% 15%,#7b1522,#1b0c14 48%,#090c12 85%)',padding:'25px 30px',boxSizing:'border-box',overflow:'hidden'}}>
 <div style={{position:'absolute',right:-90,top:-120,width:450,height:450,borderRadius:'50%',background:'#ff31401a',filter:'blur(70px)'}}/>
 <div style={{position:'relative',fontFamily:font,fontSize:43,fontWeight:950,letterSpacing:1.3,color:'#fff',textAlign:'center',marginBottom:26}}>COACHING <span style={{color:yellow}}>PERSONNALISÉ</span></div>
 <div style={{position:'relative',display:'flex',flexDirection:'column',gap:14}}>{copy.benefits.map((_,i)=><Benefit key={i} index={i} frame={frame} fps={fps}/>)}</div>
 <div style={{position:'relative',marginTop:27,padding:'19px 18px',borderRadius:15,background:'#05070cd9',border:'1px solid #ffd60065',textAlign:'center',opacity:slogan,transform:`scale(${.9+slogan*.1})`}}>
 <div style={{fontFamily:font,fontWeight:950,fontSize:36,lineHeight:1.22,color:'#fff'}}>UN PROGRAMME <span style={{color:yellow}}>ADAPTÉ À TA VIE</span>,<br/>PAS L’INVERSE.</div>
 </div>
 </div>
 <div style={{height:132,background:'#f1f3f6',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 27px'}}>
 <div style={{maxWidth:485,fontSize:25,color:'#11151b',fontWeight:800,lineHeight:1.22,opacity:cta,transform:`translateY(${(1-cta)*18}px)`}}>{copy.cta}</div>
 <div style={{background:'#e92d3c',borderRadius:9,padding:'20px 19px',color:'#fff',fontSize:21,fontWeight:900,whiteSpace:'nowrap',transform:`scale(${frame>=195?pulse:1})`,boxShadow:frame>=195?'0 0 25px #ed2b3d70':'none'}}>{copy.button}</div>
 </div>
 <div style={{height:76,display:'flex',alignItems:'center',justifyContent:'space-around',fontSize:23,color:'#737985',fontWeight:700}}><span>♡ J’aime</span><span>▢ Commenter</span><span>↗ Partager</span></div>
 </div>;
};
export const ChristianCoachingFacebookAd:React.FC=()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const enter=spring({frame,fps,config:{stiffness:100,damping:20}});
 const zoom=interpolate(frame,[0,30,90,150,239],[.82,.91,.96,.97,1.04],cl);
 const shift=interpolate(frame,[0,30,150,239],[175,0,-15,-65],cl);
 return <AbsoluteFill style={{background:'linear-gradient(155deg,#e9edf3,#cdd4de)',overflow:'hidden'}}>
 <div style={{height:133,background:'#fff',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 47px',color:'#1877f2',fontSize:56,fontFamily:'Arial,sans-serif',fontWeight:900}}>facebook <span style={{color:'#515967',fontSize:36}}>⌕　☰</span></div>
 <div style={{height:84,background:'#fff',display:'flex',alignItems:'center',justifyContent:'space-around',fontSize:36,color:'#687180',borderTop:'1px solid #e8e9ee'}}><span style={{color:'#1877f2'}}>⌂</span><span>▣</span><span>♧</span><span>☰</span></div>
 <div style={{position:'absolute',left:0,right:0,top:250,display:'flex',justifyContent:'center',transform:`translateY(${(1-enter)*250+shift}px) scale(${zoom})`,transformOrigin:'50% 40%'}}>
 <Post frame={frame} fps={fps}/></div>
 <AbsoluteFill style={{pointerEvents:'none',boxShadow:'inset 0 0 130px #0002'}}/>
 </AbsoluteFill>;
};