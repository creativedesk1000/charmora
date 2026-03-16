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
                        Thank you for choosing Cinderella's Charmora. Your order <span className="font-bold text-charmora-purple">#{id?.slice(-8).toUpperCase()}</span> has been received and is being prepared with care.
                    </p>
                    <div className="space-y-4">
                        <Link href="/shop" className="block w-full py-4 bg-charmora-purple text-white rounded-2xl font-bold tracking-widest hover:bg-charmora-purple/90 transition-colors">
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
