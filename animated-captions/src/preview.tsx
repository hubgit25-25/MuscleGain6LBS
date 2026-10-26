import React from 'react';
import {AbsoluteFill,OffthreadVideo,staticFile} from 'remotion';
import {AnimatedCaptions,CaptionWord} from './AnimatedCaptions';
import captions from '../captions.json';
import {media} from './media';

export const CaptionsPreview:React.FC=()=>{
 const words=captions.words as CaptionWord[];
 return <AbsoluteFill style={{background:'radial-gradient(ellipse at center,#252735,#08090d)',overflow:'hidden'}}>
  {media.video&&<OffthreadVideo src={staticFile(media.video)} style={{width:'100%',height:'100%',objectFit:'cover'}}/>}
  <AbsoluteFill style={{background:'linear-gradient(0deg,#0007,transparent 55%)'}}/>
  <AnimatedCaptions words={words} style={{maxWords:3,bottom:340,fontSize:75,animation:'pop'}}/>
 </AbsoluteFill>;
};
