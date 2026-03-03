import AppLayout from "@/components/layout";
import Hero from "@/sections/Hero";
import ShopByCategory from "@/sections/ShopByCategory";
import NewArrivals from "@/sections/NewArrivals";
import Bestsellers from "@/sections/Bestsellers";
import Policies from "@/sections/Policies";
import Craftsmanship from "@/sections/Craftsmanship";

export default function Home() {
  return (
    <AppLayout>
      <Hero />
      <ShopByCategory />
      <NewArrivals />
      <Bestsellers />
      <Policies />
      <Craftsmanship />

      {/* Testimonials Placeholder */}
      <section className="py-24 px-6 md:px-12 bg-[#FFF9F5] text-center border-t border-orange-50">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C04800] font-medium mb-8 block font-sans">Voices of Elegance</span>
          <p className="text-2xl md:text-3xl font-serif italic text-charmora-purple mb-8 leading-relaxed">
            "The moonlight pearl necklace is more than jewelry; it's a piece of art that makes every moment feel extraordinary. Truly exceptional craftsmanship."
          </p>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans font-semibold">— Sophia Montgomery, London</p>

          <div className="mt-8 text-sm text-gray-400 font-sans italic">No testimonials yet.</div>
        </div>
      </section>

      {/* Instagram Gallery Placeholder */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-serif text-charmora-purple">Follow Our Journey</h2>
          <p className="text-xs uppercase tracking-widest text-[#C04800] mt-4 font-sans font-bold">@CinderellasCharmora</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            "https://images.unsplash.com/photo-1544441892-c4bc0b3459c7?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1535633302703-b0703af08f82?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=400&auto=format&fit=crop"
          ].map((url, i) => (
            <div key={i} className="aspect-square bg-orange-50/50 border border-orange-100 overflow-hidden group rounded-lg">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                style={{ backgroundImage: `url('${url}')` }}
              />
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}


