import React from 'react';
import {Composition} from 'remotion';
import {FatLossMuscleGain} from './scene';
export const Root:React.FC=()=> <Composition id="FatLossMuscleGain" component={FatLossMuscleGain} durationInFrames={120} fps={30} width={1080} height={1920}/>;
