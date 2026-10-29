import React from 'react';
import {Composition} from 'remotion';
import {CostOfInterestRates} from './scene';
export const Root:React.FC=()=> <Composition id="CostOfInterestRates" component={CostOfInterestRates} durationInFrames={480} fps={60} width={1920} height={1080}/>;
