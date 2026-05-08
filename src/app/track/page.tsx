import { Suspense } from "react";
import TrackClient from "@/app/track/TrackClient";

export const metadata = {
    title: "Track Your Order | Charmora",
    description: "Track your order status and shipping details.",
};

export default function TrackPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-charmora-beige font-serif italic text-charmora-purple/40">Initializing Logistics Portal...</div>}>
            <TrackClient />
        </Suspense>
    );
}
