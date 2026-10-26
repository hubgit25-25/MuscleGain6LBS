import React from 'react';
import {Composition} from 'remotion';
import {CaptionsPreview} from './preview';
export const Root:React.FC=()=> <Composition id="CaptionsPreview" component={CaptionsPreview} fps={30} width={1080} height={1920} durationInFrames={180}/>;
