type LogoProps = {
  className?: string;
  size?: number;
};

export function Logo({ className, size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="18" r="6" fill="currentColor" />
      <circle cx="24" cy="18" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="18" r="2.5" fill="#1D9E75" />
    </svg>
  );
}
