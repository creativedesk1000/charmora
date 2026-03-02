import AppLayout from "@/components/layout";
import Hero from "@/sections/Hero";
import FeaturedCollection from "@/sections/FeaturedCollection";
import Craftsmanship from "@/sections/Craftsmanship";

export default function Home() {
  return (
    <AppLayout>
      <Hero />
      <FeaturedCollection />
      <Craftsmanship />

      {/* Testimonials Placeholder */}
      <section className="py-24 px-6 md:px-12 bg-charmora-beige text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-charmora-pink-dark font-medium mb-8 block font-sans">Voices of Elegance</span>
          <p className="text-2xl md:text-3xl font-serif italic text-charmora-purple mb-8 leading-relaxed">
            "The moonlight pearl necklace is more than jewelry; it's a piece of art that makes every moment feel extraordinary. Truly exceptional craftsmanship."
          </p>
          <p className="text-[10px] uppercase tracking-widest text-charmora-pink-dark font-sans font-semibold">— Sophia Montgomery, London</p>
        </div>
      </section>

      {/* Instagram Gallery Placeholder */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-serif text-charmora-purple">Follow Our Journey</h2>
          <p className="text-xs uppercase tracking-widest text-charmora-pink-dark mt-4 font-sans">@CinderellazCharmora</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="aspect-square bg-charmora-pink/20 border border-charmora-pink-dark/5 overflow-hidden group">
              <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop&sig=${i}')` }} />
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}

