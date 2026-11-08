import React from 'react';
import {Composition} from 'remotion';
import {MuscleGain6LBS} from './scene';
import {BillionDollarPosition} from './billion-dollar-position';
import {Chris} from './chris';

export const Root:React.FC=()=> <>
  <Composition id="MuscleGain6LBS" component={MuscleGain6LBS} durationInFrames={180} fps={30} width={1080} height={1920}/>
  <Composition id="BillionDollarPosition" component={BillionDollarPosition} durationInFrames={300} fps={30} width={1920} height={1080}/>
  <Composition id="chris" component={Chris} durationInFrames={180} fps={30} width={1080} height={1920}/>
</>;
