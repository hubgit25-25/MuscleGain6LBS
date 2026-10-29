import React from 'react';
import * as THREE from 'three';
import {ThreeCanvas} from '@remotion/three';
import {AbsoluteFill,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const smooth=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],clamp);
const Biceps:React.FC=()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const growth=smooth(frame,30,90);const flex=spring({frame:frame-90,fps,config:{damping:17,stiffness:90}});
 const volume=1+growth*.32+Math.max(0,flex)*.055;
 const breathe=1+.012*Math.sin(frame*.16);
 const muscle=new THREE.MeshPhysicalMaterial({color:'#a9293c',roughness:.36,metalness:.07,clearcoat:.33,clearcoatRoughness:.22});
 const fiberMat=new THREE.MeshStandardMaterial({color:'#f28b91',roughness:.43,emissive:'#5b0918',emissiveIntensity:.13+growth*.18});
 const tendonMat=new THREE.MeshStandardMaterial({color:'#e9a4a0',roughness:.62});
 const points=(side:number,offset:number)=>Array.from({length:32},(_,i)=>{const t=i/31;const y=-.85+t*2.05;const bulge=Math.pow(Math.sin(Math.PI*t),.8);const x=side*(.16+bulge*.47*volume)+Math.sin(t*Math.PI*2+offset)*.018;const z=.22+Math.cos(t*Math.PI*2+offset)*.055;return new THREE.Vector3(x,y,z)});
 const orbit=smooth(frame,90,120);
 return <group rotation={[.03, -.17+orbit*.22, -.17]} position={[0,-.1,0]}>
  <mesh position={[0,-1.25,0]} rotation={[0,0,.05]} material={new THREE.MeshStandardMaterial({color:'#5d1724',roughness:.56})}><cylinderGeometry args={[.28,.21,2.25,36,1]}/></mesh>
  <mesh position={[0,1.35,0]} rotation={[0,0,-.08]} material={new THREE.MeshStandardMaterial({color:'#7b1d2d',roughness:.52})}><capsuleGeometry args={[.31,.8,12,32]}/></mesh>
  <group scale={[volume*breathe,1,volume*breathe]}>
   <mesh position={[0,.13,.09]} material={muscle}><capsuleGeometry args={[.44,1.38,28,48]}/></mesh>
   <mesh position={[-.21,.10,.31]} rotation={[0,0,-.10]} material={muscle}><capsuleGeometry args={[.28,1.15,20,32]}/></mesh>
   <mesh position={[.19,.14,.30]} rotation={[0,0,.08]} material={muscle}><capsuleGeometry args={[.28,1.12,20,32]}/></mesh>
  </group>
  {Array.from({length:44},(_,i)=>{
   const side=i%2===0?1:-1;const offset=(i%11)*.19;const curve=new THREE.CatmullRomCurve3(points(side,offset).map(p=>new THREE.Vector3(p.x+(i%11-5)*.015,p.y,p.z+(i%11-5)*.015)));
   return <mesh key={i} geometry={new THREE.TubeGeometry(curve,42,.009+growth*.006,6,false)} material={fiberMat}/>;
  })}
  <mesh position={[0,-.99,.07]} material={tendonMat}><capsuleGeometry args={[.12,.5,12,24]}/></mesh>
  <mesh position={[0,1.22,.08]} material={tendonMat}><capsuleGeometry args={[.15,.42,12,24]}/></mesh>
 </group>;
};
export const FemaleMuscleGrowth:React.FC=()=>{
 const f=useCurrentFrame();const zoom=interpolate(f,[0,30,90,120,149],[5.6,5.1,4.9,4.7,4.55],clamp);
 return <AbsoluteFill style={{background:'#080B10'}}>
 <ThreeCanvas width={1080} height={1920} camera={{fov:35,position:[0,0,zoom],near:.1,far:100}}>
  <ambientLight intensity={.55}/>
  <directionalLight position={[-3,4,5]} intensity={2.4} color="#ffe1de"/>
  <pointLight position={[3,1,3]} intensity={2.2} color="#ff334d"/>
  <pointLight position={[-2,-2,-1]} intensity={1.4} color="#ac1835"/>
  <Biceps/>
 </ThreeCanvas>
 <AbsoluteFill style={{pointerEvents:'none',boxShadow:'inset 0 0 210px #000c'}}/>
 </AbsoluteFill>;
};