import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Composition,
  Sequence,
  calculateMetadata,
  getAudioDurationInSeconds,
  interpolate,
  registerRoot,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/SpaceGrotesk';

const {fontFamily} = loadFont('normal', {weights: ['400', '500', '600', '700']});

const BG = '#050505';
const IVORY = '#F2F0E9';
const GOLD = '#C6A15B';
const MUTED = 'rgba(242,240,233,0.40)';
const FPS = 60;
const DEFAULT_DURATION = 12;
const AUDIO_SRC: string | null = null; // Ajouter public/audio/sequence-01.mp3 puis renseigner "audio/sequence-01.mp3".
const MUSIC_SRC: string | null = null; // Ajouter public/audio/ambience.mp3 puis renseigner "audio/ambience.mp3".

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const Titre: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 96, color = IVORY, style}) => (
  <div style={{fontFamily, fontSize: size, fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.045em', color, ...style}}>{children}</div>
);

const Etiquette: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{fontFamily, fontSize: 22, fontWeight: 600, letterSpacing: '0.16em', color: GOLD, ...style}}>{children}</div>
);

const Chiffre: React.FC<{value: number; suffix?: string; size?: number}> = ({value, suffix = ' Md$', size = 160}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const n = interpolate(frame, [0, 75], [0, value], clamp);
  const entrance = spring({frame: Math.max(0, frame - 5), fps, config: {damping: 200}});
  return <div style={{fontFamily, fontSize: size, fontWeight: 700, lineHeight: 1, color: GOLD, letterSpacing: '-0.055em', transform: `scale(${0.88 + entrance * 0.12})`, textShadow: '0 0 42px rgba(198,161,91,.18)'}}>≈ {Math.round(n)}{suffix}</div>;
};

const Pictogramme: React.FC<{type: 'shield' | 'down'; size: number}> = ({type, size}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-label={type === 'shield' ? 'Bouclier' : 'Flèche descendante'}>
    {type === 'shield' ? (
      <path d="M50 8 L83 20 V45 C83 67 68 83 50 93 C32 83 17 67 17 45 V20 Z" stroke={GOLD} strokeWidth="5" fill="rgba(198,161,91,.08)"/>
    ) : (
      <path d="M50 10 V78 M24 53 L50 80 L76 53" stroke={GOLD} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    )}
  </svg>
);

const Couloir: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const portrait = height > width;
  const line = interpolate(frame, [0, 34], [1000, 0], clamp);
  const left = spring({frame: Math.max(0, frame - 34), fps: FPS, config: {damping: 200}});
  const right = spring({frame: Math.max(0, frame - 42), fps: FPS, config: {damping: 200}});
  const titleSize = portrait ? 42 : 54;
  const iconSize = portrait ? 92 : 112;
  const colStyle: React.CSSProperties = {position: 'absolute', top: portrait ? '27%' : '31%', width: '42%', height: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: portrait ? 30 : 36};
  return (
    <AbsoluteFill style={{background: BG, color: IVORY}}>
      <Etiquette style={{position: 'absolute', top: '10%', left: 0, right: 0, textAlign: 'center'}}>01 / LES DEUX CAMPS</Etiquette>
      <svg style={{position: 'absolute', left: '50%', top: '18%', height: '66%', width: 4, overflow: 'visible'}} viewBox="0 0 4 1000" preserveAspectRatio="none">
        <path d="M2 0 V1000" stroke={GOLD} strokeWidth="3" strokeDasharray="1000" strokeDashoffset={line}/>
      </svg>
      <div style={{...colStyle, left: '4%', transform: `translateX(${(1-left)*-150}px)`}}>
        <Pictogramme type="shield" size={iconSize}/>
        <Titre size={titleSize} color={IVORY} style={{textAlign: 'center'}}>DÉFENDRE<br/>LA LIVRE</Titre>
      </div>
      <div style={{...colStyle, right: '4%', transform: `translateX(${(1-right)*150}px)`}}>
        <Pictogramme type="down" size={iconSize}/>
        <Titre size={titleSize} color={GOLD} style={{textAlign: 'center'}}>PARIER<br/>CONTRE</Titre>
      </div>
      <Etiquette style={{position: 'absolute', bottom: '8%', left: 0, right: 0, textAlign: 'center', color: MUTED}}>SCHÉMA EXPLICATIF</Etiquette>
    </AbsoluteFill>
  );
};

