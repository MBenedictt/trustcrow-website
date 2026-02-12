import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

interface Faq1Props {
    heading?: string;
    items?: FaqItem[];
}

const Faqs = ({
    heading = "Frequently Asked Questions.",
    items = [
        {
            id: "faq-1",
            question: "How does TrustCrow protect both freelancers and clients?",
            answer:
                "TrustCrow uses a two-way commitment system. Clients pay upfront and funds are locked in escrow, while workers lock a commitment fund. If either party fails to meet their obligations or ghosts the deal, the smart contract automatically compensates the affected party.",
        },
        {
            id: "faq-2",
            question: "Why does TrustCrow require freelancers to lock funds?",
            answer:
                "TrustCrow is designed to protect not only money, but also time. By locking a commitment fund, freelancers signal serious intent to complete the work. If a freelancer fails to deliver a milestone before the agreed deadline and does not request an extension, it will be recognized as a ghost deal and the locked fund is transferred to the client as compensation for lost time and opportunity.",
        },
        {
            id: "faq-3",
            question: "When and how are payments released?",
            answer:
                "Payments are released per milestone. After a worker submits completed work, the client reviews and approves it. If there is no response from the client within 7 days of submission, the smart contract automatically releases the payment for the completed milestone and returns the remaining balance to the client. This process repeats until all milestones are completed.",
        },
        {
            id: "faq-4",
            question: "Do I need blockchain or crypto knowledge to use TrustCrow?",
            answer:
                "No. TrustCrow is designed to feel like a regular invoicing and payment platform. All blockchain and smart contract processes run in the background, so users can focus on their work and collaboration without needing technical or crypto expertise.",
        },
    ],
}: Faq1Props) => {
    return (
        <section id="faq" className="w-full py-12 bg-background px-10 lg:px-8 flex xl:px-16 justify-center">
            <div className="container mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20">

                {/* Heading Section */}
                <div className="w-full lg:w-4/12">
                    <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-foreground">
                        {heading}
                    </h1>
                </div>

                {/* Accordion Section */}
                <div className="w-full lg:w-8/12">
                    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                        {items.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left font-medium text-gray-800 hover:no-underline text-lg max-sm:text-base py-4 cursor-pointer">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed text-base max-sm:text-sm pb-4 leading-relaxed">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

            </div>
        </section>
    );
};

export { Faqs };