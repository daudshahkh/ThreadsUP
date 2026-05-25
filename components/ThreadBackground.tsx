export default function ThreadBackground({ opacity = "opacity-40" }: { opacity?: string }) {
  return (
    <svg
      className={`fixed inset-0 w-full h-full z-0 pointer-events-none ${opacity}`}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <path d="M-10,20 C 30,50 80,-10 110,40 S 20,80 120,90" fill="transparent" stroke="#D0A85C" strokeWidth="0.2" />
      <path d="M110,40 C 80,60 10,30 -10,70" fill="transparent" stroke="#D0A85C" strokeWidth="0.1" strokeDasharray="1,1" />
    </svg>
  );
}

