"use client";

import UtilityPage from "@/components/layout/UtilityPage";

export default function TermsPage() {
    return (
        <UtilityPage
            title="Terms of Service"
            subtitle="Governing the Boutique Experience"
        >
            <div className="space-y-8 text-sm">
                <p>Last Updated: March 2026</p>

                <section>
                    <h2 className="text-xl font-serif text-luxury-charcoal mb-4">Acceptance of Terms</h2>
                    <p>
                        By accessing and using the Cinderela Charmora website, you agree to be bound by these
                        Terms of Service and all applicable laws and regulations.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-serif text-luxury-charcoal mb-4">Intellectual Property</h2>
                    <p>
                        All content on this site, including jewelry designs, imagery, brand names, and text, is
                        the exclusive property of Cinderela Charmora and is protected by international copyright laws.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-serif text-luxury-charcoal mb-4">Product Representation</h2>
                    <p>
                        We make every effort to display the colors and details of our pieces as accurately as possible.
                        However, as many items feature natural materials and hand-craftsmanship, slight variations
                        are inherent and part of the piece's unique story.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-serif text-luxury-charcoal mb-4">Limitation of Liability</h2>
                    <p>
                        Cinderela Charmora shall not be liable for any indirect, incidental, or consequential
                        damages resulting from the use or inability to use our services or products.
                    </p>
                </section>
            </div>
        </UtilityPage>
    );
}
