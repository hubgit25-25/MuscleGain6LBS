import React from 'react';
import {AbsoluteFill,Easing,interpolate,useCurrentFrame} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
const gold='#D4AF37',red='#FF3B30';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const rise=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
const Coin:React.FC<{position:[number,number,number];index:number;frame:number;color:string}>=({position,index,frame,color})=><group position={position} rotation={[Math.PI/2+.16,frame*.013+index*.6,Math.sin(frame*.015+index)*.16]}>
 <mesh><cylinderGeometry args={[.68,.68,.14,64]}/><meshStandardMaterial color={color} metalness={.9} roughness={.16}/></mesh>
 <mesh position={[0,.077,0]} rotation={[-Math.PI/2,0,0]}><torusGeometry args={[.52,.028,12,64]}/><meshStandardMaterial color="#ffe8a3" metalness={.95} roughness={.13}/></mesh>
 <mesh position={[0,-.077,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.52,.028,12,64]}/><meshStandardMaterial color="#ffe8a3" metalness={.95} roughness={.13}/></mesh>
 </group>;
const Stage:React.FC<{f:number;loss:boolean}>=({f,loss})=><ThreeCanvas width={1920} height={1080} orthographic camera={{position:[0,3,16],zoom:65,near:.1,far:100}}>
 <ambientLight intensity={.65}/><directionalLight position={[-6,9,8]} intensity={4} color="#fff3d4"/><pointLight position={[6,3,3]} intensity={85} color={loss?'#ff4433':'#D4AF37'}/><pointLight position={[-6,-3,5]} intensity={60} color="#6688aa"/>
 <mesh position={[0,-6,-2]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[60,60]}/><meshStandardMaterial color="#10151b" metalness={.7} roughness={.25}/></mesh>
 {Array.from({length:16},(_,i)=><Coin key={i} position={[(i%8-3.5)*2.35,Math.sin(f*.025+i)*.45-2.2,Math.floor(i/8)*-1.5-1]} index={i} frame={f} color={loss?'#a93835':gold}/>)}
 {Array.from({length:22},(_,i)=><mesh key={'p'+i} position={[(i%11-5)*2.1,3.5+Math.sin(f*.012+i)*.8,-4-Math.floor(i/11)]}><sphereGeometry args={[.035,8,8]}/><meshBasicMaterial color={loss?'#ff3b30':'#D4AF37'}/></mesh>)}
 </ThreeCanvas>;
const Text:React.FC<{children:React.ReactNode;color?:string;size?:number}>=({children,color='#fff',size=120})=><span style={{fontSize:size,fontWeight:900,letterSpacing:2,color,textShadow:'0 8px 0 #15171a,0 13px 0 #303030,0 25px 35px #000',WebkitTextStroke:'1px #ffffff22'}}>{children}</span>;
export const ProfitFromFallingPound:React.FC=()=>{
 const f=useCurrentFrame(),a=rise(f,5,45),b=rise(f,55,102),c=rise(f,134,191),d=rise(f,208,270),reverse=rise(f,300,345),danger=rise(f,370,425),before=1-rise(f,290,330);
 const points=Array.from({length:55},(_,i)=>[i*18,reverse?420-i*6+Math.sin(i*.25)*15:90+i*6+Math.sin(i*.25)*15]);
 const path=points.map(([x,y],i)=>(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)).join(' ');
 return <AbsoluteFill style={{background:'#080B10',fontFamily:'Arial,Helvetica,sans-serif',color:'#fff',overflow:'hidden'}}>
 <Stage f={f} loss={f>=315}/>
 <AbsoluteFill style={{background:'linear-gradient(90deg,#080B10ad,transparent 50%,#080B10ad)',pointerEvents:'none'}}/>
 <div style={{position:'absolute',top:62,width:'100%',textAlign:'center',fontSize:55,fontWeight:900,letterSpacing:9,textShadow:'0 8px 25px #000'}}>GAGNER À LA BAISSE</div>
 <div style={{position:'absolute',top:144,width:'100%',textAlign:'center',fontSize:25,letterSpacing:5,color:gold,textShadow:'0 3px 12px #000'}}>VENTE À DÉCOUVERT</div>
 <div style={{position:'absolute',left:130,top:285,width:1660,height:475,opacity:before,transform:'perspective(1400px) rotateX(6deg)'}}>
 <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',height:180,opacity:a}}>
 <Text>100 £</Text><span style={{opacity:b}}><Text color={gold} size={100}>→</Text></span><span style={{opacity:b}}><Text color={gold}>300 DEM</Text></span>
 </div>
 <div style={{marginTop:25,textAlign:'center',opacity:c,transform:'translateY('+((1-c)*40)+'px)'}}><Text size={79}>300 DEM → 250 DEM</Text></div>
 <div style={{marginTop:28,textAlign:'center',opacity:d,transform:'scale('+(.75+d*.25)+')'}}><Text color={gold} size={146}>+50 DEM</Text></div>
 </div>
 <div style={{position:'absolute',inset:0,opacity:reverse,background:'radial-gradient(ellipse at 50% 50%,#450e14aa,transparent 65%)'}}/>
 <svg width="1170" height="550" style={{position:'absolute',left:380,top:255,opacity:reverse,filter:'drop-shadow(0 0 14px #FF3B30)'}}>
 <defs><clipPath id="clipUp"><rect width={1020*rise(f,320,425)} height="550"/></clipPath></defs>
 <g clipPath="url(#clipUp)"><path d={path} stroke={red} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" fill="none"/></g>
 </svg>
 <div style={{position:'absolute',top:770,width:'100%',textAlign:'center',opacity:danger,transform:'perspective(900px) rotateX('+(10-danger*10)+'deg)'}}><Text color={red} size={104}>PERTE POSSIBLE</Text></div>
 <div style={{position:'absolute',right:52,bottom:42,padding:'16px 30px',border:'2px solid #D4AF37',background:'#080B10e8',fontSize:30,fontWeight:900,letterSpacing:3,color:'#fff'}}>EXEMPLE FICTIF</div>
 </AbsoluteFill>;
};