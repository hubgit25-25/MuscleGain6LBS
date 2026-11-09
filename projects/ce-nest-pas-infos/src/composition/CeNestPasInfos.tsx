import React from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";

const BLACK = "#101010";
const RED = "#F3262E";
const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};

const reveal = (frame: number, start: number, duration = 13) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

const Word: React.FC<{
  children: React.ReactNode;
  start: number;
  size: number;
  color?: string;
  rotate?: number;
  width?: number;
}> = ({children, start, size, color = BLACK, rotate = 0, width = 930}) => {
  const frame = useCurrentFrame();
  const p = reveal(frame, start, 14);
  const x = interpolate(p, [0, 1], [-150, 0]);
  const blur = interpolate(p, [0, 1], [18, 0]);
  const scale = interpolate(p, [0, 1], [1.08, 1]);
  return (
    <div style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      width,
      textAlign: "center",
      color,
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: size,
      fontWeight: 900,
      fontStretch: "condensed",
      letterSpacing: "-0.075em",
      lineHeight: 0.86,
      whiteSpace: "nowrap",
      transform: `translate(-50%, -50%) translateX(${x}px) scale(${scale}) rotate(${rotate}deg)`,
      opacity: p,
      filter: `blur(${blur}px)`,
      textShadow: "0 7px 0 rgba(0,0,0,0.035)",
    }}>{children}</div>
  );
};

const Streak: React.FC<{top: number; start: number; color: string; width: number; delay?: number}> =
  ({top, start, color, width, delay = 0}) => {
    const frame = useCurrentFrame();
    const p = interpolate(frame, [start + delay, start + delay + 18], [0, 1], clamp);
    const x = interpolate(p, [0, 1], [-500, 0]);
    return <div style={{position:"absolute",top,left:"50%",width,height:5,background:color,
      transform:`translateX(calc(-50% + ${x}px)) skewX(-24deg)`,opacity:p*0.75}} />;
  };

export const CeNestPasInfos: React.FC = () => {
  const frame = useCurrentFrame();
  const intro = reveal(frame, 0, 12);
  const pas = reveal(frame, 25, 10);
  const un = reveal(frame, 52, 12);
  const manque = reveal(frame, 83, 16);
  const infos = reveal(frame, 122, 16);
  const pulse = interpolate(frame, [146, 154, 179], [1, 1.025, 1], {
    ...clamp, easing: Easing.inOut(Easing.quad),
  });
  const exit = interpolate(frame, [170, 179], [1, 0.94], clamp);

  return (
    <AbsoluteFill style={{backgroundColor:"#FFFFFF", overflow:"hidden"}}>
      <AbsoluteFill style={{opacity:0.16, backgroundImage:"radial-gradient(#111 1.2px, transparent 1.2px)",backgroundSize:"24px 24px",maskImage:"linear-gradient(90deg, transparent, black 18%, black 82%, transparent)"}} />
      <div style={{position:"absolute",top:170,left:88,fontFamily:"Arial,sans-serif",fontSize:22,fontWeight:800,letterSpacing:"0.24em",color:"#777",opacity:intro}}>IDÉE REÇUE / 01</div>
      <div style={{position:"absolute",top:220,left:90,width:180,height:8,background:RED,transform:`scaleX(${intro})`,transformOrigin:"left"}} />
      <Streak top={485} start={4} color={BLACK} width={650}/>
      <Streak top={720} start={27} color={RED} width={850} delay={3}/>
      <Streak top={1060} start={85} color={RED} width={900}/>
      <Streak top={1430} start={125} color={BLACK} width={760} delay={4}/>

      <div style={{position:"absolute",top:360,left:0,width:"100%",height:230,opacity:intro,transform:`translateY(${interpolate(intro,[0,1],[60,0])}px)`}}>
        <Word start={0} size={188} width={980}>CE N’EST</Word>
      </div>

      <div style={{position:"absolute",top:630,left:"50%",width:430,height:178,background:RED,
        display:"flex",alignItems:"center",justifyContent:"center",
        transform:`translateX(-50%) rotate(-3deg) scale(${pas})`,opacity:pas,
        boxShadow:"16px 18px 0 rgba(243,38,46,0.12)"}}>
        <span style={{fontFamily:'"Helvetica Neue",Helvetica,Arial,sans-serif',fontWeight:900,fontSize:154,
          letterSpacing:"-0.07em",color:"#fff",lineHeight:1}}>PAS</span>
      </div>

      <div style={{position:"absolute",top:850,left:0,width:"100%",height:300,opacity:un,
        transform:`translateY(${interpolate(un,[0,1],[110,0])}px) scale(${interpolate(un,[0,1],[0.88,1])})`}}>
        <Word start={52} size={310} width={990}>UN</Word>
      </div>

      <div style={{position:"absolute",top:1165,left:0,width:"100%",height:230,opacity:manque,
        transform:`translateX(${interpolate(manque,[0,1],[180,0])}px) skewX(${interpolate(manque,[0,1],[-8,0])}deg)`}}>
        <Word start={83} size={190} color={RED} width={1060}>MANQUE</Word>
      </div>

      <div style={{position:"absolute",top:1450,left:0,width:"100%",height:210,opacity:infos,
        transform:`translateX(${interpolate(infos,[0,1],[-180,0])}px)`}}>
        <Word start={122} size={174} width={1000}>D’INFOS</Word>
      </div>

      <div style={{position:"absolute",bottom:185,left:90,right:90,display:"flex",justifyContent:"space-between",
        alignItems:"center",fontFamily:"Arial,sans-serif",fontWeight:800,fontSize:20,letterSpacing:"0.2em",color:"#777",
        opacity:interpolate(frame,[138,154],[0,0.8],clamp)}}>
        <span>APPRENDRE ≠ AGIR</span><span>01 / 01</span>
      </div>

      <AbsoluteFill style={{pointerEvents:"none",opacity:interpolate(frame,[0,8,9,179],[0,0,0.12,0],clamp),backgroundColor:"#fff"}}/>
      <AbsoluteFill style={{pointerEvents:"none",transform:`scale(${pulse * exit})`,border:"1px solid rgba(0,0,0,0.035)"}}/>
    </AbsoluteFill>
  );
};
