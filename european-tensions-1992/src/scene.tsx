import React from 'react';
import {AbsoluteFill,Img,interpolate,Easing,staticFile,useCurrentFrame} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import * as THREE from 'three';
import {countries} from './europe-data';
const GOLD='#D4AF37',RED='#FF3B30',BG='#080B10';
const cl={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const p=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...cl,easing:Easing.inOut(Easing.cubic)});
const timeline=[{date:'7 FÉV. 1992',short:'MAASTRICHT',label:'Signature du traité',country:'Pays-Bas',image:'maastricht.jpg',start:0},{date:'2 JUIN 1992',short:'DANEMARK',label:'Rejet par référendum',country:'Danemark',image:'denmark.jpg',start:135},{date:'17 SEPT. 1992',short:'ITALIE',label:'Lire : suspension du MCE',country:'Italie',image:'italy.jpg',start:275},{date:'20 SEPT. 1992',short:'FRANCE',label:'Approbation de justesse',country:'France',image:'france.jpg',start:420}];
const glow=(iso:string,f:number)=>iso==='DNK'?p(f,130,166):iso==='ITA'?p(f,274,311):iso==='FRA'?p(f,414,450):iso==='NLD'?p(f,0,36):0;
const Land:React.FC<{country:{id:string;polygons:number[][][]};f:number}>=({country,f})=>{
 const intensity=glow(country.id,f),color=intensity>.01?(country.id==='DNK'?RED:country.id==='ITA'?'#ef9b35':GOLD):'#283644';
 return <group>{country.polygons.map((poly,i)=>{if(poly.length<3)return null;const shape=new THREE.Shape();poly.forEach(([x,y],j)=>j===0?shape.moveTo(x,y):shape.lineTo(x,y));shape.closePath();return <mesh key={i} position={[0,0,intensity*.1]}><extrudeGeometry args={[shape,{depth:.12+intensity*.2,bevelEnabled:false,steps:1}]}/><meshStandardMaterial color={color} metalness={.72} roughness={.35} emissive={color} emissiveIntensity={intensity*.52}/></mesh>})}</group>;
};
const MapScene:React.FC<{f:number}>=({f})=><ThreeCanvas width={1920} height={1080} orthographic camera={{position:[0,0,35],zoom:52,near:.1,far:100}}>
 <ambientLight intensity={1.25}/><directionalLight position={[-6,10,12]} intensity={3.4} color="#b3d7ff"/><pointLight position={[4,3,10]} intensity={90} color={GOLD}/>
 <group rotation={[-.09,.12,0]} position={[0,-.3,0]}>{countries.map(c=><Land key={c.id} country={c} f={f}/>)}</group>
 </ThreeCanvas>;
const Archive:React.FC<{frame:number;index:number}>=({frame,index})=>{
 const e=timeline[index],start=e.start,alpha=p(frame,start,start+22)*(1-p(frame,start+116,start+139));
 return <div style={{position:'absolute',left:1070,top:230,width:730,height:475,opacity:alpha,transform:'perspective(1300px) rotateY(-8deg) translateY('+((1-alpha)*45)+'px)',background:'#121920',border:'3px solid '+GOLD,boxShadow:'0 25px 70px #000'}}>
 <Img src={staticFile('archive/'+e.image)} style={{width:'100%',height:'100%',objectFit:'cover',filter:'grayscale(.35) contrast(1.12)'}}/>
 <div style={{position:'absolute',inset:0,background:'linear-gradient(transparent 50%,#080B10e8)'}}/>
 <div style={{position:'absolute',bottom:64,left:32,fontSize:40,fontWeight:900,letterSpacing:2}}>{e.short}</div>
 <div style={{position:'absolute',bottom:22,left:32,fontSize:26,fontWeight:600}}>{e.label}</div>
 </div>;
};
export const EuropeanTensions1992:React.FC=()=>{
 const f=useCurrentFrame(),ending=p(f,532,586);
 return <AbsoluteFill style={{background:BG,color:'#fff',fontFamily:'Arial,Helvetica,sans-serif',overflow:'hidden'}}>
 <MapScene f={f}/>
 <AbsoluteFill style={{background:'linear-gradient(90deg,#080B1008 0%,#080B1066 62%,#080B10dd 100%)'}}/>
 <div style={{position:'absolute',top:58,width:'100%',textAlign:'center',fontSize:55,fontWeight:900,letterSpacing:8,textShadow:'0 7px 30px #000'}}>LES TENSIONS EUROPÉENNES</div>
 {timeline.map((_,i)=><Archive key={i} frame={f} index={i}/>)}
 <div style={{position:'absolute',left:100,top:755,width:1720,height:240,background:'#080B10e9',borderTop:'2px solid #D4AF37',boxShadow:'0 -12px 50px #000'}}>
 <div style={{position:'absolute',top:72,left:105,right:105,height:4,background:'#49515c'}}/>
 <div style={{position:'absolute',top:72,left:105,width:1510*p(f,10,530),height:4,background:GOLD,boxShadow:'0 0 15px #D4AF37'}}/>
 {timeline.map((e,i)=>{const x=105+i*503;const active=p(f,e.start,e.start+28);return <div key={e.date} style={{position:'absolute',left:x-98,top:24,width:240,textAlign:'center',opacity:.25+active*.75}}>
 <div style={{fontSize:25,fontWeight:900,color:active>.5?GOLD:'#fff'}}>{e.date}</div>
 <div style={{margin:'18px auto 13px',height:20,width:20,borderRadius:20,background:active>.5?GOLD:'#49515c',boxShadow:active>.5?'0 0 20px #D4AF37':'none'}}/>
 <div style={{fontSize:25,fontWeight:900,letterSpacing:1}}>{e.short}</div>
 <div style={{fontSize:19,marginTop:5,color:'#d3d5d7'}}>{e.label}</div>
 </div>})}
 </div>
 <div style={{position:'absolute',inset:0,opacity:ending,background:'#080B10e8',display:'flex',justifyContent:'center',alignItems:'center'}}>
 <div style={{fontSize:102,fontWeight:900,letterSpacing:5,color:GOLD,textShadow:'0 0 45px #D4AF3777',transform:'scale('+(.8+.2*ending)+')'}}>L'EUROPE SOUS PRESSION</div>
 </div>
 <AbsoluteFill style={{pointerEvents:'none',boxShadow:'inset 0 0 120px #000b'}}/>
 </AbsoluteFill>;
};