import React from 'react';
import {AbsoluteFill,interpolate,spring,useCurrentFrame,useVideoConfig,Easing} from 'remotion';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
const Muscle:React.FC<{cx:number;cy:number;rx:number;ry:number;gain:number;grow:number;angle?:number;light:number}>=({cx,cy,rx,ry,gain,grow,angle=0,light})=><ellipse cx={cx} cy={cy} rx={rx*(1+gain*grow)} ry={ry} transform={'rotate('+angle+' '+cx+' '+cy+')'} fill="#22252d" stroke="#ff3b30" strokeWidth={1.8+light*2.3} opacity={.93} style={{filter:'drop-shadow(0 0 '+(3+light*8)+'px #ff3b30)'}}/>;
const Body:React.FC<{f:number}>=({f})=>{
 const g=ease(f,60,120),act=ease(f,30,60),finish=ease(f,120,150);
 const flex=finish*.09*Math.sin((f-120)*.07);
 const scan=ease(f,120,150);
 const p=(x:number,y:number)=>x+','+y;
 return <svg width="100%" height="100%" viewBox="0 0 600 1100" style={{overflow:'visible'}}>
 <defs><linearGradient id="skin" x1="0" x2="1"><stop stopColor="#14171e"/><stop offset=".5" stopColor="#343742"/><stop offset="1" stopColor="#111319"/></linearGradient><linearGradient id="energy" x1="0" x2="1"><stop stopColor="#ff3b30"/><stop offset="1" stopColor="#ffffff"/></linearGradient></defs>
 <g stroke="#ff3b30" strokeWidth="2.5" fill="url(#skin)" strokeLinejoin="round" style={{filter:'drop-shadow(0 0 '+(7+act*9)+'px #ff3b3070)'}}>
 <ellipse cx="300" cy="113" rx="47" ry="60"/>
 <path d="M280 170 L280 205 Q300 224 320 205 L320 170Z"/>
 <path d={'M280 198 Q'+p(242-24*g,206)+' '+p(226-22*g,245)+' Q'+p(223-25*g,315)+' '+p(257-14*g,374)+' Q'+p(271-11*g,428)+' '+p(245-12*g,503)+' Q'+p(300,527)+' '+p(355+12*g,503)+' Q'+p(329+11*g,428)+' '+p(343+14*g,374)+' Q'+p(377+25*g,315)+' '+p(374+22*g,245)+' Q'+p(358+24*g,206)+' 320 198 Q300 224 280 198Z'}/>
 <path d={'M232 242 Q'+p(196-20*g,254)+' '+p(195-23*g,328)+' Q'+p(184-26*g,387)+' '+p(171-24*g,458)+' L'+p(157-16*g,535)+' Q'+p(169-14*g,550)+' '+p(185-12*g,533)+' L'+p(216-17*g,414)+' Q'+p(240-20*g,324)+' 253 264Z'} transform={'rotate('+(-flex*18)+' 231 243)'}/>
 <path d={'M368 242 Q'+p(404+20*g,254)+' '+p(405+23*g,328)+' Q'+p(416+26*g,387)+' '+p(429+24*g,458)+' L'+p(443+16*g,535)+' Q'+p(431+14*g,550)+' '+p(415+12*g,533)+' L'+p(384+17*g,414)+' Q'+p(360+20*g,324)+' 347 264Z'} transform={'rotate('+(flex*18)+' 369 243)'}/>
 <path d={'M247 496 Q'+p(228-18*g,555)+' '+p(232-25*g,650)+' L'+p(240-24*g,795)+' Q'+p(245-13*g,866)+' '+p(258-13*g,951)+' L270 1002 Q288 1013 296 995 L288 938 Q'+p(290-12*g,845)+' '+p(291-14*g,768)+' L300 591 Q310 675 309 768 Q'+p(310+12*g,845)+' 312 938 L304 995 Q312 1013 330 1002 L342 951 Q'+p(355+13*g,866)+' '+p(360+24*g,795)+' L'+p(368+25*g,650)+' Q'+p(372+18*g,555)+' 353 496 Q300 520 247 496Z'}/>
 </g>
 <g opacity={.12+.88*act}>
 <Muscle cx={225} cy={265} rx={31} ry={35} gain={.45} grow={g} angle={-18} light={act}/>
 <Muscle cx={375} cy={265} rx={31} ry={35} gain={.45} grow={g} angle={18} light={act}/>
 <Muscle cx={202} cy={345} rx={21} ry={64} gain={.6} grow={g} angle={12} light={act}/>
 <Muscle cx={398} cy={345} rx={21} ry={64} gain={.6} grow={g} angle={-12} light={act}/>
 <Muscle cx={300} cy={282} rx={57} ry={35} gain={.28} grow={g} light={act}/>
 <Muscle cx={267} cy={355} rx={20} ry={60} gain={.24} grow={g} light={act}/>
 <Muscle cx={333} cy={355} rx={20} ry={60} gain={.24} grow={g} light={act}/>
 {[0,1,2].map(i=><React.Fragment key={i}><Muscle cx={280} cy={390+i*29} rx={17} ry={11} gain={.25} grow={g} light={act}/><Muscle cx={320} cy={390+i*29} rx={17} ry={11} gain={.25} grow={g} light={act}/></React.Fragment>)}
 <Muscle cx={266} cy={628} rx={30} ry={106} gain={.38} grow={g} angle={-4} light={act}/>
 <Muscle cx={334} cy={628} rx={30} ry={106} gain={.38} grow={g} angle={4} light={act}/>
 <Muscle cx={262} cy={852} rx={20} ry={72} gain={.5} grow={g} light={act}/>
 <Muscle cx={338} cy={852} rx={20} ry={72} gain={.5} grow={g} light={act}/>
 </g>
 <rect x="105" y={1050-scan*1000} width="390" height="8" rx="4" fill="#ffffff" opacity={finish*(1-finish*.5)} style={{filter:'drop-shadow(0 0 22px #ff3b30)'}}/>
 </svg>;
};
export const FemaleMuscleTransformation:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const appear=spring({frame:f,fps,config:{stiffness:80,damping:18}});
 const zoom=interpolate(f,[0,30,120,179],[.92,1,1.02,1.09],clamp);
 const pulse=f>=150?Math.sin((f-150)*.24)*.025:0;
 return <AbsoluteFill style={{background:'#080B10',overflow:'hidden'}}>
 <AbsoluteFill style={{background:'radial-gradient(ellipse at center,#24121a,transparent 67%)'}}/>
 <div style={{position:'absolute',left:100,top:150,width:880,height:1600,transform:'translateY('+((1-appear)*180)+'px) scale('+(zoom+pulse)+')'}}>
 <Body f={f}/>
 </div>
 {Array.from({length:35},(_,i)=>{const x=100+(i*173)%880,y=220+(i*277)%1450,p=ease(f,40+i%24,110+i%24);return <div key={i} style={{position:'absolute',left:x,top:y,width:3+i%4,height:3+i%4,borderRadius:'50%',background:i%3===0?'#fff':'#ff3b30',opacity:p*(1-p)*1.8,transform:'translateY('+(-p*65)+'px)',boxShadow:'0 0 10px #ff3b30'}}/>})}
 <AbsoluteFill style={{pointerEvents:'none',boxShadow:'inset 0 0 180px #000b'}}/>
 </AbsoluteFill>;
};