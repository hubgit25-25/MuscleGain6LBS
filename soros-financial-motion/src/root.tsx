import React from 'react';
import {Composition} from 'remotion';
import {SorosFinancialMotion} from './scene';
export const Root:React.FC=()=> <Composition id="SorosFinancialMotion" component={SorosFinancialMotion} width={1920} height={1080} fps={30} durationInFrames={240}/>;
