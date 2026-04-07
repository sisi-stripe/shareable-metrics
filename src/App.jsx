import React, { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

// MRR data growing from ~$300 in Jan 2025 to ~$2,433 in Dec 2025
const mrrData = [
  { date: 'Jan 1, 2025', value: 310 },
  { date: 'Feb 1, 2025', value: 380 },
  { date: 'Mar 1, 2025', value: 470 },
  { date: 'Apr 1, 2025', value: 560 },
  { date: 'May 1, 2025', value: 680 },
  { date: 'Jun 1, 2025', value: 820 },
  { date: 'Jul 1, 2025', value: 1020 },
  { date: 'Aug 1, 2025', value: 1280 },
  { date: 'Sep 1, 2025', value: 1490 },
  { date: 'Oct 1, 2025', value: 1650 },
  { date: 'Nov 1, 2025', value: 1980 },
  { date: 'Dec 1, 2025', value: 2433.60 },
]

const quarterlyTicks = ['Jan 1, 2025', 'Apr 1, 2025', 'Jul 1, 2025', 'Oct 1, 2025']

function formatYAxis(value) {
  if (value === 0) return '$0'
  if (value >= 1000) return `$${value / 1000}K`
  return `$${value}`
}

function formatTooltip(value) {
  return [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'MRR']
}

// Wave options — Stripe brand wave images as backgrounds
const WALLPAPERS = [
  {
    id: 'wave1',
    thumb: '/assets/waves/STRIPE_BRAND-STUDIO_WAVE-01_STILL_ALPHA.png',
    bg: '#ffffff',
    blobs: [
      { color: 'rgba(245,200,0,0.85)',   darkColor: 'rgba(180,80,255,0.90)',  top: '-8%',  left: '-5%',  size: 640, anim: 'floatA', dur: '14s' },
      { color: 'rgba(112,32,210,0.80)',  darkColor: 'rgba(60,20,200,0.95)',   bottom: '-6%', right: '-4%', size: 580, anim: 'floatD', dur: '18s' },
      { color: 'rgba(240,180,140,0.70)', darkColor: 'rgba(80,40,220,0.85)',   top: '25%',  left: '30%',  size: 500, anim: 'floatB', dur: '22s' },
    ],
  },
  {
    id: 'wave2',
    thumb: '/assets/waves/STRIPE_BRAND-STUDIO_WAVE-02_STILL_ALPHA.png',
    bg: '#ffffff',
    blobs: [
      { color: 'rgba(240,48,144,0.85)',  darkColor: 'rgba(160,20,220,0.92)',  top: '-5%',  right: '-6%', size: 620, anim: 'floatB', dur: '16s' },
      { color: 'rgba(245,112,32,0.82)',  darkColor: 'rgba(40,20,180,0.90)',   bottom: '-8%', left: '-3%', size: 560, anim: 'floatE', dur: '20s' },
      { color: 'rgba(245,165,32,0.75)',  darkColor: 'rgba(80,60,240,0.85)',   top: '40%',  left: '20%',  size: 460, anim: 'floatC', dur: '13s' },
    ],
  },
  {
    id: 'wave3',
    thumb: '/assets/waves/STRIPE_BRAND-STUDIO_WAVE-03_STILL_ALPHA.png',
    bg: '#ffffff',
    blobs: [
      { color: 'rgba(245,160,32,0.85)',  darkColor: 'rgba(200,20,160,0.90)',  top: '10%',  left: '-8%',  size: 600, anim: 'floatC', dur: '17s' },
      { color: 'rgba(232,48,152,0.82)',  darkColor: 'rgba(60,20,200,0.92)',   bottom: '-5%', right: '-5%', size: 600, anim: 'floatA', dur: '21s' },
      { color: 'rgba(128,48,210,0.75)',  darkColor: 'rgba(120,20,240,0.88)',  top: '-4%',  right: '15%', size: 480, anim: 'floatD', dur: '15s' },
    ],
  },
  {
    id: 'wave4',
    thumb: '/assets/waves/STRIPE_BRAND-STUDIO_WAVE-04_STILL_ALPHA.png',
    bg: '#ffffff',
    blobs: [
      { color: 'rgba(245,200,0,0.85)',   darkColor: 'rgba(220,30,120,0.90)',  top: '-6%',  left: '20%',  size: 560, anim: 'floatE', dur: '19s' },
      { color: 'rgba(216,32,144,0.82)',  darkColor: 'rgba(60,20,200,0.92)',   top: '20%',  right: '-6%', size: 620, anim: 'floatB', dur: '14s' },
      { color: 'rgba(208,64,32,0.75)',   darkColor: 'rgba(140,20,220,0.85)',  bottom: '-8%', left: '-4%', size: 520, anim: 'floatA', dur: '23s' },
    ],
  },
  {
    id: 'wave5',
    thumb: '/assets/waves/STRIPE_BRAND-STUDIO_WAVE-05_STILL_ALPHA.png',
    bg: '#ffffff',
    blobs: [
      { color: 'rgba(240,128,32,0.85)',  darkColor: 'rgba(40,60,220,0.92)',   bottom: '-5%', left: '10%', size: 640, anim: 'floatD', dur: '16s' },
      { color: 'rgba(216,32,160,0.82)',  darkColor: 'rgba(160,20,240,0.90)',  top: '-7%',  right: '-5%', size: 540, anim: 'floatC', dur: '20s' },
      { color: 'rgba(144,64,192,0.75)',  darkColor: 'rgba(60,20,180,0.88)',   top: '35%',  left: '-5%',  size: 480, anim: 'floatE', dur: '12s' },
    ],
  },
  {
    id: 'wave6',
    thumb: '/assets/waves/STRIPE_BRAND-STUDIO_WAVE-06_STILL_ALPHA.png',
    bg: '#ffffff',
    blobs: [
      { color: 'rgba(245,197,32,0.88)',  darkColor: 'rgba(100,20,220,0.92)',  top: '-6%',  left: '-4%',  size: 640, anim: 'floatA', dur: '13s' },
      { color: 'rgba(217,120,48,0.85)',  darkColor: 'rgba(40,20,200,0.90)',   bottom: '-7%', right: '-5%', size: 580, anim: 'floatE', dur: '17s' },
      { color: 'rgba(232,72,144,0.80)',  darkColor: 'rgba(160,20,240,0.88)',  top: '18%',  right: '8%',  size: 520, anim: 'floatC', dur: '21s' },
    ],
  },
]

// SVG icons
function IconLink() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#1a1f2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#1a1f2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconImage() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#1a1f2e" strokeWidth="2"/>
      <circle cx="8.5" cy="8.5" r="1.5" stroke="#1a1f2e" strokeWidth="1.5"/>
      <path d="M21 15l-5-5L5 21" stroke="#1a1f2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconEmoji() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#1a1f2e" strokeWidth="2"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#1a1f2e" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="9" cy="10" r="1" fill="#1a1f2e"/>
      <circle cx="15" cy="10" r="1" fill="#1a1f2e"/>
    </svg>
  )
}

