'use client';

import Lottie from "lottie-react";
import freelancerAnim from "@/public/animations/freelancer.json";
import clientAnim from "@/public/animations/client.json";
import lockAnim from "@/public/animations/lock.json";

const WhyUs = () => {
    return (
        <section className="py-12 bg-background">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight text-center max-md:text-start max-md:px-10">
                Why Choose Us?
            </h1>

            <p className="text-muted-foreground text-lg max-sm:text-sm leading-relaxed text-center max-md:text-start max-md:px-10 mt-4">
                TrustCrow offers a trustless two-way commitment escrow system powered by smart contracts.
            </p>

            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 mt-8 px-16 max-xl:px-8 max-md:px-10">

                {/* Freelancer Card */}
                <div
                    tabIndex={0}
                    className="
                        group relative 
                        bg-secondary rounded-xl p-6 flex flex-col 
                        transition-all duration-300 ease-out cursor-pointer
                        hover:scale-102 max-md:focus:scale-102 max-md:focus:outline-none
                    "
                >
                    <div className="flex justify-center items-center relative rounded-xl overflow-hidden">
                        {/* Original Animation (Freelancer) */}
                        <Lottie
                            animationData={freelancerAnim}
                            loop
                            autoplay
                            className="w-120 h-120 max-xl:w-72 max-xl:h-72"
                        />

                        {/* Lock Overlay - Hidden by default, shown on hover/focus */}
                        <div className="
                            absolute inset-0 
                            backdrop-blur-sm bg-secondary/70 
                            flex justify-center items-center 
                            rounded-xl
                            
                            opacity-0 
                            group-hover:opacity-100 
                            max-md:group-focus:opacity-100 
                            
                            transition-opacity duration-300
                        ">
                            <Lottie
                                animationData={lockAnim}
                                loop
                                autoplay
                                className="w-64 h-64 max-xl:w-36 max-xl:h-36"
                            />
                        </div>
                    </div>

                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4">
                        Freelancers
                    </h3>
                    <p className="text-muted-foreground mt-2 text-lg max-md:text-md max-sm:text-sm">
                        Lock funds to prove commitment. If work is abandoned, the funds are transferred to the client as compensation.
                    </p>
                </div>

                {/* Client Card */}
                <div
                    tabIndex={0}
                    className="
                        group relative 
                        bg-secondary rounded-xl p-6 flex flex-col 
                        transition-all duration-300 ease-out cursor-pointer
                        hover:scale-102 max-md:focus:scale-102 max-md:focus:outline-none
                    "
                >
                    <div className="flex justify-center items-center relative rounded-xl overflow-hidden">
                        {/* Original Animation (Client) */}
                        <Lottie
                            animationData={clientAnim}
                            loop
                            autoplay
                            className="w-120 h-120 max-xl:w-72 max-xl:h-72"
                        />

                        <div className="
                            absolute inset-0 
                            backdrop-blur-sm bg-secondary/70 
                            flex justify-center items-center 
                            rounded-xl

                            opacity-0 
                            group-hover:opacity-100 
                            max-md:group-focus:opacity-100 
                            
                            transition-opacity duration-300
                        ">
                            <Lottie
                                animationData={lockAnim}
                                loop
                                autoplay
                                className="w-64 h-64 max-xl:w-36 max-xl:h-36"
                            />
                        </div>
                    </div>

                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4">
                        Clients
                    </h3>
                    <p className="text-muted-foreground mt-2 text-lg max-md:text-md max-sm:text-sm">
                        Pay upfront to secure the deal. If commitments aren’t met, funds are released to the worker.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;