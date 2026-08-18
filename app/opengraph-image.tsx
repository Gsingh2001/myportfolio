import { ImageResponse } from 'next/og';

export const alt = '24xDev — Web Development & AI Solutions Agency, Sheffield & UK-Wide';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

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
          alignItems: 'center',
          backgroundColor: '#07080c',
          backgroundImage:
            'radial-gradient(circle at 25% 20%, rgba(34,211,238,0.35), transparent 45%), radial-gradient(circle at 80% 80%, rgba(37,99,235,0.3), transparent 50%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 96,
              height: 96,
              borderRadius: 20,
              backgroundImage: 'linear-gradient(135deg, #22d3ee, #2563eb)',
              color: '#000',
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            24
          </div>
          <div style={{ display: 'flex', fontSize: 80, fontWeight: 800, color: '#ffffff' }}>
            x<span style={{ color: '#22d3ee' }}>Dev</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 28,
            display: 'flex',
            fontSize: 34,
            fontWeight: 600,
            color: '#cbd5e1',
            textAlign: 'center',
          }}
        >
          Web Development &amp; AI Solutions Agency
        </div>
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 28px',
            borderRadius: 999,
            border: '1px solid rgba(34,211,238,0.4)',
            backgroundColor: 'rgba(8,145,178,0.12)',
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 2,
            color: '#67e8f9',
            textTransform: 'uppercase',
          }}
        >
          Sheffield &amp; UK-Wide
        </div>
      </div>
    ),
    { ...size },
  );
}
