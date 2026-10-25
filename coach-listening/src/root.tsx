import React from 'react';
import {Composition} from 'remotion';
import {CoachListening} from './scene';
export const Root:React.FC=()=> <Composition id="CoachListening" component={CoachListening} width={1080} height={1920} fps={30} durationInFrames={150}/>;
