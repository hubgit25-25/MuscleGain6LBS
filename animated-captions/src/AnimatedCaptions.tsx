import React from 'react';
import {interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';

export type CaptionWord={
 text:string;
 start:number; // actual seconds from audio timeline
 end:number;
 emphasis?:'yellow'|'red'|'none';
 outline?:'yellow'|'red';
};
export type CaptionStyle={
 primaryColor?:string; yellowColor?:string; redColor?:string;
 fontSize?:number; bottom?:number; maxWords?:number;
 animation?:'pop'|'fade'|'subtle';
 fontFamily?:string;
};
type Props={words:CaptionWord[];style?:CaptionStyle};

const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};

/** Groups adjacent timestamped words into captions of at most maxWords.
 * Never fabricates timestamps. Overlapping timings are supported.
 */
export const AnimatedCaptions:React.FC<Props>=({words,style={}})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const now=frame/fps;
 const maxWords=Math.min(4,Math.max(2,Math.floor(style.maxWords??3)));
 const sorted=[...words].filter(w=>Number.isFinite(w.start)&&Number.isFinite(w.end)&&w.end>w.start).sort((a,b)=>a.start-b.start);
 const groups:CaptionWord[][]=[];
 for(let i=0;i<sorted.length;i+=maxWords)groups.push(sorted.slice(i,i+maxWords));
 const active=groups.find(g=>now>=g[0].start&&now<g[g.length-1].end);
 if(!active)return null;
 const white=style.primaryColor??'#FFFFFF';
 const yellow=style.yellowColor??'#FFD600';
 const red=style.redColor??'#FF3B30';
 return <div style={{position:'absolute',bottom:style.bottom??365,left:55,right:55,display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap',gap:15,zIndex:30,pointerEvents:'none'}}>
 {active.map((word,i)=>{
  const startFrame=word.start*fps;
  const elapsed=frame-startFrame;
  const visible=elapsed>=0;
  const pop=spring({frame:elapsed,fps,config:{stiffness:260,damping:15,mass:.55}});
  const fade=interpolate(elapsed,[0,5],[0,1],clamp);
  const scale=style.animation==='fade'?1:style.animation==='subtle'?interpolate(pop,[0,1],[.95,1],clamp):interpolate(pop,[0,1],[.85,1],clamp);
  const color=word.emphasis==='yellow'?yellow:word.emphasis==='red'?red:white;
  const outline=word.outline?(word.outline==='yellow'?yellow:red):undefined;
  return <span key={i} style={{
    opacity:visible?fade:0,transform:`scale(${scale*(word.emphasis&&word.emphasis!=='none'?1.035:1)})`,
    fontFamily:style.fontFamily??'Montserrat, Arial Black, Arial, sans-serif',
    fontSize:style.fontSize??72,fontWeight:900,lineHeight:1.17,
    letterSpacing:-1.2,color,textAlign:'center',
    textShadow:'0 5px 12px #000e, 0 2px 3px #000',
    border:outline?`4px solid ${outline}`:undefined,
    borderRadius:outline?12:undefined,padding:outline?'4px 10px':undefined,
    display:'inline-block',whiteSpace:'nowrap'
  }}>{word.text}</span>;
 })}
 </div>;
};
