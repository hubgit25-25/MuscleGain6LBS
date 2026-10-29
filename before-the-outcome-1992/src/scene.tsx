import React from 'react';
import {AbsoluteFill,Easing,interpolate,useCurrentFrame} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import * as THREE from 'three';
const GOLD='#D4AF37',RED='#FF3B30',BLUE='#77B7E5';
const cl={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const prog=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...cl,easing:Easing.inOut(Easing.cubic)});
const Monitor:React.FC<{x:number;z:number;f:number}>=({x,z,f})=><group position={[x,0,z]}>
 <mesh position={[0,1.6,0]}><boxGeometry args={[4.3,3.1,1.1]}/><meshStandardMaterial color="#444e56" metalness={.65} roughness={.3}/></mesh>
 <mesh position={[0,1.6,.57]}><planeGeometry args={[3.75,2.65]}/><meshBasicMaterial color="#102832"/></mesh>
 <mesh position={[0,-.32,.15]}><boxGeometry args={[.4,1.3,.5]}/><meshStandardMaterial color="#444b52" metalness={.75} roughness={.3}/></mesh>
 <mesh position={[0,-1,.3]}><boxGeometry args={[2.5,.13,1.5]}/><meshStandardMaterial color="#555e67" metalness={.75} roughness={.28}/></mesh>
 {Array.from({length:8},(_,i)=><mesh key={i} position={[-1.6+i*.45,1.2+Math.sin(i*.7+f*.013)*.45,.58]}><boxGeometry args={[.22,.025,.008]}/><meshBasicMaterial color={i%3===0?GOLD:BLUE}/></mesh>)}
 </group>;
