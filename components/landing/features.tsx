import { ArrowLeftRight, Layers, Shield } from "lucide-react";
import SpotlightCard from "../SpotlightCard";

const Features = () => {
    const features = [
        {
            icon: ArrowLeftRight,
            title: "Smart Contract Invoicing",
            description: "Automated digital invoices secured by blockchain-based smart contracts.",
            description2: "Funds are locked safely and only released when predefined conditions are met ensuring trustless transactions.",
        },
        {
            icon: Layers,
            title: "Milestone-Based Payment",
            description: "Payments are released gradually based on verified project milestones.",
            description2: "Freelancers get paid for real progress, while clients maintain full control and visibility over deliverables.",
        },
        {
            icon: Shield,
            title: "Anti-Ghosting System",
            description: "Built-in rules, penalties, and lock-fund mechanisms protect both parties.",
            description2: "If obligations aren’t met, TrustCrow automatically redistributes or returns funds—no drama, no manual disputes.",
        },
    ];

    return (
        <section className="py-12 bg-background">
            <div className="container mx-auto px-16 max-xl:px-8 max-md:px-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
                    <div>
                        <p className="text-sm font-bold text-accent uppercase tracking-wider mb-3">
                            FUTURE PAYMENT
                        </p>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
                            A better way to build trust in every deal.
                        </h2>
                    </div>
                    <div className="flex items-center">
                        <p className="text-muted-foreground text-lg max-sm:text-sm max-w-xl leading-relaxed">
                            By combining milestone-based invoicing, smart contract automation, and transparent verification workflows, TrustCrow eliminates payment disputes, ghosting risks, and trust issues—before they happen.
                        </p>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <SpotlightCard
                            key={feature.title}
                            // 1. ADD tabIndex={0} HERE 
                            // This makes the div focusable on tap/click
                            tabIndex={0}
                            className="custom-spotlight-card group cursor-pointer focus:outline-none"
                            spotlightColor="rgba(40, 103, 99, 0.4)">

                            <div className="relative w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(41,163,149)] to-[rgb(45,104,133)] opacity-0 group-hover:opacity-70 group-focus:opacity-70 transition-opacity duration-300" />
                                <feature.icon className="relative z-10 w-6 h-6 text-primary group-hover:text-accent-foreground group-focus:text-accent-foreground transition-colors duration-300" />
                            </div>

                            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                                {feature.title}
                            </h3>

                            <div className="relative mt-2 min-h-[72px] max-xl:min-h-[84px]">
                                {/* Description 1 */}
                                <p
                                    className="
                                        absolute inset-0
                                        text-muted-foreground text-sm leading-relaxed
                                        transition-all duration-300 ease-out
                                        opacity-100 translate-y-0
                                        group-hover:opacity-0 group-hover:translate-y-2
                                        max-md:group-focus:opacity-0 max-md:group-focus:translate-y-2
                                    "
                                >
                                    {feature.description}
                                </p>

                                {/* Description 2 */}
                                <p
                                    className="
                                        absolute inset-0
                                        text-muted-foreground text-sm leading-relaxed
                                        transition-all duration-300 ease-out
                                        opacity-0 -translate-y-2
                                        group-hover:opacity-100 group-hover:translate-y-0
                                        max-md:group-focus:opacity-100 max-md:group-focus:translate-y-0
                                    "
                                >
                                    {feature.description2}
                                </p>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;