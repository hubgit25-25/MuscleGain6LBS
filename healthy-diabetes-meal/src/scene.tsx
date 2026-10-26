import React from 'react';
import {AbsoluteFill,Img,OffthreadVideo,Easing,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {assets} from './assets';

const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const smooth=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});

const FoodPlate:React.FC=()=> <svg viewBox="0 0 900 900" width="100%" height="100%">
 <defs>
  <radialGradient id="plate"><stop stopColor="#fffef7"/><stop offset=".75" stopColor="#f3f1e8"/><stop offset="1" stopColor="#a5a99d"/></radialGradient>
  <radialGradient id="salad"><stop stopColor="#a8d65d"/><stop offset="1" stopColor="#347e38"/></radialGradient>
 </defs>
 <ellipse cx="455" cy="482" rx="382" ry="362" fill="#16140e" opacity=".3"/>
 <circle cx="450" cy="445" r="365" fill="url(#plate)"/>
 <circle cx="450" cy="445" r="302" fill="#fdfcf5" stroke="#deded5" strokeWidth="9"/>
 <path d="M450 155 L450 730 M160 445 L735 445" stroke="#dad8cd" strokeWidth="5" opacity=".35"/>
 {Array.from({length:22},(_,i)=>{const a=i*2.4,r=35+(i*41)%175;return <g key={i} transform={`translate(${330+Math.cos(a)*r} ${330+Math.sin(a)*r}) rotate(${i*31})`}><ellipse rx="46" ry="23" fill={i%3===0?'#267e3c':i%3===1?'#79b53c':'#4a9b40'}/><path d="M-20 0 L20 0" stroke="#c1df7b" strokeWidth="4"/></g>})}
 {Array.from({length:12},(_,i)=>{const a=i*2.4;return <circle key={i} cx={335+Math.cos(a)*105} cy={335+Math.sin(a)*105} r={i%2?22:16} fill={i%2?'#e13b32':'#ef9d32'} stroke="#f6c36b" strokeWidth="3"/>})}
 <path d="M485 330 Q580 260 690 365 Q720 455 640 510 Q535 540 470 455Z" fill="#d9a66c" stroke="#946441" strokeWidth="12"/>
 <path d="M495 350 Q590 300 669 376 Q688 445 625 481 Q545 499 496 439Z" fill="#edc38c"/>
 {Array.from({length:8},(_,i)=><path key={i} d={`M${505+i*15} ${375+i%3*20} l38 14`} stroke="#9f7547" strokeWidth="5" opacity=".6"/>)}
 {Array.from({length:75},(_,i)=>{const x=235+(i*43)%250,y=535+(i*59)%145;return <ellipse key={i} cx={x} cy={y} rx="12" ry="7" fill={i%4===0?'#bfa16a':'#e1d1a3'} transform={`rotate(${i*29} ${x} ${y})`}/>})}
 {Array.from({length:8},(_,i)=><g key={i}><path d={`M${560+i*12} ${570+i%3*19} q30 -34 48 0 q-12 25 -48 0`} fill={i%2?'#e3aa36':'#f0c44e'}/></g>)}
 </svg>;

