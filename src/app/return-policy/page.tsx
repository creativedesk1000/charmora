"use client";

import UtilityPage from "@/components/layout/UtilityPage";

export default function ReturnPolicyPage() {
    return (
        <UtilityPage
            title="Return & Refund Policy"
            subtitle="Hassle-Free Returns"
        >
            <div className="space-y-8 text-sm">
                <p>Last Updated: March 2026</p>

                <section>
                    <h2 className="text-xl font-serif text-charmora-purple mb-4">Our Return Policy</h2>
                    <p>
                        At Cinderella's Charmora, we want you to be absolutely delighted with your purchase.
                        If for any reason you are not completely satisfied, we accept returns within 14 days of delivery.
                    </p>
                    <p className="mt-4">
                        To be eligible for a return, your item must be unused, in the same condition that you received it,
                        and in its original packaging with all tags attached.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-serif text-charmora-purple mb-4">How to Initiate a Return</h2>
                    <p>
                        To start a return, please contact our concierge service at <strong>charmora1000@gmail.com</strong>.
                        We will provide you with instructions on how and where to send your package.
                        Items sent back to us without first requesting a return will not be accepted.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-serif text-charmora-purple mb-4">Refund Process</h2>
                    <p>
                        Once your return is received and inspected, we will notify you of the approval or rejection of your refund.
                        If approved, your refund will be processed, and a credit will automatically be applied to your original
                        method of payment within 5-7 business days.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-serif text-charmora-purple mb-4">Exceptions / Non-Returnable Items</h2>
                    <p>
                        Certain types of items cannot be returned, like custom-made or personalized pieces, and items purchased
                        during final sale events. Please get in touch if you have questions or concerns about your specific item.
                    </p>
                </section>
            </div>
        </UtilityPage>
    );
}
