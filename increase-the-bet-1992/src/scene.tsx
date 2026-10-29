import React from 'react';
import {AbsoluteFill,Img,interpolate,Easing,staticFile,useCurrentFrame} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
const GOLD='#D4AF37',BG='#080B10';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const t=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
const Market:React.FC<{f:number}>=({f})=><ThreeCanvas width={1920} height={1080} camera={{position:[0,5.4,19],fov:44,near:.1,far:120}}>
 <ambientLight intensity={.45}/><directionalLight position={[-7,14,8]} intensity={3.2} color="#a8c8ef"/><pointLight position={[0,6,4]} intensity={110} color="#D4AF37"/><pointLight position={[8,2,-4]} intensity={95} color="#447bcb"/>
 <mesh position={[0,-3.5,-7]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[50,70]}/><meshStandardMaterial color="#1a2028" metalness={.7} roughness={.3}/></mesh>
 <mesh position={[0,8,-21]}><boxGeometry args={[48,14,.4]}/><meshStandardMaterial color="#202833" metalness={.45} roughness={.6}/></mesh>
 {Array.from({length:6},(_,row)=>Array.from({length:8},(_,col)=>{
 const x=(col-3.5)*2.75,z=-row*3.1+2.3,y=-1.3;
 return <group key={row+'-'+col} position={[x,y,z]}>
 <mesh position={[0,-.9,0]}><boxGeometry args={[2.7,.13,1.8]}/><meshStandardMaterial color="#45434a" metalness={.75} roughness={.24}/></mesh>
 <mesh position={[0,.35,-.28]}><boxGeometry args={[2.2,1.5,.3]}/><meshStandardMaterial color="#353c47" metalness={.55} roughness={.24}/></mesh>
 <mesh position={[0,.35,-.095]}><planeGeometry args={[1.93,1.24]}/><meshBasicMaterial color={(row+col)%3===0?'#173f47':'#142b36'}/></mesh>
 {Array.from({length:5},(_,i)=><mesh key={i} position={[-.68+i*.35,.17+Math.sin(i+row+col)*.25,-.087]}><boxGeometry args={[.22,.025,.005]}/><meshBasicMaterial color={i%3===0?'#d4af37':'#72b2b5'}/></mesh>)}
 <mesh position={[0,-.53,-.3]}><boxGeometry args={[.16,.5,.2]}/><meshStandardMaterial color="#5e626a" metalness={.7} roughness={.25}/></mesh>
 </group>}))}
 {Array.from({length:24},(_,i)=><mesh key={'l'+i} position={[(i%8-3.5)*3.2,5.4,-Math.floor(i/8)*7-1]}><boxGeometry args={[2,.11,.5]}/><meshBasicMaterial color="#c7c9b1"/></mesh>)}
 </ThreeCanvas>;
const Portrait:React.FC<{name:string;file:string;alpha:number;side:number;frame:number}>=({name,file,alpha,side,frame})=><div style={{position:'absolute',left:side===0?500:1000,top:185,width:500,height:645,opacity:alpha,transform:'perspective(1500px) rotateY('+(side===0?'-9deg':'9deg')+') translateY('+(1-alpha)*65+'px) scale('+(1+frame*.00015)+')',boxShadow:'0 35px 90px #000',border:'4px solid #D4AF37',background:'#131820',overflow:'hidden'}}>
 <Img src={staticFile('portraits/'+file)} style={{width:'100%',height:'100%',objectFit:'cover',filter:'grayscale(.5) sepia(.25) contrast(1.15)'}}/>
 <div style={{position:'absolute',inset:0,background:'linear-gradient(transparent 50%,#080B10f2)'}}/>
 <div style={{position:'absolute',bottom:45,width:'100%',textAlign:'center',fontSize:35,fontWeight:900,letterSpacing:2,color:'#fff'}}>{name}</div>
 </div>;
export const IncreaseTheBet1992:React.FC=()=>{
 const f=useCurrentFrame(),first=t(f,0,20)*(1-t(f,115,155)),second=t(f,85,125)*(1-t(f,125,162)),room=t(f,122,178);
 const count=t(f,240,406),amount=Math.round(count*10000000000/10000000)*10000000;
 const formatted=new Intl.NumberFormat('fr-FR').format(amount).replace(/\u202f/g,' ').replace(/\u00a0/g,' ');
 return <AbsoluteFill style={{background:BG,color:'#fff',fontFamily:'Arial,Helvetica,sans-serif',overflow:'hidden'}}>
 <Market f={f}/>
 <AbsoluteFill style={{background:'linear-gradient(90deg,#080B10db,#080B1055,#080B10db)',opacity:1-room*.35}}/>
 <AbsoluteFill style={{background:'#080B10',opacity:1-room}}/>
 <Portrait name="STANLEY DRUCKENMILLER" file="druckenmiller.jpg" alpha={first} side={0} frame={f}/>
 <Portrait name="GEORGE SOROS" file="soros.jpg" alpha={second} side={1} frame={f}/>
 <div style={{position:'absolute',top:65,width:'100%',textAlign:'center',fontSize:54,fontWeight:900,letterSpacing:9,textShadow:'0 8px 24px #000'}}>AUGMENTER LE PARI</div>
 <div style={{position:'absolute',left:115,top:305,width:1690,height:410,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',opacity:t(f,193,239),transform:'perspective(1500px) rotateX('+(7-t(f,193,239)*7)+'deg) scale('+(0.8+t(f,193,239)*.2)+')',background:'linear-gradient(120deg,#101820eb,#080B10d8)',border:'3px solid #D4AF37',boxShadow:'0 0 85px #D4AF3740, inset 0 0 80px #D4AF371c'}}>
 <div style={{fontSize:116,fontWeight:900,letterSpacing:-2,color:GOLD,fontVariantNumeric:'tabular-nums',textShadow:'0 6px 0 #59431c,0 13px 0 #2b2114,0 22px 32px #000'}}>≈ {formatted} $</div>
 <div style={{fontSize:42,fontWeight:700,letterSpacing:2,marginTop:24,color:'#fff'}}>Taille estimée de la position</div>
 </div>
 <AbsoluteFill style={{pointerEvents:'none',boxShadow:'inset 0 0 160px #000b'}}/>
 </AbsoluteFill>;
};