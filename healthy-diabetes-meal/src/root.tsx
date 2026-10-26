import React from 'react';
import {Composition} from 'remotion';
import {HealthyDiabetesMeal} from './scene';
export const Root:React.FC=()=> <Composition id="HealthyDiabetesMeal" component={HealthyDiabetesMeal} width={1080} height={1920} fps={30} durationInFrames={150}/>;
