import React from "react";
import {Composition} from "remotion";
import {CeNestPasInfos} from "./composition/CeNestPasInfos";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="CeNestPasInfos"
    component={CeNestPasInfos}
    durationInFrames={180}
    fps={30}
    width={1080}
    height={1920}
  />
);
