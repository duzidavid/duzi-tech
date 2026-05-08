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
          padding: '80px',
          background: '#0F172A',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'flex' }}
        >
          <circle cx="12" cy="18" r="6" fill="#ffffff" />
          <circle cx="24" cy="18" r="6" fill="none" stroke="#ffffff" strokeWidth="2" />
          <circle cx="18" cy="18" r="2.5" fill="#1D9E75" />
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1,
              color: '#ffffff',
              display: 'flex',
            }}
          >
            Duzi Tech
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 36,
              fontWeight: 400,
              color: '#CBD5E1',
              display: 'flex',
            }}
          >
            {company.tagline}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 80,
            right: 80,
            fontSize: 24,
            color: '#94A3B8',
            display: 'flex',
          }}
        >
          duzi.tech
        </div>
      </div>
    ),
    { ...size },
  );
}
