import React from 'react';
import {AbsoluteFill,Easing,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
const cl={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const progress=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...cl,easing:Easing.inOut(Easing.cubic)});
export const WeightLoss20LBS:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const intro=spring({frame:f,fps,config:{damping:18,stiffness:90}});
 const active=progress(f,30,60),count=progress(f,60,105),value=Math.round(-20*count);
 const impact=spring({frame:f-105,fps,config:{damping:12,stiffness:210}});
 const shake=f>=105&&f<120?Math.sin((f-105)*2.8)*8*(1-(f-105)/15):0;
 const ring=progress(f,105,140);
 const zoom=interpolate(f,[0,30,90,120,149],[.86,1,1.04,1.11,1.15],cl);
 return <AbsoluteFill style={{background:'#080B10',fontFamily:'Arial,sans-serif',overflow:'hidden'}}>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 72%,#14532d99,transparent 57%)'}}/>
  <div style={{position:'absolute',inset:0,transform:'translateX('+shake+'px) translateY('+((1-intro)*230)+'px) scale('+zoom+')'}}>
   <div style={{position:'absolute',top:1070,left:90,width:900,height:630,perspective:1200}}>
    <div style={{position:'absolute',top:360,left:80,width:740,height:120,borderRadius:'50%',background:'#22c55e',opacity:.28,filter:'blur(80px)'}}/>
    <div style={{position:'absolute',inset:'0 0 100px',borderRadius:75,transform:'rotateX(54deg) rotateZ('+(-8+progress(f,0,40)*7+progress(f,105,149)*5)+'deg)',background:'linear-gradient(130deg,#9fb3bb,#18282e 18%,#06151a 65%,#7b969b)',border:'9px solid #84999d',boxShadow:'0 30px 0 #061014,0 55px 65px #000c,0 0 50px #22c55e66,inset 0 0 50px #dff9ff33'}}>
     <div style={{position:'absolute',inset:22,border:'2px solid #ffffff35',borderRadius:48,background:'linear-gradient(135deg,#ffffff24,transparent 50%,#ffffff18)'}}/>
     <div style={{position:'absolute',top:110,left:270,width:360,height:170,borderRadius:22,background:'#020b0c',border:'5px solid #55797a',boxShadow:'inset 0 0 40px #22c55e55,0 0 '+(active*35)+'px #22c55e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:95,fontWeight:800,color:'#b6ffd0',fontFamily:'monospace',opacity:.25+.75*active,textShadow:'0 0 20px #22c55e'}}>{f<30?'':f<60?String(Math.floor((f-30)*3.7)).padStart(2,'0'):'00.0'}</div>
     <div style={{position:'absolute',top:0,left:-170,width:120,height:'100%',background:'linear-gradient(90deg,transparent,#ffffff60,transparent)',transform:'translateX('+(progress(f,32,62)*1200)+'px) rotate(24deg)',filter:'blur(10px)'}}/>
     {[0,1,2,3].map(i=><div key={i} style={{position:'absolute',width:36,height:36,borderRadius:'50%',background:'#102329',border:'4px solid #9ab4b9',left:i%2?790:55,top:i>1?400:45}}/>)}
    </div>
   </div>
   <div style={{position:'absolute',left:35,top:480,width:1010,height:420,opacity:progress(f,60,76),display:'flex',alignItems:'center',justifyContent:'center',transform:'scale('+(f>=105?1+.15*(1-impact):1)+')'}}>
    <div style={{position:'absolute',width:480,height:480,border:'4px solid #22c55e',borderRadius:'50%',boxShadow:'0 0 30px #22c55e',opacity:1-ring,transform:'scale('+(0.5+ring*1.5)+')'}}/>
    {Array.from({length:45},(_,i)=>{const start=105+i%12,p=progress(f,start,start+30),a=i*2.39996,r=70+i%9*25;return <div key={i} style={{position:'absolute',left:'50%',top:'50%',width:4+i%3,height:4+i%3,borderRadius:'50%',background:i%3===0?'white':'#22c55e',boxShadow:'0 0 12px #22c55e',opacity:1-p,transform:'translate('+Math.cos(a)*r*p+'px,'+Math.sin(a)*r*p+'px)'}}/>})}
    <div style={{fontSize:170,fontWeight:950,letterSpacing:-9,color:'white',whiteSpace:'nowrap',textShadow:'0 0 20px #22c55e,0 0 65px #22c55e99,0 8px 24px #000'}}>{value}<span style={{fontSize:73,letterSpacing:0,marginLeft:20}}>LBS</span></div>
   </div>
   <div style={{position:'absolute',left:540,top:875,height:230,width:3,background:'linear-gradient(#22c55e,transparent)',boxShadow:'0 0 15px #22c55e',opacity:progress(f,105,120)}}/>
  </div>
  <AbsoluteFill style={{boxShadow:'inset 0 0 170px #000a',pointerEvents:'none'}}/>
 </AbsoluteFill>;
};