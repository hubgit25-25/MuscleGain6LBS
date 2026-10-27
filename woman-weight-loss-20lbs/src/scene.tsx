import React from 'react';
import {AbsoluteFill,Img,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig,Easing} from 'remotion';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
const Picture:React.FC<{src:string;opacity:number;scale:number}>=({src,opacity,scale})=><AbsoluteFill style={{opacity,overflow:'hidden'}}><Img src={staticFile(src)} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'38% 50%',transform:`scale(${scale})`}}/></AbsoluteFill>;
const Spark:React.FC<{index:number;frame:number}>=({index,frame})=>{
 const start=90+(index%6)*2;const p=ease(frame,start,start+20);
 const angle=index*2.39996;const radius=90+(index%5)*29;
 const x=Math.cos(angle)*radius*p;const y=Math.sin(angle)*radius*p;
 return <div style={{position:'absolute',left:'50%',top:'50%',width:index%3===0?9:5,height:index%3===0?9:5,borderRadius:'50%',background:index%4===0?'#ffd5d9':'#fff',opacity:(1-p)*.85,transform:`translate(${x}px,${y}px)`,boxShadow:'0 0 14px #fff'}}/>;
};
export const WomanWeightLoss20LBS:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const morph=ease(f,45,90);
 const zoom=interpolate(f,[0,45,90,149],[1.01,1.055,1.075,1.13],clamp);
 const countProgress=ease(f,45,89);
 const number=-Math.round(countProgress*20);
 const pop=spring({frame:f-90,fps,config:{stiffness:180,damping:15,mass:.8}});
 const appear=ease(f,43,54);
 const impact=f>=90?1+.085*(1-pop):1;
 return <AbsoluteFill style={{background:'#11141a',overflow:'hidden'}}>
 <Picture src="before.jpg" opacity={1} scale={zoom}/>
 <Picture src="after.jpg" opacity={morph} scale={zoom}/>
 <AbsoluteFill style={{background:'linear-gradient(90deg,transparent 0%,transparent 46%,#080c16a8 100%)'}}/>
 <div style={{position:'absolute',top:670,left:640,width:410,height:420,display:'flex',justifyContent:'center',alignItems:'center',opacity:appear,transform:`scale(${impact})`}}>
 <div style={{position:'absolute',width:360,height:250,background:'radial-gradient(ellipse,#ffffff2b,transparent 69%)',filter:'blur(18px)'}}/>
 {Array.from({length:26},(_,i)=><Spark key={i} index={i} frame={f}/>)}
 <div style={{position:'relative',fontFamily:'Montserrat,Arial Black,Arial,sans-serif',fontWeight:950,fontSize:105,whiteSpace:'nowrap',letterSpacing:-4,color:'#fff',textShadow:'0 0 26px #ffffff80,0 8px 25px #000b'}}>{number} <span style={{fontSize:54,letterSpacing:0}}>LBS</span></div>
 </div>
 <AbsoluteFill style={{pointerEvents:'none',boxShadow:'inset 0 0 140px #080b12a6'}}/>
 </AbsoluteFill>;
};