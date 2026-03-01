"use client";

import UtilityPage from "@/components/layout/UtilityPage";

export default function PrivacyPage() {
    return (
        <UtilityPage
            title="Privacy Policy"
            subtitle="Your Data, Protected"
        >
            <div className="space-y-8 text-sm">
                <p>Last Updated: March 2026</p>

                <section>
                    <h2 className="text-xl font-serif text-luxury-charcoal mb-4">Our Commitment</h2>
                    <p>
                        At Cinderela Charmora, we respect your privacy and are committed to protecting it. This policy
                        outlines how we collect, use, and safeguard your information when you visit our boutique online.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-serif text-luxury-charcoal mb-4">Information Collection</h2>
                    <p>
                        We collect information you provide directly to us when you make a purchase, sign up for our
                        newsletter, or contact our concierge service. This may include your name, email address,
                        shipping address, and payment information.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-serif text-luxury-charcoal mb-4">How We Use Your Information</h2>
                    <p>
                        We use your information strictly to process your orders, provide customer support, and,
                        with your consent, send you updates about our latest collections. We never sell your
                        personal data to third parties.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-serif text-luxury-charcoal mb-4">Security</h2>
                    <p>
                        We implement industry-standard security measures to ensure the safety of your personal
                        information. All transactions are processed through secure, encrypted gateways.
                    </p>
                </section>
            </div>
        </UtilityPage>
    );
}
