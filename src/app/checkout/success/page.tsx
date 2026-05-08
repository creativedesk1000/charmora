export const dynamic = "force-dynamic";

import Link from "next/link";
import AppLayout from "@/components/layout";
import { CheckCircle } from "lucide-react";

export default async function OrderSuccessPage({ searchParams }: { searchParams: Promise<{ id: string }> }) {
    const { id } = await searchParams;
    return (
        <AppLayout>
            <div className="pt-40 pb-24 px-6 text-center min-h-screen">
                <div className="max-w-md mx-auto bg-white p-12 rounded-[3rem] shadow-xl border border-charmora-pink/10">
                    <div className="flex justify-center mb-8">
                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle size={40} />
                        </div>
                    </div>
                    <h1 className="text-3xl font-serif text-charmora-purple mb-4">Order Received!</h1>
                    <p className="text-sm text-charmora-purple/60 mb-8 leading-relaxed">
                        Thank you for choosing Cinderella's Charmora. Your order reference is:
                        <br />
                        <span className="font-mono font-bold text-charmora-purple text-lg mt-2 inline-block bg-neutral-50 px-4 py-2 rounded-xl border border-neutral-100 select-all">{id}</span>
                        <br />
                        <span className="text-[10px] block mt-2 opacity-60">Please save this ID to track your shipment.</span>
                    </p>
                    <div className="space-y-4">
                        <Link href={`/track?id=${id}`} className="block w-full py-4 bg-charmora-purple text-white rounded-2xl font-bold tracking-widest hover:bg-charmora-purple/90 transition-colors shadow-lg">
                            Track Shipment
                        </Link>
                        <Link href="/shop" className="block w-full py-4 bg-neutral-50 text-charmora-purple rounded-2xl font-bold tracking-widest hover:bg-neutral-100 transition-colors border border-neutral-100">
                            Continue Shopping
                        </Link>
                        <p className="text-[10px] uppercase tracking-widest text-charmora-purple/40">
                            A confirmation email will be sent shortly.
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
