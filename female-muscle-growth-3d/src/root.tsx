import React from 'react';
import {Composition} from 'remotion';
import {FemaleMuscleGrowth} from './scene';
export const Root:React.FC=()=> <Composition id="FemaleMuscleGrowth" component={FemaleMuscleGrowth} durationInFrames={150} fps={30} width={1080} height={1920}/>;
