export default function Hero() {
  return (
    <header className="relative px-6 pt-16 pb-12 text-center overflow-hidden">
      {/* Decorative watercolor blobs */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-tile-blue/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-10 right-0 w-32 h-32 bg-sunset/15 rounded-full blur-3xl translate-x-1/2" />
      <div className="absolute bottom-0 left-1/2 w-48 h-24 bg-sunset-light/10 rounded-full blur-3xl -translate-x-1/2" />

      <p className="font-hand text-sunset text-2xl mb-2">April 2026</p>
      <h1 className="font-headline text-5xl md:text-7xl text-tile-blue leading-tight mb-4">
        Portugal<br />&amp; Beyond
      </h1>
      <p className="font-body text-sm text-tile-blue/70 tracking-widest uppercase">
        Garrett &middot; Tanya <span className="text-sunset">&hearts;</span> &middot; Alsu
      </p>

      {/* Decorative divider */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="h-px w-12 bg-sunset/40" />
        <span className="font-hand text-sunset text-lg">~</span>
        <div className="h-px w-12 bg-sunset/40" />
      </div>
    </header>
  );
}