function IconMore() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5v14M5 12h14" stroke="#1a1f2e" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

// The metric chart card — used both in dashboard and as preview
function MetricCard({ compact = false }) {
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 8,
      padding: compact ? '20px 18px 16px' : '28px 24px 24px',
      boxShadow: compact
        ? '0px 8px 16px rgba(0,0,0,0.06), 0px 32px 64px rgba(0,0,0,0.10)'
        : '0 2px 16px rgba(0,0,0,0.06)',
      width: compact ? 380 : undefined,
      flex: compact ? undefined : 1,
      minWidth: compact ? undefined : 0,
    }}>
      <div style={{ marginBottom: compact ? 6 : 8 }}>
        <div style={{
          fontSize: compact ? 11 : 13,
          color: '#6b7280',
          fontWeight: 500,
          letterSpacing: '0.02em',
          marginBottom: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          MRR
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#9ca3af" strokeWidth="1.5"/>
            <path d="M8 7v5M8 5v1" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <div style={{
            fontSize: compact ? 24 : 32,
            fontWeight: 700,
            color: '#1a1f2e',
            letterSpacing: '-0.5px',
            lineHeight: 1.2,
          }}>$2,433.60</div>
          <div style={{ fontSize: compact ? 12 : 14, color: '#6b7280', fontWeight: 500 }}>0%</div>
        </div>
        <div style={{ fontSize: compact ? 11 : 12, color: '#9ca3af', marginTop: 2 }}>
          $2,433.60 previous period
        </div>
      </div>
      <div style={{ height: compact ? 200 : 320, marginTop: compact ? 4 : 8 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mrrData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
            <CartesianGrid horizontal vertical={false} stroke="#e8eaed" strokeWidth={1} />
            <XAxis
              dataKey="date"
              ticks={quarterlyTicks}
              tick={{ fill: '#8c93a3', fontSize: compact ? 10 : 12, fontFamily: 'Inter, sans-serif' }}
              axisLine={{ stroke: '#e8eaed' }}
              tickLine={false}
              dy={8}
            />
            <YAxis
              orientation="right"
              tickFormatter={formatYAxis}
              ticks={[0, 500, 1000, 1500, 2000]}
              tick={{ fill: '#8c93a3', fontSize: compact ? 10 : 12, fontFamily: 'Inter, sans-serif' }}
              axisLine={false}
              tickLine={false}
              dx={8}
              width={compact ? 40 : 50}
            />
            <Tooltip
              formatter={formatTooltip}
              labelStyle={{ color: '#1a1f2e', fontWeight: 600 }}
              contentStyle={{
                background: '#fff',
                border: '1px solid #e8eaed',
                borderRadius: 8,
                fontSize: 13,
                fontFamily: 'Inter, sans-serif',
              }}
              cursor={{ stroke: '#a78bfa', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#8b5cf6', strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// Dashboard view — the "before share" state
function DashboardView({ onShare }) {
  return (
    <div style={dashStyles.page}>
      <div style={dashStyles.bgBlob1} />
      <div style={dashStyles.bgBlob2} />

      <div style={dashStyles.topBar}>
        <div style={dashStyles.topBarLeft}>
          <img src="/assets/Stripe wordmark - Slate - Small.png" alt="Stripe" style={{ width: 56, height: 'auto' }} />
        </div>
        <div style={dashStyles.topBarRight}>
          <span style={dashStyles.dashLabel}>Dashboard</span>
        </div>
      </div>

      <div style={dashStyles.content}>
        {/* Left card: business info */}
        <div style={dashStyles.profileCard}>
          <div style={dashStyles.profileHeader}>
            <div style={dashStyles.avatarWrapper}>
              <img
                src="https://logo.clearbit.com/roiquant.com"
                alt="roiquant"
                style={dashStyles.avatarImg}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentNode.querySelector('.fallback').style.display = 'flex'
                }}
              />
              <div className="fallback" style={{ ...dashStyles.avatarFallback, display: 'none' }}>r</div>
            </div>
            <span style={dashStyles.businessName}>roiquant</span>
          </div>
          <div style={dashStyles.handle}>@roiquant</div>
        </div>

        {/* Right card: MRR chart */}
        <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
          <MetricCard />
          <button style={dashStyles.shareBtn} onClick={onShare}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>
  )
}

// Share configuration view
function ShareConfigView({ onBack }) {
  const [selectedWp, setSelectedWp] = useState('wave2')
  const [hoveredWp, setHoveredWp] = useState(null)
  const [copied, setCopied] = useState(false)
  const [theme, setTheme] = useState('light')
  const [selectedEmoji, setSelectedEmoji] = useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [customImage, setCustomImage] = useState(null)
  const fileInputRef = React.useRef(null)

  function handleImageUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setCustomImage(url)
    setSelectedWp('custom')
    e.target.value = ''
  }

  const EMOJI_OPTIONS = ['🎉','🚀','💰','🔥','⭐','🏆','💎','✨','🎯','💫','🌟','🥳','🎊','💸','📈']

  // Deterministic rain columns for emoji layer
  const emojiRain = Array.from({ length: 24 }, (_, i) => ({
    left:     `${(i * 4.2 + (i % 3) * 1.7) % 97}%`,
    size:     16 + (i % 7) * 8,
    duration: `${3.5 + (i % 5) * 1.2}s`,
    delay:    `-${(i * 0.9) % 6}s`,
    opacity:  0.3 + (i % 4) * 0.12,
    sway:     (i % 2 === 0 ? 1 : -1) * (10 + (i % 4) * 8),
  }))

  const wp = WALLPAPERS.find(w => w.id === selectedWp) ?? WALLPAPERS[0]
  const isDark = theme === 'dark'

  const t = {
    bg:            isDark ? '#0e0e0e' : (selectedWp === 'custom' ? '#ffffff' : wp.bg),
    toolbarBg:     isDark ? 'rgba(28,28,28,0.75)' : 'rgba(255,255,255,0.6)',
    divider:       isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)',
    iconStroke:    isDark ? '#e5e5e5' : '#1a1f2e',
    btnBg:         isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)',
    btnBorder:     isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
    btnColor:      isDark ? '#e5e5e5' : '#1a1f2e',
    logoSrc:       isDark ? '/assets/Stripe wordmark - White - Small.png' : '/assets/Stripe wordmark - Slate - Small.png',
  }

  function handleCopy() {
    navigator.clipboard?.writeText('https://stripe.com/share/metric/mrr/abc123').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ ...shareStyles.canvas, background: t.bg }}>
      <style>{`
        @keyframes floatA {
          0%,100% { transform: translate(0,0) scale(1); }
          25%      { transform: translate(50px,-40px) scale(1.07); }
          60%      { transform: translate(-30px,45px) scale(0.95); }
          80%      { transform: translate(20px,15px) scale(1.03); }
        }
        @keyframes floatB {
          0%,100% { transform: translate(0,0) scale(1); }
          30%      { transform: translate(-45px,30px) scale(0.94); }
          65%      { transform: translate(35px,-50px) scale(1.08); }
        }
        @keyframes floatC {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(30px,40px) scale(1.1); }
          70%      { transform: translate(-20px,-20px) scale(0.96); }
        }
        @keyframes floatD {
          0%,100% { transform: translate(0,0) scale(1) rotate(0deg); }
          35%      { transform: translate(-50px,-35px) scale(1.06) rotate(3deg); }
          70%      { transform: translate(40px,50px) scale(0.93) rotate(-2deg); }
        }
        @keyframes floatE {
          0%,100% { transform: translate(0,0) scale(1); }
          20%      { transform: translate(35px,50px) scale(0.96); }
          55%      { transform: translate(-40px,-30px) scale(1.09); }
          80%      { transform: translate(15px,-45px) scale(1.02); }
        }
        @keyframes sweepShimmer {
          0%,100% { opacity: 0.18; }
          50%      { opacity: 0.28; }
        }
        @keyframes emojiFall {
          0%   { transform: translateY(-80px) rotate(-15deg); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(110vh) rotate(20deg); opacity: 0; }
        }
      `}</style>

      {/* Animated color blobs */}
      {selectedWp !== 'custom' && wp.blobs.map((blob, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: blob.top,
          bottom: blob.bottom,
          left: blob.left,
          right: blob.right,
          width:  isDark ? blob.size * 1.4 : blob.size,
          height: isDark ? blob.size * 1.4 : blob.size,
          borderRadius: '50%',
          background: isDark ? blob.darkColor : blob.color,
          filter: isDark ? 'blur(140px)' : 'blur(90px)',
          pointerEvents: 'none',
          animation: `${blob.anim} ${blob.dur} ease-in-out infinite`,
        }} />
      ))}

      {/* Custom image blurred background */}
      {selectedWp === 'custom' && customImage && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <img
            src={customImage}
            alt=""
            style={{
              width: '120%',
              height: '120%',
              objectFit: 'cover',
              position: 'absolute',
              top: '-10%',
              left: '-10%',
              filter: 'blur(40px) saturate(140%)',
              transform: 'scale(1.05)',
            }}
          />
        </div>
      )}

      {/* Emoji rain layer */}
      {selectedEmoji && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'hidden' }}>
          {emojiRain.map((drop, i) => (
            <span key={i} style={{
              position: 'absolute',
              top: 0,
              left: drop.left,
              fontSize: drop.size,
              opacity: drop.opacity,
              lineHeight: 1,
              userSelect: 'none',
              animation: `emojiFall ${drop.duration} ${drop.delay} linear infinite`,
            }}>{selectedEmoji}</span>
          ))}
        </div>
      )}

      {/* Diagonal light sweep — the Stripe "glare" streak */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: `linear-gradient(
          118deg,
          transparent 30%,
          rgba(255,255,255,0.28) 48%,
          rgba(255,255,255,0.14) 52%,
          transparent 68%
        )`,
        animation: 'sweepShimmer 8s ease-in-out infinite',
        zIndex: 1,
      }} />

      {/* Top action bar */}
      <div style={shareStyles.topBar}>
        <img src={t.logoSrc} alt="Stripe" style={{ width: 56, height: 'auto' }} />
        <div style={shareStyles.topActions}>
          {/* Theme toggle */}
          <button
            title={isDark ? 'Switch to light' : 'Switch to dark'}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            style={{ ...shareStyles.outlineBtn, background: t.btnBg, border: `1px solid ${t.btnBorder}`, color: t.btnColor, padding: '7px 10px' }}
          >
            {isDark ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          <button style={{ ...shareStyles.outlineBtn, background: t.btnBg, border: `1px solid ${t.btnBorder}`, color: t.btnColor }} onClick={handleCopy}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Centered metric preview card */}
      <div style={shareStyles.previewArea}>
        <div style={{ transform: 'scale(1.5)', transformOrigin: 'center center' }}>
          <MetricCard compact />
        </div>
      </div>

      {/* Bottom toolbar */}
      <div style={{ ...shareStyles.toolbar, background: t.toolbarBg }}>
        {/* Wallpaper thumbnails */}
        <div style={shareStyles.wallpaperRow}>
          {WALLPAPERS.map((w) => {
            const isSelected = w.id === selectedWp
            const isHovered = w.id === hoveredWp
            const scale = isSelected
              ? (isHovered ? 1.2 : 1.1)
              : (isHovered ? 1.05 : 1)
            return (
              <button
                key={w.id}
                style={{
                  ...shareStyles.wpThumb,
                  width: 48,
                  height: 48,
                  outline: isSelected ? '2px solid rgba(103,93,255,0.2)' : 'none',
                  outlineOffset: 3,
                  transform: `scale(${scale})`,
                  transition: 'transform 0.15s ease',
                }}
                onClick={() => setSelectedWp(w.id)}
                onMouseEnter={() => setHoveredWp(w.id)}
                onMouseLeave={() => setHoveredWp(null)}
              >
                <img
                  src={w.thumb}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, display: 'block' }}
                />
              </button>
            )
          })}

          {/* Upload custom image button */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          <button
            style={{
              ...shareStyles.wpThumb,
              width: 48,
              height: 48,
              outline: selectedWp === 'custom' ? '2px solid rgba(103,93,255,0.2)' : 'none',
              outlineOffset: 3,
              transform: selectedWp === 'custom' ? 'scale(1.1)' : hoveredWp === 'custom' ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.15s ease',
              border: `1.5px dashed ${isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)'}`,
              borderRadius: 10,
              background: customImage && selectedWp === 'custom'
                ? 'none'
                : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
              overflow: 'hidden',
              flexShrink: 0,
            }}
            onClick={() => fileInputRef.current?.click()}
            onMouseEnter={() => setHoveredWp('custom')}
            onMouseLeave={() => setHoveredWp(null)}
            title="Upload your own image"
          >
            {customImage ? (
              <img src={customImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.35)'} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>

        {/* Divider */}
        <div style={{ ...shareStyles.divider, background: t.divider }} />

        {/* Action icons */}
        <div style={{ ...shareStyles.iconRow, position: 'relative' }}>
          {/* Emoji picker button */}
          <button
            style={{
              ...shareStyles.iconBtn,
              fontSize: 20,
              background: selectedEmoji ? 'rgba(103,93,255,0.12)' : 'none',
              borderRadius: 8,
            }}
            title="Add emoji"
            onClick={() => setShowEmojiPicker(p => !p)}
          >
            {selectedEmoji ?? '😊'}
          </button>

          {/* Emoji picker backdrop */}
          {showEmojiPicker && (
            <div
              style={{ position: 'fixed', inset: 0, zIndex: 19 }}
              onClick={() => setShowEmojiPicker(false)}
            />
          )}

          {/* Emoji picker popup */}
          {showEmojiPicker && (
            <div style={{
              position: 'absolute',
              bottom: 'calc(100% + 10px)',
              right: 0,
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 12,
              padding: 10,
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
              zIndex: 20,
            }}>
              {/* Clear option */}
              <button
                onClick={() => { setSelectedEmoji(null); setShowEmojiPicker(false) }}
                style={{
                  gridColumn: '1 / -1',
                  fontSize: 11,
                  color: '#6b7280',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '2px 4px 6px',
                  textAlign: 'left',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {selectedEmoji ? '✕ Remove' : 'Pick an emoji'}
              </button>
              {EMOJI_OPTIONS.map(e => (
                <button
                  key={e}
                  onClick={() => { setSelectedEmoji(e); setShowEmojiPicker(false) }}
                  style={{
                    fontSize: 22,
                    background: selectedEmoji === e ? 'rgba(103,93,255,0.12)' : 'none',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    padding: '4px',
                    lineHeight: 1,
                    transition: 'background 0.1s',
                  }}
                >{e}</button>
              ))}
            </div>
          )}

          <button style={shareStyles.iconBtn} title="Save" onClick={() => {
            const canvas = document.createElement('canvas')
            canvas.width = 1200
            canvas.height = 800
            const ctx = canvas.getContext('2d')
            ctx.fillStyle = wp.bg
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            canvas.toBlob((blob) => {
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'stripe-metric.png'
              a.click()
              URL.revokeObjectURL(url)
            })
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3v13M7 11l5 5 5-5" stroke={t.iconStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" stroke={t.iconStroke} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('dashboard')

  return view === 'share'
    ? <ShareConfigView onBack={() => setView('dashboard')} />
    : <DashboardView onShare={() => setView('share')} />
}

// Dashboard styles
const dashStyles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #eef2f9 0%, #f0f4fb 40%, #f5f3ff 70%, #eef2f9 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
    position: 'relative',
    overflow: 'hidden',
  },
  bgBlob1: {
    position: 'absolute',
    top: '10%',
    left: '5%',
    width: 400,
    height: 400,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(186,210,246,0.45) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgBlob2: {
    position: 'absolute',
    bottom: '10%',
    right: '5%',
    width: 360,
    height: 360,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(196,181,253,0.35) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  topBar: {
    position: 'absolute',
    top: 24,
    left: 24,
    right: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  topBarLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  topBarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  dashLabel: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: 500,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: 900,
    position: 'relative',
    zIndex: 1,
  },
  profileCard: {
    background: '#ffffff',
    borderRadius: 16,
    padding: '28px 32px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
    minWidth: 200,
    flexShrink: 0,
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    overflow: 'hidden',
    border: '2px solid #e8eaed',
    flexShrink: 0,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#1a3a5c',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarFallback: {
    position: 'absolute',
    inset: 0,
    background: '#1a3a5c',
    color: '#fff',
    fontSize: 18,
    fontWeight: 700,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  },
  businessName: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1a1f2e',
    letterSpacing: '-0.3px',
  },
  handle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: 400,
  },
  shareBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: '#1a1f2e',
    color: '#ffffff',
    border: 'none',
    borderRadius: 8,
    padding: '8px 14px',
    fontSize: 13,
    fontWeight: 600,
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',
    letterSpacing: '-0.1px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
  },
}

// Share config styles
const shareStyles = {
  canvas: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  waveOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    pointerEvents: 'none',
    filter: 'blur(2px)',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    zIndex: 10,
  },
  topActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  outlineBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    color: '#1a1f2e',
    border: '1px solid rgba(0,0,0,0.12)',
    borderRadius: 8,
    padding: '7px 14px',
    fontSize: 13,
    fontWeight: 500,
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',
    letterSpacing: '-0.1px',
  },
  previewArea: {
    position: 'relative',
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  stripeLogo: {
    position: 'absolute',
    bottom: 92,
    left: 28,
    zIndex: 5,
  },
  toolbar: {
    position: 'absolute',
    bottom: 70,
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(255,255,255,0.6)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRadius: 12,
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    zIndex: 10,
  },
  wallpaperRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  wpThumb: {
    padding: 0,
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  divider: {
    width: 1,
    height: 32,
    background: 'rgba(0,0,0,0.1)',
    flexShrink: 0,
  },
  iconRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  iconBtn: {
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    padding: 0,
    color: '#1a1f2e',
  },
}
