import { ImageResponse } from 'next/og';
import { company } from '@/lib/company';

export const runtime = 'edge';
export const alt = `${company.shortName} — ${company.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
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
          padding: '96px',
          background: 'linear-gradient(135deg, #1D9E75 0%, #157A5B 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 112,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1,
            display: 'flex',
          }}
        >
          {company.shortName}
          <span style={{ opacity: 0.85 }}>.</span>
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 40,
            fontWeight: 400,
            opacity: 0.95,
            display: 'flex',
          }}
        >
          {company.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
