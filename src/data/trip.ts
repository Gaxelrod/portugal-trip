export type Stop = {
  name: string;
  type: "restaurant" | "viewpoint" | "landmark" | "transport" | "activity";
  address?: string;
};

export type TripDay = {
  date: string;
  weekday: string;
  location: string;
  tagline: string;
  description: string;
  badge?: string;
  image: string;
  stops: Stop[];
};

export const tripDays: TripDay[] = [
  {
    date: "April 11",
    weekday: "Friday",
    location: "Paris",
    tagline: "And so it begins...",
    description: "Catching a flight to Paris at 1:45 PM. A quick overnight before heading south to Portugal.",
    image: "/images/paris.webp",
    stops: [
      { name: "Flight to Paris", type: "transport" },
    ],
  },
  {
    date: "April 12",
    weekday: "Saturday",
    location: "Paris to Lisbon",
    tagline: "Southbound",
    description: "A morning in Paris, then flying to Lisbon. Arriving around noon — the adventure officially starts.",
    image: "/images/lisbon-arrival.webp",
    stops: [
      { name: "Flight to Lisbon", type: "transport" },
    ],
  },
  {
    date: "April 13",
    weekday: "Sunday",
    location: "Lisbon",
    tagline: "First steps in Lisbon",
    description: "A relaxed day to settle in. Wander the cobblestone streets of the city center, soak up the atmosphere, and find a cozy spot for dinner.",
    image: "/images/lisbon-streets.webp",
    stops: [
      { name: "Lisbon city center", type: "landmark" },
      { name: "Dinner in the city", type: "restaurant" },
    ],
  },
  {
    date: "April 14",
    weekday: "Monday",
    location: "Cabo da Roca & Cascais",
    tagline: "Edge of the world",
    badge: "Tanya's Birthday!",
    description: "Starting with the dramatic cliffs of Cabo da Roca — the westernmost point of mainland Europe. Then a leisurely stop in the charming seaside town of Cascais for lunch. Evening: a birthday dinner with views of the Vasco da Gama Bridge, followed by Pink Street.",
    image: "/images/cabo-da-roca.webp",
    stops: [
      { name: "Cabo da Roca", type: "viewpoint", address: "Estrada do Cabo da Roca, 2705-001 Colares" },
      { name: "Cascais", type: "landmark", address: "Cascais, Portugal" },
      { name: "Fifty Seconds Experience", type: "restaurant", address: "Cais das Naus, Lisbon" },
      { name: "Pink Street", type: "activity", address: "Rua Nova do Carvalho, Lisbon" },
    ],
  },
  {
    date: "April 15",
    weekday: "Tuesday",
    location: "Lisbon",
    tagline: "The grand tour",
    description: "A walking tour through Lisbon's greatest hits — grand plazas, an iron elevator, a funicular ride, a ferry across the river to the Cristo Rei statue, and ending at a hilltop castle with panoramic views.",
    image: "/images/lisbon-tour.webp",
    stops: [
      { name: "Praca do Comercio", type: "landmark", address: "Praca do Comercio, Lisbon" },
      { name: "Arco da Rua Augusta", type: "landmark", address: "Rua Augusta, Lisbon" },
      { name: "Elevador de Santa Justa", type: "landmark", address: "Rua do Ouro, Lisbon" },
      { name: "Bica Funicular", type: "transport", address: "Rua de S. Paulo, Lisbon" },
      { name: "Cristo Rei", type: "landmark", address: "Alto do Pragal, Almada" },
      { name: "Porter Bistro", type: "restaurant", address: "Corpo Santo Hotel, Lisbon" },
      { name: "Santa Luzia Viewpoint", type: "viewpoint", address: "Largo Santa Luzia, Lisbon" },
      { name: "St. George's Castle", type: "landmark", address: "Castelo de Sao Jorge, Lisbon" },
    ],
  },
  {
    date: "April 16",
    weekday: "Wednesday",
    location: "Porto",
    tagline: "Port wine & bridges",
    description: "A full day in Porto — the Harry Potter bookstore, the iconic two-tiered bridge, port wine tasting in centuries-old cellars, and dinner in the dark at Blind Restaurant.",
    image: "/images/porto.webp",
    stops: [
      { name: "Livraria Lello", type: "landmark", address: "Rua das Carmelitas 144, Porto" },
      { name: "Rua das Flores", type: "landmark", address: "Rua das Flores, Porto" },
      { name: "Se Cathedral", type: "landmark", address: "Terreiro da Se, Porto" },
      { name: "Ribeira Square", type: "landmark", address: "Praca da Ribeira, Porto" },
      { name: "Ponte Luis I Bridge", type: "landmark", address: "Ponte Luis I, Porto" },
      { name: "Porto Calem", type: "activity", address: "Av. Diogo Leite 344, Vila Nova de Gaia" },
      { name: "Vila Nova de Gaia", type: "viewpoint", address: "Vila Nova de Gaia, Porto" },
      { name: "Blind Restaurant", type: "restaurant", address: "Rua Miguel Bombarda 598, Porto" },
    ],
  },
  {
    date: "April 17+",
    weekday: "",
    location: "Next Adventure",
    tagline: "To be continued...",
    description: "Leaving Portugal for the next chapter. Where to? Stay tuned...",
    image: "/images/next-adventure.webp",
    stops: [],
  },
];
