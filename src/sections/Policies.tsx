"use client";

import { HandCoins, CreditCard, Truck, Camera, Wand2 } from "lucide-react";

const policies = [
    {
        icon: <HandCoins className="w-6 h-6 text-[#C04800]" />,
        title: "Cash on Delivery",
        description: "50% advance required for COD, rest on delivery.",
    },
    {
        icon: <CreditCard className="w-6 h-6 text-[#C04800]" />,
        title: "Online Payments",
        description: "Pay fully online for faster processing.",
    },
    {
        icon: <Truck className="w-6 h-6 text-[#C04800]" />,
        title: "Delivery",
        description: "Within 11-15 working days across Pakistan.",
    },
    {
        icon: <Camera className="w-6 h-6 text-[#C04800]" />,
        title: "Photo Proof",
        description: "We share real product photos before dispatch.",
    },
    {
        icon: <Wand2 className="w-6 h-6 text-[#C04800]" />,
        title: "Customization",
        description: "Custom designs are welcome!",
    },
];

export default function Policies() {
    return (
        <section className="py-16 md:py-24 px-6 md:px-12 bg-[#FFF9F5]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-charmora-purple mb-4">
                        Our Policies
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 font-sans tracking-wide">
                        Transparency, trust & handcrafted elegance
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {policies.map((policy, index) => (
                        <div
                            key={policy.title}
                            className={`flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow duration-300 ${index === policies.length - 1 ? "md:col-span-2 md:max-w-md md:mx-auto w-full" : ""
                                }`}
                        >
                            <div className="flex-shrink-0 p-3 bg-orange-50 rounded-lg">
                                {policy.icon}
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-charmora-purple mb-1 font-sans">
                                    {policy.title}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500 font-sans leading-relaxed">
                                    {policy.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
