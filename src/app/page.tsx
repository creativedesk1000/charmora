export const dynamic = "force-dynamic";

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


    </AppLayout>
  );
}


