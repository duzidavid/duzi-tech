import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
        }}
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="18" r="6" fill="#0F172A" />
          <circle cx="24" cy="18" r="6" fill="none" stroke="#0F172A" strokeWidth="2" />
          <circle cx="18" cy="18" r="2.5" fill="#1D9E75" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
