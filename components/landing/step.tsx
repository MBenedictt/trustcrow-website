import {
    PenLine,
    CircleDollarSign,
    BicepsFlexed,
    Send,
    Gavel,
    HandCoins
} from "lucide-react";

const Step = () => {
    const steps = [
        {
            title: "Create",
            desc: "Create a digital invoice with clear milestones and terms.",
            icon: PenLine,
        },
        {
            title: "Pay",
            desc: "Clients pays upfront. Funds are securely locked in escrow.",
            icon: CircleDollarSign,
        },
        {
            title: "Work",
            desc: "Work begins based on the agreed milestones.",
            icon: BicepsFlexed,
        },
        {
            title: "Submit",
            desc: "Submit completed work for review.",
            icon: Send,
        },
        {
            title: "Validate",
            desc: "Client reviews, approves, or requests revisions.",
            icon: Gavel,
        },
        {
            title: "Release",
            desc: "Funds are released per milestone until completion.",
            icon: HandCoins,
        },
    ]

    return (
        <section className="py-12 bg-background">
            <div className="p-16 max-md:p-8 mx-16 max-xl:mx-8 max-lg:mx-14 max-md:mx-10 rounded-xl bg-gradient-to-br from-[rgb(41,163,149)] to-[rgb(45,104,133)]">

                <p className="text-sm font-extrabold text-slate-200 uppercase tracking-wider mb-3">
                    STEP BY STEP
                </p>

                <h2
                    id="how-it-works"
                    className="mt-[-12px] font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
                >
                    From agreement to payout
                </h2>

                <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 mt-6">
                    {steps.map((step, index) => (
                        <div
                            key={step.title}
                            tabIndex={0}
                            className="
                                bg-white/10 p-6 rounded-lg
                                border border-white/10
                                hover:border-white/70
                                transition-all duration-300 ease-out
                                hover:bg-white/15 hover:-translate-y-1
                                max-md:focus:bg-white/15 
                                max-md:focus:-translate-y-1
                                max-md:focus:outline-none 
                                max-md:focus:border-white/70
                                cursor-pointer
                            "
                        >
                            <step.icon className="w-8 h-8 text-white/90 mb-2" />
                            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                <span>{index + 1}. {step.title}</span>
                            </h3>

                            <p className="text-white/90 text-sm">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Step;