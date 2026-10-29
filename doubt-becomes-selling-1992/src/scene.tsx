import React from 'react';
import {AbsoluteFill,Easing,interpolate,useCurrentFrame} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
const BG='#080B10',RED='#FF3B30',GREEN='#29C58B',GOLD='#D4AF37';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const progress=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.inOut(Easing.cubic)});
const candles=Array.from({length:27},(_,i)=>{
 const baseline=4.7-i*.27+Math.sin(i*.76)*.36;
 const up=[1,2,5,7,10,13,17,20,23].includes(i);
 const open=baseline+(up?-.26:.25),close=baseline+(up?.28:-.31);
 return {open,close,hi:Math.max(open,close)+.15+(i%3)*.07,lo:Math.min(open,close)-.15-(i%4)*.04,up};
});
const Chart3D:React.FC<{f:number}>=({f})=><ThreeCanvas width={1920} height={1080} orthographic camera={{position:[1,8,24],zoom:53,near:.1,far:100}}>
 <ambientLight intensity={1.4}/><directionalLight position={[-8,10,10]} intensity={3.4} color="#b4d5ff"/><pointLight position={[6,5,9]} intensity={95} color={RED}/>
 <group position={[-1,-.8,0]} rotation={[-.09,-.08,0]}>
 <mesh position={[0,0,-.65]}><boxGeometry args={[25,13,.3]}/><meshStandardMaterial color="#101924" metalness={.5} roughness={.34}/></mesh>
 {Array.from({length:7},(_,i)=><mesh key={'h'+i} position={[0,-5.3+i*1.7,-.42]}><boxGeometry args={[24,.017,.025]}/><meshBasicMaterial color="#536273" transparent opacity={.42}/></mesh>)}
 {Array.from({length:14},(_,i)=><mesh key={'v'+i} position={[-11.6+i*1.8,0,-.42]}><boxGeometry args={[.016,11,.025]}/><meshBasicMaterial color="#536273" transparent opacity={.3}/></mesh>)}
 {candles.map((c,i)=>{const show=progress(f,220+i*7,235+i*7),x=-11.3+i*.86;
 const y=(c.open+c.close)/2-.9,h=Math.max(.04,Math.abs(c.open-c.close))*show;
 const wick=(c.hi-c.lo)*show;
 return <group key={i} position={[x,0,.18]}>
 <mesh position={[0,(c.hi+c.lo)/2-.9,0]}><boxGeometry args={[.055,Math.max(.01,wick),.06]}/><meshStandardMaterial color={c.up?GREEN:RED} emissive={c.up?GREEN:RED} emissiveIntensity={.25}/></mesh>
 <mesh position={[0,y,0]}><boxGeometry args={[.54,h,.4]}/><meshStandardMaterial color={c.up?GREEN:RED} metalness={.3} roughness={.35} emissive={c.up?GREEN:RED} emissiveIntensity={.2}/></mesh>
 </group>})}
 </group>
 </ThreeCanvas>;
const Desk3D:React.FC<{f:number}>=({f})=><ThreeCanvas width={1920} height={1080} camera={{position:[1.5,5,16],fov:48,near:.1,far:100}}>
 <ambientLight intensity={.65}/><directionalLight position={[-5,9,6]} intensity={2.4} color="#b4c9e5"/><pointLight position={[3,3,3]} intensity={100} color={GOLD}/>
 <mesh position={[0,-2.2,-2]}><boxGeometry args={[20,.45,9]}/><meshStandardMaterial color="#36271e" metalness={.15} roughness={.63}/></mesh>
 <group position={[-5,-.5,0]} rotation={[0,-.18,0]}>
 <mesh><boxGeometry args={[5,.25,3.3]}/><meshStandardMaterial color="#333a41" metalness={.5}/></mesh>
 {Array.from({length:6},(_,r)=>Array.from({length:12},(_,c)=><mesh key={r+'-'+c} position={[-2.25+c*.4,.18,-1.2+r*.42]}><boxGeometry args={[.31,.12,.26]}/><meshStandardMaterial color="#a3a6a7" metalness={.55} roughness={.4}/></mesh>))}
 <mesh position={[0,.5,-1.75]}><boxGeometry args={[5.2,.9,.25]}/><meshStandardMaterial color="#2e343b" metalness={.5}/></mesh>
 <mesh position={[0,1.25,-1.9]}><boxGeometry args={[4.6,1.2,.08]}/><meshStandardMaterial color="#d6c8a8" roughness={.8}/></mesh>
 </group>
 <group position={[5,-.5,1]}>
 <mesh><boxGeometry args={[3.8,.6,2.2]}/><meshStandardMaterial color="#1b232b" metalness={.4}/></mesh>
 <mesh position={[-1.1,.42,-.3]} rotation={[0,0,-.12]}><boxGeometry args={[1.3,.35,.65]}/><meshStandardMaterial color="#303840"/></mesh>
 <mesh position={[.6,.45,-.3]}><boxGeometry args={[1.5,.25,.5]}/><meshStandardMaterial color="#303840"/></mesh>
 {Array.from({length:12},(_,i)=><mesh key={i} position={[-1.4+(i%6)*.53,.36,.48+Math.floor(i/6)*.44]}><boxGeometry args={[.31,.08,.24]}/><meshStandardMaterial color="#64717a"/></mesh>)}
 </group>
 {Array.from({length:3},(_,i)=><group key={i} position={[-.3+i*.34,-.7,1.8+i*.23]} rotation={[0,-.1+i*.07,-.06+i*.04]}>
 <mesh><boxGeometry args={[3.2,.045,2.15]}/><meshStandardMaterial color="#e4d9bd" roughness={.9}/></mesh>
 {Array.from({length:8},(_,j)=><mesh key={j} position={[0,.027,-.8+j*.19]}><boxGeometry args={[2.6,.005,.028]}/><meshBasicMaterial color="#4a4b48"/></mesh>)}
 </group>)}
 </ThreeCanvas>;
