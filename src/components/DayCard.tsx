import Image from "next/image";
import type { TripDay, Stop } from "@/data/trip";

function StopIcon({ type }: { type: Stop["type"] }) {
  switch (type) {
    case "restaurant":
      return <span title="Restaurant">&#127860;</span>;
    case "viewpoint":
      return <span title="Viewpoint">&#128065;</span>;
    case "transport":
      return <span title="Transport">&#128747;</span>;
    case "activity":
      return <span title="Activity">&#127881;</span>;
    default:
      return <span title="Landmark">&#128205;</span>;
  }
}

export default function DayCard({ day, index }: { day: TripDay; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <article className="relative px-4 mb-12 max-w-lg mx-auto">
      {/* Date tab */}
      <div
        className={`inline-block px-4 py-1 mb-3 bg-tile-blue text-cream font-hand text-xl rounded-sm shadow-md ${
          isEven ? "-rotate-1" : "rotate-1"
        }`}
      >
        {day.date} {day.weekday && `\u2014 ${day.weekday}`}
      </div>

      {/* Birthday badge */}
      {day.badge && (
        <span className="ml-3 inline-block px-3 py-1 bg-sunset text-white font-hand text-lg rounded-full -rotate-3 shadow">
          {day.badge}
        </span>
      )}

      {/* Location title */}
      <h2 className="font-hand text-3xl md:text-4xl text-tile-blue mt-2 mb-1">
        {day.location}
      </h2>
      <p className="font-hand text-sunset text-lg italic mb-4">{day.tagline}</p>

      {/* Polaroid photo */}
      <div
        className={`bg-white p-2 pb-8 shadow-lg mb-4 ${
          isEven ? "-rotate-2" : "rotate-2"
        }`}
      >
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={day.image}
            alt={day.location}
            fill
            className="object-cover"
          />
        </div>
        <p className="font-hand text-center text-tile-blue/60 text-sm mt-2">
          {day.location}
        </p>
      </div>

      {/* Description — torn paper strip */}
      <div className={`relative mt-2 mb-4 ${isEven ? "rotate-1" : "-rotate-1"}`}>
        {/* Tape piece */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-200/70 rotate-2 rounded-sm shadow-sm z-10" />
        {/* Paper strip */}
        <div className="torn-paper bg-cream-dark px-5 py-5 shadow-md">
          <p className="font-hand text-base text-tile-blue/80 leading-relaxed text-center">
            {day.description}
          </p>
        </div>
      </div>

      {/* Stops */}
      {day.stops.length > 0 && (
        <ul className="space-y-2">
          {day.stops.map((stop) => (
            <li key={stop.name} className="flex items-start gap-2">
              <span className="text-base mt-0.5 shrink-0">
                <StopIcon type={stop.type} />
              </span>
              <div>
                <span className="font-hand text-lg text-tile-blue">{stop.name}</span>
                {stop.address && (
                  <span className="block font-body text-xs text-gray-500">{stop.address}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
