import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const RED = '#FF3030';
const BLACK = '#050505';
const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

const easeOut = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

const Word: React.FC<{
  children: React.ReactNode;
  start: number;
  duration?: number;
  color?: string;
  size: number;
  rotate?: number;
  tracking?: number;
}> = ({ children, start, duration = 13, color = BLACK, size, rotate = 0, tracking = -0.075 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - start,
    fps,
    config: { damping: 15, stiffness: 190, mass: 0.62 },
    durationInFrames: duration,
  });
  const opacity = easeOut(frame, start, 5);
  const x = interpolate(progress, [0, 1], [-150, 0]);
  const scale = interpolate(progress, [0, 1], [0.88, 1]);
  return (
    <div
      style={{
        color,
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: 700,
        fontSize: size,
        lineHeight: 0.82,
        letterSpacing: `${tracking}em`,
        whiteSpace: 'nowrap',
        opacity,
        transform: `translateX(${x}px) scale(${scale}) rotate(${rotate}deg)`,
        transformOrigin: 'left center',
      }}
    >
      {children}
    </div>
  );
};

export const Chris: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const final = spring({ frame: frame - 145, fps, config: { damping: 18, stiffness: 130 } });
  const flash = interpolate(frame, [29, 32, 36], [0, 0.72, 0], clamp);
  const lineProgress = easeOut(frame, 112, 18);
  const finalScale = interpolate(final, [0, 1], [0.985, 1]);
  const fadeOut = interpolate(frame, [174, 179], [1, 0.96], clamp);

  const streaks = [
    { top: 405, left: -120, width: 650, delay: 5, color: RED, rotate: -8 },
    { top: 1015, left: 620, width: 620, delay: 65, color: BLACK, rotate: -8 },
    { top: 1410, left: -160, width: 700, delay: 104, color: RED, rotate: -8 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', overflow: 'hidden', opacity: fadeOut }}>
      <AbsoluteFill style={{ padding: '230px 76px 190px', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 250, left: 80, width: 210, height: 5, background: BLACK, transform: 'rotate(-7deg)' }} />
        <div style={{ position: 'absolute', top: 310, right: 92, width: 110, height: 5, background: RED, transform: 'rotate(-7deg)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 22, transform: 'rotate(-5deg)', transformOrigin: 'center' }}>
          <Word start={0} size={150} rotate={-1}>CE N’EST</Word>

          <div style={{ marginLeft: 235, background: RED, padding: '17px 34px 23px', transform: `translateX(${interpolate(easeOut(frame, 25, 9), [0, 1], [-80, 0])}px) rotate(1deg)`, opacity: easeOut(frame, 25, 6), boxShadow: '14px 14px 0 rgba(0,0,0,0.08)' }}>
            <div style={{ color: '#FFFFFF', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: 142, lineHeight: 0.82, letterSpacing: '-0.075em' }}>PAS</div>
          </div>

          <div style={{ marginTop: 12 }}>
            <Word start={48} size={255} rotate={-1}>UN</Word>
          </div>
          <div style={{ marginTop: -4 }}>
            <Word start={76} size={170} color={RED} rotate={-1}>MANQUE</Word>
          </div>
          <div style={{ marginTop: 2 }}>
            <Word start={108} size={142} rotate={-1}>D’INFOS</Word>
          </div>
        </div>
      </AbsoluteFill>

      {streaks.map((s, i) => {
        const p = easeOut(frame, s.delay, 12);
        return (
          <div key={i} style={{
            position: 'absolute', top: s.top, left: s.left, width: s.width * p, height: 5,
            background: s.color, transform: `rotate(${s.rotate}deg)`, opacity: 0.9,
          }} />
        );
      })}

      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, background: '#FFFFFF', opacity: flash, pointerEvents: 'none' }} />

      <div style={{
        position: 'absolute', left: 80, right: 80, bottom: 145, height: 3,
        background: RED, transform: `scaleX(${lineProgress})`, transformOrigin: 'left',
      }} />

      <div style={{
        position: 'absolute', right: 82, bottom: 95, color: '#111111', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: 600, fontSize: 22, letterSpacing: '0.16em', opacity: interpolate(frame, [132, 150], [0, 0.65], clamp),
      }}>PENSE. AGIS. PROGRESSE.</div>

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        opacity: interpolate(frame, [145, 158], [0, 1], clamp),
        transform: `scale(${finalScale})`,
      }} />
    </AbsoluteFill>
  );
};