export const DoubtBecomesSelling1992:React.FC=()=>{
 const f=useCurrentFrame(),toChart=progress(f,218,248),ending=progress(f,548,592);
 const headers=['TENSIONS MONÉTAIRES EN EUROPE','LA LIVRE SOUS PRESSION'];
 return <AbsoluteFill style={{background:BG,color:'#fff',fontFamily:'Arial,Helvetica,sans-serif',overflow:'hidden'}}>
 <AbsoluteFill style={{opacity:1-toChart}}><Desk3D f={f}/></AbsoluteFill>
 <AbsoluteFill style={{opacity:toChart}}><Chart3D f={f}/></AbsoluteFill>
 <AbsoluteFill style={{background:'linear-gradient(90deg,#080B1066,transparent,#080B1066)'}}/>
 <div style={{position:'absolute',top:65,width:'100%',textAlign:'center',fontSize:55,fontWeight:900,letterSpacing:6,textShadow:'0 5px 26px #000'}}>LE DOUTE DEVIENT UNE VENTE</div>
 {headers.map((h,i)=><div key={h} style={{position:'absolute',top:255+i*180,left:180+i*110,width:1150,background:'#e6d6b9',color:'#24201b',padding:'28px 35px',fontFamily:'Georgia,serif',fontSize:51,fontWeight:800,letterSpacing:1,transform:'rotate('+(-3+i*4)+'deg) translateY('+((1-progress(f,80+i*50,110+i*50))*100)+'px)',opacity:progress(f,80+i*50,110+i*50)*(1-progress(f,192,236)),boxShadow:'0 20px 55px #000'}}>
 {h}<div style={{fontFamily:'Arial',fontSize:17,fontWeight:500,marginTop:10}}>TITRE ÉDITORIAL · PAS UNE UNE DE PRESSE</div></div>)}
 <div style={{position:'absolute',top:192,right:145,background:'#111924e9',border:'2px solid #FF3B30',padding:'15px 30px',fontSize:34,fontWeight:900,letterSpacing:4,opacity:progress(f,300,330)*(1-ending)}}>GBP · PRESSION VENDEUSE</div>
 {Array.from({length:12},(_,i)=>{const appear=progress(f,320+i*16,340+i*16);return <div key={i} style={{position:'absolute',left:320+i*113,top:270+(i%4)*95,opacity:appear*(1-ending),transform:'translateY('+((1-appear)*-45)+'px)',color:RED,textShadow:'0 0 20px #FF3B30',fontWeight:900,fontSize:27,textAlign:'center'}}>VENTE<div style={{fontSize:60,lineHeight:1}}>↓</div></div>})}
 <div style={{position:'absolute',bottom:45,left:85,fontSize:20,letterSpacing:2,color:'#aab3c0',opacity:1-ending}}>RECONSTITUTION VISUELLE · CHANDELIERS ILLUSTRATIFS · AUCUNE DONNÉE DE MARCHÉ HISTORIQUE</div>
 <AbsoluteFill style={{background:'#080B10ee',opacity:ending,display:'flex',alignItems:'center',justifyContent:'center'}}>
 <div style={{fontSize:100,fontWeight:900,letterSpacing:4,color:RED,textShadow:'0 0 50px #FF3B3066',transform:'scale('+(.85+.15*ending)+')'}}>LE DOUTE DEVIENT UNE VENTE</div></AbsoluteFill>
 <AbsoluteFill style={{pointerEvents:'none',boxShadow:'inset 0 0 130px #000b'}}/>
 </AbsoluteFill>;
};