const Person:React.FC<{frame:number}>=({frame})=>{
 const lift=smooth(frame,78,122);
 const chew=Math.sin(Math.max(0,frame-112)*.6)*2;
 return <svg viewBox="0 0 850 1050" width="100%" height="100%">
 <defs><linearGradient id="shirt" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#b5c6ad"/><stop offset="1" stopColor="#526e62"/></linearGradient></defs>
 <path d="M130 520 Q400 415 690 530 L790 1050 L70 1050Z" fill="url(#shirt)"/>
 <path d="M345 380 L340 530 Q420 605 505 525 L500 370Z" fill="#c98b69"/>
 <ellipse cx="420" cy="260" rx="172" ry="213" fill="#d5a07c"/>
 <path d="M250 255 Q200 70 386 45 Q615 30 594 264 Q560 214 541 130 Q405 190 263 154Z" fill="#342b27"/>
 <path d="M315 270 Q350 258 379 273 M465 273 Q498 260 528 272" stroke="#49322b" strokeWidth="13" strokeLinecap="round" fill="none"/>
 <path d="M425 292 L406 363 L439 364" stroke="#a26b55" strokeWidth="9" fill="none"/>
 <path d={`M357 ${410+chew} Q418 ${448+chew} 482 ${405+chew}`} stroke="#8a4c43" strokeWidth="10" fill="none" strokeLinecap="round"/>
 <g transform={`translate(${-lift*105} ${-lift*265}) rotate(${lift*-16} 635 800)`}>
 <path d="M700 620 Q800 680 720 880 L610 910" stroke="#cb906d" strokeWidth="105" strokeLinecap="round" fill="none"/>
 <path d="M595 905 L560 845" stroke="#cb906d" strokeWidth="62" strokeLinecap="round"/>
 <path d="M555 845 L490 770" stroke="#d6a07d" strokeWidth="24" strokeLinecap="round"/>
 <path d="M545 850 L495 765" stroke="#d6a07d" strokeWidth="21" strokeLinecap="round"/>
 <path d="M505 760 L480 725" stroke="#bbb9ad" strokeWidth="8"/>
 <ellipse cx="476" cy="716" rx="17" ry="25" fill="#589c4c"/>
 </g>
 </svg>;
};

const Media:React.FC<{kind:'food'|'person';frame:number}>=({kind,frame})=>{
 const video=kind==='food'?assets.foodVideo:assets.personVideo;
 const image=kind==='food'?assets.foodImage:assets.personImage;
 if(video)return <OffthreadVideo muted src={staticFile(video)} style={{width:'100%',height:'100%',objectFit:'cover'}}/>;
 if(image)return <Img src={staticFile(image)} style={{width:'100%',height:'100%',objectFit:'cover'}}/>;
 return kind==='food'?<FoodPlate/>:<Person frame={frame}/>;
};

export const HealthyDiabetesMeal:React.FC=()=>{
 const f=useCurrentFrame();
 const close=smooth(f,0,58);
 const reveal=smooth(f,55,88);
 const eat=smooth(f,92,142);
 const scale=interpolate(close,[0,1],[1.08,1.47]);
 return <AbsoluteFill style={{background:'#231c14',overflow:'hidden'}}>
  <AbsoluteFill style={{background:'linear-gradient(110deg,#ac8e65,#e4cba2 45%,#7a7659)'}}/>
  <AbsoluteFill style={{opacity:1-reveal,transform:`translateY(${close*-75}px) scale(${scale})`,transformOrigin:'49% 57%'}}>
   <div style={{position:'absolute',left:0,top:0,width:1080,height:1920,background:'linear-gradient(140deg,#d2b88c,#a17e57)'}}/>
   <div style={{position:'absolute',left:-50,top:390,width:1180,height:1150,transform:'rotate(-6deg)'}}><Media kind="food" frame={f}/></div>
  </AbsoluteFill>
  <AbsoluteFill style={{opacity:reveal,transform:`scale(${interpolate(eat,[0,1],[1.03,1.13])}) translateY(${eat*30}px)`,transformOrigin:'50% 45%'}}>
   <div style={{position:'absolute',inset:0,background:'linear-gradient(130deg,#f2d9ad,#8c8e76 70%,#403c30)'}}/>
   <div style={{position:'absolute',left:100,top:160,width:880,height:1120}}><Media kind="person" frame={f}/></div>
   <div style={{position:'absolute',left:70,top:1110,width:950,height:830}}><Media kind="food" frame={f}/></div>
  </AbsoluteFill>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 43%,transparent 42%,#2617078a 100%)',pointerEvents:'none'}}/>
 </AbsoluteFill>;
};