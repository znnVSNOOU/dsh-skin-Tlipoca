import fs from 'node:fs';
import path from 'node:path';

const ASSETS = 'D:/07_AIbot/dsh/dsh-gal-skin/.dsh-plugin/assets';

const yardSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080' width='1920' height='1080'>
  <defs>
    <linearGradient id='sky' x1='0%' y1='0%' x2='0%' y2='100%'>
      <stop offset='0%' stop-color='#090414'/>
      <stop offset='45%' stop-color='#190c33'/>
      <stop offset='100%' stop-color='#2b1742'/>
    </linearGradient>
    <radialGradient id='moon' cx='78%' cy='24%' r='32%'>
      <stop offset='0%' stop-color='#fef9c3' stop-opacity='1'/>
      <stop offset='25%' stop-color='#fde047' stop-opacity='0.6'/>
      <stop offset='50%' stop-color='#c084fc' stop-opacity='0.25'/>
      <stop offset='100%' stop-color='#190c33' stop-opacity='0'/>
    </radialGradient>
    <linearGradient id='fog' x1='0%' y1='100%' x2='0%' y2='0%'>
      <stop offset='0%' stop-color='#0f071d' stop-opacity='0.96'/>
      <stop offset='50%' stop-color='#3b1d60' stop-opacity='0.45'/>
      <stop offset='100%' stop-color='#0f071d' stop-opacity='0'/>
    </linearGradient>
    <filter id='glow'>
      <feGaussianBlur stdDeviation='10' result='coloredBlur'/>
      <feMerge>
        <feMergeNode in='coloredBlur'/>
        <feMergeNode in='SourceGraphic'/>
      </feMerge>
    </filter>
  </defs>
  <rect width='1920' height='1080' fill='url(#sky)'/>
  <circle cx='1480' cy='250' r='200' fill='url(#moon)' filter='url(#glow)'/>
  <circle cx='1480' cy='250' r='90' fill='#fef08a' opacity='0.9'/>
  
  <!-- 远景哥特城堡尖顶与废墟剪影 -->
  <path d='M0 700 L160 540 L220 600 L360 460 L400 520 L580 400 L720 580 L880 490 L1040 610 L1200 440 L1350 560 L1550 420 L1700 540 L1920 600 L1920 1080 L0 1080 Z' fill='#0d0519' opacity='0.85'/>
  
  <!-- 枯木与死神庭院雕像剪影 -->
  <path d='M120 1080 Q130 840 180 760 Q210 700 160 630 Q220 660 240 730 Q260 860 300 1080 Z' fill='#06020c'/>
  <path d='M1800 1080 Q1780 800 1730 720 Q1700 640 1750 560 Q1690 620 1680 700 Q1660 840 1610 1080 Z' fill='#06020c'/>

  <!-- 庭院暗夜雾气与石阶 -->
  <rect x='0' y='720' width='1920' height='360' fill='url(#fog)'/>
  <polygon points='260,1080 1660,1080 1520,780 400,780' fill='#130a24' opacity='0.9'/>
  <polygon points='320,1080 1600,1080 1480,820 440,820' fill='#1d1033' opacity='0.92'/>
  <polygon points='380,1080 1540,1080 1440,860 480,860' fill='#271545' opacity='0.95'/>
  
  <!-- 漂浮在空中的幽暗灵魂光粒子 -->
  <circle cx='580' cy='620' r='6' fill='#facc15' opacity='0.85' filter='url(#glow)'/>
  <circle cx='820' cy='540' r='4' fill='#c084fc' opacity='0.9' filter='url(#glow)'/>
  <circle cx='1080' cy='680' r='7' fill='#fde047' opacity='0.85' filter='url(#glow)'/>
  <circle cx='1280' cy='580' r='5' fill='#a855f7' opacity='0.8' filter='url(#glow)'/>
  <circle cx='420' cy='760' r='5.5' fill='#fef08a' opacity='0.85' filter='url(#glow)'/>
</svg>`;

const roomSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080' width='1920' height='1080'>
  <defs>
    <linearGradient id='wall' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#130826'/>
      <stop offset='50%' stop-color='#251142'/>
      <stop offset='100%' stop-color='#0f041f'/>
    </linearGradient>
    <radialGradient id='light' cx='50%' cy='50%' r='50%'>
      <stop offset='0%' stop-color='#fde047' stop-opacity='0.9'/>
      <stop offset='35%' stop-color='#a855f7' stop-opacity='0.35'/>
      <stop offset='100%' stop-color='#130826' stop-opacity='0'/>
    </radialGradient>
    <filter id='candleGlow'>
      <feGaussianBlur stdDeviation='14' result='blur'/>
      <feMerge>
        <feMergeNode in='blur'/>
        <feMergeNode in='SourceGraphic'/>
      </feMerge>
    </filter>
  </defs>
  <rect width='1920' height='1080' fill='url(#wall)'/>

  <!-- 哥特拱形彩绘落地窗 -->
  <path d='M660 160 C660 60, 1260 60, 1260 160 L1260 760 L660 760 Z' fill='#090312' stroke='#d97706' stroke-width='6'/>
  <path d='M670 170 C670 80, 1250 80, 1250 170 L1250 750 L670 750 Z' fill='#1b0c33' opacity='0.75'/>
  <line x1='960' y1='90' x2='960' y2='750' stroke='#d97706' stroke-width='4'/>
  <line x1='670' y1='380' x2='1250' y2='380' stroke='#d97706' stroke-width='4'/>

  <!-- 窗外微光月色 -->
  <circle cx='960' cy='300' r='140' fill='#fef08a' opacity='0.22' filter='url(#candleGlow)'/>

  <!-- 左右华丽暗紫天鹅绒帷幔 -->
  <path d='M0 0 C320 220, 220 620, 0 1080 L0 0 Z' fill='#38075f' opacity='0.92'/>
  <path d='M1920 0 C1600 220, 1700 620, 1920 1080 L1920 0 Z' fill='#38075f' opacity='0.92'/>

  <!-- 华丽卧室软榻/靠椅 (特莉波卡打盹小憩的地方) -->
  <rect x='460' y='720' width='1000' height='270' rx='28' fill='#2b0e4f' stroke='#fbbf24' stroke-width='3'/>
  <rect x='500' y='650' width='920' height='170' rx='22' fill='#471a8d'/>
  <ellipse cx='620' cy='730' rx='95' ry='52' fill='#581c87' stroke='#fde047' stroke-width='2'/>
  <ellipse cx='1300' cy='730' rx='95' ry='52' fill='#581c87' stroke='#fde047' stroke-width='2'/>

  <!-- 房间两侧的古典烛台与暖光 -->
  <circle cx='320' cy='520' r='180' fill='url(#light)' filter='url(#candleGlow)'/>
  <rect x='310' y='520' width='20' height='150' rx='4' fill='#d97706'/>
  <circle cx='320' cy='505' r='14' fill='#fef08a'/>

  <circle cx='1600' cy='520' r='180' fill='url(#light)' filter='url(#candleGlow)'/>
  <rect x='1590' y='520' width='20' height='150' rx='4' fill='#d97706'/>
  <circle cx='1600' cy='505' r='14' fill='#fef08a'/>
</svg>`;

fs.writeFileSync(path.join(ASSETS, 'bg_yard.svg'), yardSvg);
fs.writeFileSync(path.join(ASSETS, 'bg_room.svg'), roomSvg);
console.log('Successfully generated bg_yard.svg and bg_room.svg');
