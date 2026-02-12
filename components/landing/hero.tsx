import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const Hero = () => {
    return (
        <section id="home" className="relative px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-[#E6FFFB] to-[#FFFFFF] pt-[140px]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center gap-6 max-lg:px-12 max-md:px-2 max-sm:px-0">
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full border border-gray-200 shadow-sm bg-white">
                        <i>
                            <ShieldCheck className="w-4 h-4 text-blue-400" />
                        </i>
                        <p className="text-xs font-medium text-muted-foreground">
                            Powered by Base Protocol • Early Access
                        </p>
                        <div className="w-4 h-4 bg-blue-400/10 rounded-full flex justify-center items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl max-sm:px-4 font-bold text-center leading-tight text-foreground">
                        The Safe Space for
                        <br />
                        <span className="text-primary font-extrabold">Every Deal</span>
                    </h1>
                    <div className="w-fit flex flex-col items-center max-md:px-4">
                        <p className="font-semibold max-sm:text-sm text-gray-600 max-w-3xl leading-relaxed text-center">
                            Secure escrow payments service for freelance, gig economy, and creator–brand collaboration activities.
                        </p>
                        <p className="text-muted-foreground max-sm:text-sm max-w-3xl leading-relaxed text-center mt-2">
                            Transaction are protected by Smart Contracts until all parties deliver their commitments.
                        </p>
                    </div>

                    <div className="flex flex-row gap-4 pt-2">
                        <Link href="/dashboard">
                            <Button size="lg" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 max-md:focus:bg-primary/90 max-md:focus:outline-none">
                                Get Started <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>

                        <Button size="lg" variant="outline" className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary max-md:focus:bg-primary/10 max-md:focus:text-primary max-md:focus:border-primary max-md:focus:outline-none">
                            Watch Demo
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
