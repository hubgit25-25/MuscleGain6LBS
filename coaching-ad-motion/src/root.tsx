import React from 'react';
import {Composition} from 'remotion';
import {CoachingAdMotion} from './scene';
export const Root:React.FC=()=> <Composition id="CoachingAdMotion" component={CoachingAdMotion} width={1080} height={1920} fps={30} durationInFrames={180}/>;
