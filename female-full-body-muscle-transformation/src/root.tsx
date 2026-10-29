import React from 'react';
import {Composition} from 'remotion';
import {FemaleMuscleTransformation} from './scene';
export const Root:React.FC=()=> <Composition id="FemaleMuscleTransformation" component={FemaleMuscleTransformation} durationInFrames={180} fps={30} width={1080} height={1920}/>;
