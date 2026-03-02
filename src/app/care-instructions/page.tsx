"use client";

import UtilityPage from "@/components/layout/UtilityPage";

export default function CareInstructionsPage() {
    return (
        <UtilityPage
            title="Jewelry Care"
            subtitle="Preserving Eternal Brilliance"
        >
            <div className="space-y-12">
                <section>
                    <h2 className="text-xl font-serif text-charmora-purple mb-4">The Art of Preservation</h2>
                    <p>
                        Cinderella's Charmora jewelry is designed to be cherished for a lifetime and passed down through
                        generations. To maintain the exquisite luster of your pieces, a little mindful care goes a long way.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-charmora-pink/10 border border-charmora-pink-dark/5">
                        <h3 className="text-sm uppercase tracking-widest text-charmora-pink-dark mb-4 font-semibold">Wear with care</h3>
                        <p className="text-sm leading-relaxed">
                            Always apply perfumes, lotions, and hairspray before putting on your jewelry. Chemicals found
                            in these products can dull the shine of gold and damage delicate organic materials like pearls.
                        </p>
                    </div>
                    <div className="p-8 bg-charmora-pink/10 border border-charmora-pink-dark/5">
                        <h3 className="text-sm uppercase tracking-widest text-charmora-pink-dark mb-4 font-semibold">Proper Storage</h3>
                        <p className="text-sm leading-relaxed">
                            When not in use, store your jewelry in the provided Cinderella's Charmora pouch or a lined
                            jewelry box. Keep pieces separate to avoid scratching.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-serif text-charmora-purple mb-4">Cleaning Your Treasures</h2>
                    <p>
                        For gold pieces, a soft lint-free cloth is usually all that is needed to restore brilliance.
                        For pearls, gently wipe with a damp cloth after each wear to remove natural oils. Never use
                        ultrasonic cleaners or harsh chemicals on artisan pieces.
                    </p>
                </section>
            </div>
        </UtilityPage>
    );
}

