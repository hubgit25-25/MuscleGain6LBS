import React from 'react';
import {AbsoluteFill,Img,Easing,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const smooth=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
const Source:React.FC<{name:string;opacity:number;zoom:number}>=({name,opacity,zoom})=><AbsoluteFill style={{opacity,overflow:'hidden'}}><Img src={staticFile(name)} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',transform:`scale(${zoom})`}}/></AbsoluteFill>;
const Particle:React.FC<{i:number;f:number}>=({i,f})=>{const start=90+(i%5)*2;const t=smooth(f,start,start+22);const angle=i*2.39996;const r=70+(i%6)*28;return <div style={{position:'absolute',left:'50%',top:'50%',width:i%4===0?8:4,height:i%4===0?8:4,borderRadius:'50%',background:i%3===0?'#ff4b55':'#fff',boxShadow:'0 0 12px #ff4b55',opacity:1-t,transform:`translate(${Math.cos(angle)*r*t}px,${Math.sin(angle)*r*t}px)`}}/>;};
export const WomanWeightLoss20LBS:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const transition=smooth(f,30,90);
 const count=Math.round(-20*smooth(f,30,90));
 const countFade=smooth(f,30,41);
 const pop=spring({frame:f-90,fps,config:{stiffness:210,damping:13,mass:.75}});
 const shake=f>=90&&f<105?Math.sin((f-90)*2.6)*(1-(f-90)/15)*8:0;
 const zoom=interpolate(f,[0,30,90,120,149],[1.01,1.035,1.075,1.12,1.16],clamp);
 const glow=smooth(f,90,105);
 return <AbsoluteFill style={{background:'#07090e',overflow:'hidden'}}>
 <div style={{position:'absolute',inset:0,transform:`translateX(${shake}px)`}}>
 <Source name="before.jpg" opacity={1} zoom={zoom}/>
 <Source name="after.jpg" opacity={transition} zoom={zoom}/>
 </div>
 <AbsoluteFill style={{background:'linear-gradient(90deg,transparent 0%,transparent 52%,#080b14aa 100%)',pointerEvents:'none'}}/>
 <div style={{position:'absolute',left:595,top:730,width:465,height:320,display:'flex',alignItems:'center',justifyContent:'center',opacity:countFade,transform:`scale(${f>=90?1+.12*(1-pop):1})`}}>
 <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse,#d52c3c44,transparent 70%)',filter:'blur(16px)',opacity:glow}}/>
 {Array.from({length:30},(_,i)=><Particle key={i} i={i} f={f}/>)}
 <div style={{position:'relative',whiteSpace:'nowrap',fontFamily:'Montserrat,Arial Black,Arial,sans-serif',fontWeight:950,fontSize:112,color:'#fff',letterSpacing:-6,textShadow:`0 0 ${12+glow*24}px #ed3d4bc0,0 8px 24px #000c`}}>{count}<span style={{fontSize:52,letterSpacing:0,marginLeft:13}}>LBS</span></div>
 </div>
 <AbsoluteFill style={{pointerEvents:'none',boxShadow:'inset 0 0 145px #07090eac'}}/>
 </AbsoluteFill>;
};