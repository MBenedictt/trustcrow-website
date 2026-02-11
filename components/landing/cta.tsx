import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";


const CTA = () => {

    return (
        <section className="py-12 bg-background">
            <div className="p-12 max-md:p-8 mx-16 max-xl:mx-8 max-md:mx-10 rounded-xl bg-gradient-to-br from-[#286763] to-[rgb(45,104,133)]">
                <div className="flex flex-col items-center justify-between gap-8">

                    {/* Left Content */}
                    <div className="w-full flex flex-col gap-4">
                        <p className="text-sm font-extrabold text-slate-200 uppercase tracking-wider">
                            You&apos;ve scrolled this far...
                        </p>

                        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-bold leading-tight">
                            Ready to level up your payment process?
                        </h2>

                        <p className="text-white/80 text-md md:text-lg max-w-3xl leading-relaxed">
                            Supports freelancers, creators, and businesses with secure
                            invoicing, milestone-based payments, and automated fund
                            protection.
                        </p>
                    </div>

                    <div className="w-full">
                        <Button
                            size="lg"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 max-md:focus:bg-primary/90 max-md:focus:outline-none rounded-lg cursor-pointer px-8 py-6 text-lg max-md:px-4 max-md:py-2 max-md:text-sm font-semibold"
                        >
                            Make a Quotation
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;