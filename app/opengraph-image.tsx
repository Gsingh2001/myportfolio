import { ImageResponse } from 'next/og';

export const alt = '24xDev — Web Development & AI Solutions Agency, Sheffield & UK-Wide';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#1C1A16';
const PAPER = '#F6F3EC';
const ACCENT = '#E8501A';
const INK_SECONDARY = '#5B564C';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: PAPER,
          backgroundImage:
            `linear-gradient(${INK}14 1px, transparent 1px), linear-gradient(90deg, ${INK}14 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          fontFamily: 'sans-serif',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 4,
            color: ACCENT,
            textTransform: 'uppercase',
          }}
        >
          Sheffield &amp; UK-Wide
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 24 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 84,
              height: 84,
              border: `4px solid ${INK}`,
              color: INK,
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            24
          </div>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, color: INK }}>
            x<span style={{ color: ACCENT }}>Dev</span>
          </div>
        </div>

        <div
          style={{
            marginTop: 28,
            display: 'flex',
            fontSize: 32,
            fontWeight: 500,
            color: INK_SECONDARY,
            maxWidth: 820,
          }}
        >
          Web Development &amp; AI Solutions Agency
        </div>

        <div
          style={{
            marginTop: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', width: 48, height: 2, backgroundColor: ACCENT }} />
          <div style={{ display: 'flex', fontSize: 20, color: INK_SECONDARY, letterSpacing: 2, textTransform: 'uppercase' }}>
            24xdev.co.uk
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
