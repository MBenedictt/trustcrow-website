import Image from "next/image";
import Link from "next/link";

const footerLinks = [
    {
        title: "Solutions",
        items: [
            { label: "Home", href: "#home" },
            { label: "How It Works", href: "#howitworks" },
            { label: "Create Quotation", href: "/dashboard" },
        ],
    },
    {
        title: "Company",
        items: [
            { label: "Features", href: "#features" },
            { label: "Why Us", href: "#whyus" },
            { label: "FAQ", href: "#faq" },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="border-t bg-background px-10 py-10 xl:px-16 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Top Section */}
                <div className="grid lg:grid-cols-3 gap-8 mb-8">

                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="flex items-center gap-2 mb-4 text-2xl max-sm:text-xl font-extrabold text-[#286763]"
                        >
                            <Image
                                src="/trustcrow-icon.png"
                                alt="TrustCrow Logo"
                                width={28}
                                height={28}
                            />
                            TrustCrow
                        </Link>

                        <p className="text-md text-muted-foreground max-w-xs">
                            A smarter way to build trust in every deal.
                        </p>
                    </div>

                    {/* Links */}
                    {footerLinks.map((col) => (
                        <div key={col.title}>
                            <h4 className="text-lg font-bold mb-4">
                                {col.title}
                            </h4>

                            <ul className="space-y-2">
                                {col.items.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>

                {/* Bottom Section */}
                <div className="border-t pt-8 flex justify-center items-center">
                    <p className="text-sm text-center font-semibold text-[#286763]">
                        © {new Date().getFullYear()} TrustCrow. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
