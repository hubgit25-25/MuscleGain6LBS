import React from 'react';
import {Composition} from 'remotion';
import {WomanMuscleGrowth} from './scene';
export const Root:React.FC=()=> <Composition id="WomanMuscleGrowth" component={WomanMuscleGrowth} width={1080} height={1920} fps={30} durationInFrames={150}/>;
