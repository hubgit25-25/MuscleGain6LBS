import React from 'react';
import {Composition} from 'remotion';
import {EnergyBoostMotion} from './scene';
export const Root:React.FC=()=> <Composition id="EnergyBoostMotion" component={EnergyBoostMotion} durationInFrames={150} fps={30} width={1080} height={1920}/>;
