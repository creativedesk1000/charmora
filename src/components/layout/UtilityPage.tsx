import AppLayout from "@/components/layout";
import { motion } from "framer-motion";

interface UtilityPageProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export default function UtilityPage({ title, subtitle, children }: UtilityPageProps) {
    return (
        <AppLayout>
            <section className="pt-40 pb-24 px-6 md:px-12 bg-luxury-ivory">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl text-luxury-charcoal font-serif mb-4"
                        >
                            {title}
                        </motion.h1>
                        {subtitle && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-sans font-medium"
                            >
                                {subtitle}
                            </motion.p>
                        )}
                        <div className="mt-8 h-[1px] w-20 bg-luxury-gold/30 mx-auto" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-luxury max-w-none text-luxury-charcoal/80 font-sans leading-relaxed space-y-8"
                    >
                        {children}
                    </motion.div>
                </div>
            </section>
        </AppLayout>
    );
}
