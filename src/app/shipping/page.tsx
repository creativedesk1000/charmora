"use client";

import UtilityPage from "@/components/layout/UtilityPage";

export default function ShippingPage() {
    return (
        <UtilityPage
            title="Shipping & Returns"
            subtitle="Our Commitment to Service"
        >
            <div className="space-y-12">
                <section>
                    <h2 className="text-xl font-serif text-charmora-purple mb-4">Complimentary Global Shipping</h2>
                    <p>
                        At Cinderellaz Charmora, we believe the luxury experience begins the moment you place your order.
                        We offer complimentary insured shipping on all orders worldwide. Each piece is carefully
                        packaged in our signature luxury gift box, ensuring it arrives in pristine condition.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-serif text-charmora-purple mb-4">Delivery Timelines</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Domestic:</strong> 3-5 business days</li>
                        <li><strong>International:</strong> 7-12 business days (subject to customs)</li>
                    </ul>
                    <p className="mt-4">
                        Please note that as many of our pieces are handmade to order, there may be a 2-3 day
                        processing time before shipment.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-serif text-charmora-purple mb-4">Refined Returns</h2>
                    <p>
                        We want you to be absolutely delighted with your selection. If for any reason you are not
                        completely satisfied, we accept returns within 14 days of delivery.
                    </p>
                    <p className="mt-4">
                        Items must be returned in their original, unworn condition with all security tags and packaging intact.
                        To initiate a return, please contact our concierge service at care@charmora.com.
                    </p>
                </section>
            </div>
        </UtilityPage>
    );
}