const Environment:React.FC<{f:number}>=({f})=>{
 const push=prog(f,0,170);
 return <ThreeCanvas width={1920} height={1080} camera={{position:[1,4.8,18-push*2],fov:46,near:.1,far:100}}>
 <ambientLight intensity={.42}/><directionalLight position={[-5,9,5]} intensity={2.8} color="#9bbbd9"/><pointLight position={[0,4,3]} intensity={110} color="#377bba"/><pointLight position={[8,3,-3]} intensity={75} color={GOLD}/>
 <mesh position={[0,-3.2,-9]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[45,45]}/><meshStandardMaterial color="#131b24" metalness={.55} roughness={.36}/></mesh>
 <mesh position={[0,4,-18]}><boxGeometry args={[42,16,.3]}/><meshStandardMaterial color="#17212b" metalness={.25} roughness={.75}/></mesh>
 <mesh position={[0,-1.8,2]}><boxGeometry args={[19,.28,5.5]}/><meshStandardMaterial color="#272b30" metalness={.7} roughness={.28}/></mesh>
 <Monitor x={0} z={-3} f={f}/><Monitor x={-5.4} z={-4} f={f}/><Monitor x={5.4} z={-4} f={f}/>
 <group position={[0,-1.25,3.1]}>
 <mesh position={[0,.9,0]}><sphereGeometry args={[.76,32,24]}/><meshStandardMaterial color="#1c242b" roughness={.8}/></mesh>
 <mesh position={[0,-.5,0]}><capsuleGeometry args={[1.35,1.9,8,20]}/><meshStandardMaterial color="#171c23" roughness={.85}/></mesh>
 <mesh position={[-1.35,-.6,-.65]} rotation={[.4,0,-.45]}><capsuleGeometry args={[.35,1.4,6,16]}/><meshStandardMaterial color="#20252b"/></mesh>
 <mesh position={[1.35,-.6,-.65]} rotation={[.4,0,.45]}><capsuleGeometry args={[.35,1.4,6,16]}/><meshStandardMaterial color="#20252b"/></mesh>
 </group>
 {Array.from({length:7},(_,i)=><mesh key={i} position={[(i-3)*4,6,-5]}><boxGeometry args={[2.5,.1,.55]}/><meshBasicMaterial color="#768da5"/></mesh>)}
 </ThreeCanvas>;
};
const graph=(kind:number)=>Array.from({length:42},(_,i)=>{const x=18+i*10;const base=kind===0?70+i*3.3:kind===1?205-i*3.3:140+Math.sin(i*.65)*13;return [x,base+Math.sin(i*.55)*6]});
const d=(pts:number[][])=>pts.map(([x,y],i)=>(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)).join(' ');
export const BeforeTheOutcome1992:React.FC=()=>{
 const f=useCurrentFrame(),branch=prog(f,125,185),clock=prog(f,290,332),end=prog(f,425,469);
 const fade=1-prog(f,425,457);
 const branches=[{name:'BAISSE DE LA LIVRE',color:GOLD},{name:'DÉFENSE RÉUSSIE',color:RED},{name:'ATTENTE PROLONGÉE',color:BLUE}];
 return <AbsoluteFill style={{background:'#080B10',color:'#fff',fontFamily:'Arial,Helvetica,sans-serif',overflow:'hidden'}}>
 <Environment f={f}/>
 <AbsoluteFill style={{background:'linear-gradient(90deg,#080B10aa,#080B1022,#080B10aa)'}}/>
 <div style={{position:'absolute',top:58,width:'100%',textAlign:'center',fontSize:54,fontWeight:900,letterSpacing:7,textShadow:'0 7px 24px #000'}}>AVANT DE CONNAÎTRE LE RÉSULTAT</div>
 <div style={{position:'absolute',left:140,top:242,width:1640,height:610,opacity:branch*fade,background:'#080B10ed',border:'3px solid #D4AF37',boxShadow:'0 0 65px #000',transform:'perspective(1500px) rotateX('+(4-4*branch)+'deg)'}}>
 <div style={{padding:'27px 0',textAlign:'center',fontSize:34,fontWeight:800,letterSpacing:4,color:'#d6dbe0'}}>TROIS SCÉNARIOS POSSIBLES</div>
 <div style={{display:'flex',gap:26,padding:'18px 35px'}}>
 {branches.map((b,i)=><div key={b.name} style={{flex:1,border:'1px solid '+b.color+'77',padding:'20px 8px',background:'#111a24'}}>
 <svg viewBox="0 0 450 265" width="100%" height="265"><defs><clipPath id={'reveal'+i}><rect width={440*prog(f,172+i*18,256+i*18)} height="265"/></clipPath></defs>
 {Array.from({length:5},(_,j)=><line key={j} x1="10" x2="440" y1={30+j*50} y2={30+j*50} stroke="#ffffff" opacity=".12"/>)}
 <g clipPath={'url(#reveal'+i+')'}><path d={d(graph(i))} stroke={b.color} strokeWidth="7" fill="none" strokeLinecap="round" style={{filter:'drop-shadow(0 0 8px '+b.color+')'}}/></g></svg>
 <div style={{fontSize:24,textAlign:'center',fontWeight:900,letterSpacing:1,color:b.color}}>{b.name}</div></div>)}
 </div>
 </div>
 <div style={{position:'absolute',right:125,top:800,width:440,opacity:clock*fade,display:'flex',alignItems:'center',gap:25,background:'#0b111be8',padding:20,border:'1px solid #D4AF3777'}}>
 <svg width="128" height="128" viewBox="0 0 128 128"><circle cx="64" cy="64" r="56" fill="#18212c" stroke={GOLD} strokeWidth="6"/>{Array.from({length:12},(_,i)=><line key={i} x1="64" y1="12" x2="64" y2="22" transform={'rotate('+(i*30)+' 64 64)'} stroke="#fff" strokeWidth="3"/>)}
 <line x1="64" y1="64" x2="64" y2="28" stroke="#fff" strokeWidth="6" strokeLinecap="round" transform={'rotate('+(f*.22)+' 64 64)'}/>
 <line x1="64" y1="64" x2="64" y2="18" stroke={RED} strokeWidth="2" transform={'rotate('+(f*1.3)+' 64 64)'}/><circle cx="64" cy="64" r="5" fill={GOLD}/></svg>
 <div><div style={{fontSize:22,fontWeight:900,letterSpacing:1}}>FRAIS DE FINANCEMENT</div><div style={{display:'flex',gap:5,marginTop:16}}>{Array.from({length:10},(_,i)=><div key={i} style={{height:22,width:17,background:i<Math.floor(prog(f,320,425)*10)?GOLD:'#3c4249',boxShadow:i<Math.floor(prog(f,320,425)*10)?'0 0 8px #D4AF37':'none'}}/>)}</div><div style={{fontSize:15,color:'#b6b8bd',marginTop:7}}>INDICATEUR SYMBOLIQUE</div></div>
 </div>
 <div style={{position:'absolute',inset:0,opacity:end,background:'#080B10eb',display:'flex',alignItems:'center',justifyContent:'center'}}>
 <div style={{fontSize:94,fontWeight:900,letterSpacing:4,color:GOLD,textShadow:'0 5px 32px #D4AF3777',transform:'scale('+(.85+.15*end)+')'}}>L'ISSUE RESTE INCERTAINE</div>
 </div>
 <AbsoluteFill style={{pointerEvents:'none',boxShadow:'inset 0 0 140px #000b'}}/>
 </AbsoluteFill>;
};