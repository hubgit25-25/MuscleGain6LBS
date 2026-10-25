import React from 'react';
import {AbsoluteFill,Audio,Easing,Img,interpolate,OffthreadVideo,Sequence,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {assets} from './assets';

const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
const yellow='#ffdb35';
type Person='student'|'coach';

const PersonSVG:React.FC<{who:Person;frame:number}>=({who,frame})=>{
 const coach=who==='coach';
 const turn=coach?interpolate(frame,[76,105],[0,-7],clamp):interpolate(frame,[0,27],[0,11],clamp);
 const nod=coach?Math.sin(Math.max(0,frame-81)*.19)*interpolate(frame,[75,91,115],[0,1,0],clamp)*8:0;
 const shirt=coach?'#11131a':'#8b949f';
 const skin=coach?'#b97857':'#d5a17b';
 return <svg width="100%" height="100%" viewBox="0 0 450 960" style={{overflow:'visible',filter:'drop-shadow(0 25px 28px #000b)'}}>
  <defs><linearGradient id={who+'shirt'} x1="0" y1="0" x2="1" y2="1"><stop stopColor={coach?'#343743':'#c0c5ce'}/><stop offset="1" stopColor={shirt}/></linearGradient></defs>
  <path d="M128 665 L322 665 L340 950 L230 950 L220 760 L207 950 L110 950Z" fill={coach?'#161820':'#333b49'}/>
  <path d="M130 315 Q65 332 54 405 L28 625 Q38 685 83 673 L141 500Z" fill={skin}/>
  <path d="M320 315 Q389 329 398 405 L423 625 Q415 687 366 674 L310 500Z" fill={skin}/>
  <path d="M135 315 Q225 270 315 315 L360 675 Q225 740 90 675Z" fill={`url(#${who}shirt)`} stroke="#05070a" strokeWidth="8"/>
  {coach&&<path d="M167 400 L283 400 M225 400 L225 615" stroke="#535762" strokeWidth="9" opacity=".5"/>}
  <rect x="190" y="258" width="70" height="80" rx="26" fill={skin}/>
  <g transform={`rotate(${turn+nod} 225 208)`}>
   <ellipse cx="225" cy="175" rx="91" ry="115" fill={skin}/>
   <path d="M133 155 Q125 52 225 49 Q331 49 316 165 L295 123 Q245 112 202 85 Q173 135 133 155Z" fill={coach?'#16141a':'#30231d'}/>
   <path d="M167 181 L202 183 M249 183 L283 181" stroke="#33251f" strokeWidth="8" strokeLinecap="round"/>
   <path d="M221 192 L215 235 L233 237" stroke="#925e4b" strokeWidth="5" fill="none"/>
   <path d={coach?'M197 266 Q225 276 251 266':'M196 264 Q225 287 255 261'} stroke="#58382e" strokeWidth="6" fill="none"/>
  </g>
 </svg>;
};

const PersonMedia:React.FC<{who:Person;frame:number}>=({who,frame})=>{
 const video=who==='coach'?assets.coachVideo:assets.studentVideo;
 const photo=who==='coach'?assets.coachImage:assets.studentImage;
 if(video)return <OffthreadVideo src={staticFile(video)} muted style={{width:'100%',height:'100%',objectFit:'cover'}}/>;
 if(photo)return <Img src={staticFile(photo)} style={{width:'100%',height:'100%',objectFit:'cover'}}/>;
 return <PersonSVG who={who} frame={frame}/>;
};

const wordFrames=[30,37,44,51,58,65,72];
const words=['Coach,','comment','je','peux','prendre','du','MUSCLE ?'];
const StudentCaption:React.FC<{frame:number}>=({frame})=><div style={{position:'absolute',bottom:330,left:45,right:45,display:'flex',flexWrap:'wrap',justifyContent:'center',gap:16,zIndex:20}}>
 {words.map((word,i)=>{const appear=spring({frame:frame-wordFrames[i],fps:30,config:{damping:12,stiffness:190}});return <span key={i} style={{display:'inline-block',opacity:interpolate(appear,[0,.5],[0,1],clamp),transform:`scale(${interpolate(appear,[0,1],[.65,1],clamp)})`,fontSize:60,fontWeight:950,letterSpacing:-1,color:i===6?yellow:'#fff',WebkitTextStroke:'2px #101018',textShadow:'0 6px 8px #000,0 0 18px #000',lineHeight:1.2}}>{word}</span>})}
 </div>;

export const GymCoachScene:React.FC=()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const studentFocus=ease(frame,0,30);
 const coachFocus=ease(frame,75,119);
 const impact=spring({frame:frame-120,fps,config:{damping:9,stiffness:260}});
 const cameraScale=frame<75?interpolate(studentFocus,[0,1],[1,1.19]):frame<120?interpolate(coachFocus,[0,1],[1.06,1.36]):interpolate(impact,[0,1],[1.57,1.38],clamp);
 const cameraX=frame<75?interpolate(studentFocus,[0,1],[0,145]):interpolate(coachFocus,[0,1],[0,-210],clamp);
 const shake=frame>=120?Math.sin(frame*3.8)*interpolate(frame,[120,126,138],[19,7,0],clamp):0;
 const blur=frame>=120&&frame<125?interpolate(frame,[120,124],[7,0],clamp):0;
 const hitOpacity=frame>=120?interpolate(frame,[120,124,130],[.55,.16,0],clamp):0;
 return <AbsoluteFill style={{background:'#07090e',color:'white',fontFamily:'Montserrat,Arial,Helvetica,sans-serif',overflow:'hidden'}}>
  <AbsoluteFill style={{transform:`translateX(${cameraX+shake}px) scale(${cameraScale})`,filter:`blur(${blur}px)`,transformOrigin:'50% 52%'}}>
   <AbsoluteFill style={{background:'linear-gradient(110deg,#111d25,#222a31 46%,#0b0f15)',overflow:'hidden'}}>
    {[0,1,2,3].map(i=><div key={i} style={{position:'absolute',left:i*310-70,top:140,width:18,height:1250,background:'#394650',opacity:.55}}/>)}
    <div style={{position:'absolute',top:170,left:90,width:890,height:23,background:'#5a6670',boxShadow:'0 0 35px #d5f0ff77'}}/>
    <div style={{position:'absolute',top:310,left:70,width:940,height:15,background:'#171b20'}}/>
    {[0,1,2].map(i=><div key={i} style={{position:'absolute',top:650,left:90+i*355,width:180,height:390,border:'20px solid #4e555c',borderRadius:30,opacity:.45}}/>)}
    <div style={{position:'absolute',top:1100,left:0,right:0,bottom:0,background:'linear-gradient(#262b31,#07090d)'}}/>
    {[0,1,2,3,4].map(i=><div key={i} style={{position:'absolute',top:1150+i*130,left:0,right:0,height:4,background:'#51545b',opacity:.25}}/>)}
    <div style={{position:'absolute',left:40,top:600,width:1000,height:1100,background:'radial-gradient(ellipse,#ffe0ac18,transparent 65%)'}}/>
    <div style={{position:'absolute',left:40,top:490,width:530,height:1120}}><PersonMedia who="student" frame={frame}/></div>
    <div style={{position:'absolute',left:545,top:380,width:530,height:1230}}><PersonMedia who="coach" frame={frame}/></div>
   </AbsoluteFill>
  </AbsoluteFill>
  <AbsoluteFill style={{background:'linear-gradient(0deg,#000b,transparent 32%,transparent 77%,#0009)',pointerEvents:'none'}}/>
  <div style={{position:'absolute',top:150,left:60,right:60,textAlign:'center',fontSize:29,fontWeight:900,letterSpacing:7,color:yellow,textShadow:'0 3px 15px #000'}}>CONSEIL MUSCULATION</div>
  {frame>=30&&frame<75&&<StudentCaption frame={frame}/>}
  {frame>=75&&frame<120&&<div style={{position:'absolute',bottom:330,left:70,right:70,textAlign:'center',fontSize:60,fontWeight:950,textShadow:'0 7px 16px #000',opacity:ease(frame,80,88)}}>LE COACH ÉCOUTE...</div>}
  {frame>=120&&<div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',zIndex:30,transform:`translateY(-100px) scale(${interpolate(impact,[0,1],[1.7,1],clamp)})`,opacity:interpolate(impact,[0,.45],[0,1],clamp)}}>
   <div style={{textAlign:'center',fontSize:111,fontWeight:950,lineHeight:1.03,WebkitTextStroke:'3px #17130b',textShadow:'0 12px 20px #000,0 0 55px #ffd834'}}>ÉCOUTE<br/><span style={{color:yellow}}>BIEN !</span></div>
  </div>}
  <AbsoluteFill style={{background:'#fff',opacity:hitOpacity,pointerEvents:'none'}}/>
  {assets.studentVoice&&<Sequence from={30}><Audio src={staticFile(assets.studentVoice)} volume={1}/></Sequence>}
  {assets.coachVoice&&<Sequence from={120}><Audio src={staticFile(assets.coachVoice)} volume={1}/></Sequence>}
  {assets.whoosh&&<Sequence from={119}><Audio src={staticFile(assets.whoosh)} volume={.6}/></Sequence>}
  {assets.impact&&<Sequence from={120}><Audio src={staticFile(assets.impact)} volume={.9}/></Sequence>}
 </AbsoluteFill>;
};