const Position: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const portrait = height > width;
  const grow = interpolate(frame, [0, 70], [0.08, 1], clamp);
  const fade = interpolate(frame, [0, 15], [0, 1], clamp);
  const blockWidth = portrait ? '78%' : '64%';
  return (
    <AbsoluteFill style={{background: BG, justifyContent: 'center', alignItems: 'center', color: IVORY}}>
      <Etiquette style={{position: 'absolute', top: '13%'}}>02 / LA POSITION</Etiquette>
      <div style={{width: blockWidth, height: portrait ? '48%' : '42%', border: `1px solid rgba(198,161,91,${0.25 + grow*.65})`, background: 'linear-gradient(135deg, rgba(198,161,91,.13), rgba(198,161,91,.015))', transform: `scale(${grow})`, opacity: fade, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 30, boxShadow: '0 0 90px rgba(198,161,91,.08)'}}>
        <Chiffre value={10} size={portrait ? 105 : 160}/>
        <div style={{fontFamily, fontSize: portrait ? 30 : 38, color: IVORY, textAlign: 'center', padding: '0 24px'}}>position vendeuse sur la livre</div>
      </div>
      <Etiquette style={{position: 'absolute', bottom: '8%', color: MUTED}}>POSITION ATTRIBUÉE AU FONDS · SCHÉMA EXPLICATIF</Etiquette>
    </AbsoluteFill>
  );
};

const Horloge: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const portrait = height > width;
  const fill = interpolate(frame, [12, 48], [0, 1], clamp);
  const dateOpacity = interpolate(frame, [30, 48], [0, 1], clamp);
  const announcedOpacity = interpolate(frame, [70, 88], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: BG, alignItems: 'center', justifyContent: 'center', gap: portrait ? 45 : 34}}>
      <Etiquette>03 / LE JOUR DÉCISIF</Etiquette>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, width: portrait ? '76%' : '43%', padding: 18, border: '1px solid rgba(198,161,91,.32)', background: '#0C0B09'}}>
        {Array.from({length: 21}, (_, i) => {
          const selected = i === 15;
          return <div key={i} style={{height: portrait ? 42 : 54, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily, fontSize: portrait ? 16 : 20, color: selected ? BG : MUTED, background: selected ? GOLD : 'rgba(242,240,233,.035)', border: selected ? '1px solid '+GOLD : '1px solid transparent', opacity: selected ? fill : 1, boxShadow: selected ? '0 0 24px rgba(198,161,91,.28)' : 'none'}}>{i+1}</div>;
        })}
      </div>
      <div style={{opacity: dateOpacity, textAlign: 'center'}}>
        <Titre size={portrait ? 48 : 76} color={GOLD}>16 SEPTEMBRE 1992</Titre>
      </div>
      <div style={{opacity: announcedOpacity, fontFamily, fontSize: portrait ? 29 : 38, color: IVORY, fontWeight: 600, textAlign: 'center', padding: '0 8%'}}>15 % annoncé pour le lendemain</div>
    </AbsoluteFill>
  );
};

