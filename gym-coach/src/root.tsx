import React from 'react';
import {Composition} from 'remotion';
import {GymCoachScene} from './scene';
export const Root: React.FC = () => <Composition id="GymCoachScene" component={GymCoachScene} width={1080} height={1920} fps={30} durationInFrames={150}/>;
