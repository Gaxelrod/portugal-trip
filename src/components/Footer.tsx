export default function Footer() {
  return (
    <footer className="px-6 py-16 text-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px w-12 bg-sunset/40" />
        <span className="font-hand text-sunset text-lg">~</span>
        <div className="h-px w-12 bg-sunset/40" />
      </div>
      <p className="font-hand text-4xl text-tile-blue -rotate-2">
        See you in Portugal!
      </p>
      <p className="font-body text-xs text-tile-blue/40 mt-6">April 2026</p>
    </footer>
  );
}