const Balance: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const portrait = height > width;
  const gain = interpolate(frame, [0, 20], [0, 1], clamp);
  const question = interpolate(frame, [35, 58], [0, 1], clamp);
  const questionOut = interpolate(frame, [82, 84], [1, 0], clamp);
  const gainOpacity = gain * (1 - question);
  const silence = frame >= 84;
  return (
    <AbsoluteFill style={{background: BG, justifyContent: 'center', alignItems: 'center'}}>
      {!silence && <div style={{position: 'absolute', fontFamily, fontSize: portrait ? 360 : 500, color: 'rgba(198,161,91,.15)', fontWeight: 700, lineHeight: 1}}>?</div>}
      <div style={{position: 'relative', textAlign: 'center', opacity: gainOpacity, transform: `translateY(${(1-gain)*24}px)`, padding: '0 8%'}}>
        <Etiquette>04 / LE GAIN ESTIMÉ</Etiquette>
        <Titre size={portrait ? 54 : 78} color={GOLD} style={{marginTop: 28}}>≈ 1 Md$</Titre>
        <div style={{fontFamily, fontSize: portrait ? 25 : 32, color: IVORY, marginTop: 12}}>Gain estimé du fonds</div>
      </div>
      <div style={{position: 'absolute', textAlign: 'center', padding: '0 8%', opacity: question * questionOut}}>
        <Titre size={portrait ? 52 : 76} color={IVORY}>Pourquoi la défense<br/>a-t-elle échoué ?</Titre>
      </div>
    </AbsoluteFill>
  );
};

const Fleche: React.FC<{down?: boolean}> = ({down = true}) => <Pictogramme type={down ? 'down' : 'shield'} size={64}/>;
const Frise: React.FC = () => <div style={{height: 2, width: '100%', background: GOLD}}/>;
const Carte: React.FC<{label: string}> = ({label}) => <div style={{border: '1px solid '+GOLD, padding: 20, color: IVORY, fontFamily}}>{label}</div>;

const MainVideo: React.FC = () => {
  const {width, height} = useVideoConfig();
  const isShort = height > width;
  const durations = [252, 180, 144, 144];
  return (
    <AbsoluteFill style={{background: BG, color: IVORY, fontFamily, overflow: 'hidden'}}>
      <Sequence from={0} durationInFrames={durations[0]}><Couloir/></Sequence>
      <Sequence from={durations[0]} durationInFrames={durations[1]}><Position/></Sequence>
      <Sequence from={durations[0]+durations[1]} durationInFrames={durations[2]}><Horloge/></Sequence>
      <Sequence from={durations[0]+durations[1]+durations[2]} durationInFrames={durations[3]}><Balance/></Sequence>
      {AUDIO_SRC ? <Audio src={staticFile(AUDIO_SRC)} volume={(f) => interpolate(f, [0, 12, 708, 720], [0, 1, 1, 0], clamp)}/> : null}
      {MUSIC_SRC ? <Audio src={staticFile(MUSIC_SRC)} volume={(f) => 0.08 * interpolate(f, [0, 24, 696, 720], [0, 1, 1, 0], clamp)}/> : null}
      <div style={{position: 'absolute', left: '8%', right: '8%', bottom: '3%', height: 2, background: 'rgba(198,161,91,.18)'}}>
        <div style={{height: '100%', width: '100%', background: GOLD, transformOrigin: 'left', transform: `scaleX(${interpolate(useCurrentFrame(), [0, 720], [0, 1], clamp)})`}}/>
      </div>
    </AbsoluteFill>
  );
};

const metadata = async ({props}: {props: Record<string, unknown>}) => {
  const durationInSeconds = AUDIO_SRC ? await getAudioDurationInSeconds(staticFile(AUDIO_SRC)) : DEFAULT_DURATION;
  return {durationInFrames: Math.round(durationInSeconds * FPS), props};
};

const Root: React.FC = () => (
  <>
    <Composition id="GovernmentVsBet01" component={MainVideo} durationInFrames={DEFAULT_DURATION*FPS} fps={FPS} width={1920} height={1080} calculateMetadata={metadata}/>
    <Composition id="GovernmentVsBet01Short" component={MainVideo} durationInFrames={DEFAULT_DURATION*FPS} fps={FPS} width={1080} height={1920} calculateMetadata={metadata}/>
  </>
);

registerRoot(Root);
