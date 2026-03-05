import Hero from "@/components/Hero";
import DayCard from "@/components/DayCard";
import Footer from "@/components/Footer";
import { tripDays } from "@/data/trip";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Hero />
      <section className="py-8">
        {tripDays.map((day, i) => (
          <DayCard key={day.date} day={day} index={i} />
        ))}
      </section>
      <Footer />
    </main>
  );
}
