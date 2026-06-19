"use client";

import { useEffect, useState } from "react";
import { FiChevronUp } from "react-icons/fi";

const ScrollToTopButton = () => {

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {

        const handleScroll = () => {

            if (window.scrollY > 400) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    const scrollToTop = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`
                fixed
                bottom-6
                right-6
                z-[999]
                w-15
                h-15
                rounded-full
                bg-[#2a2a2a]
                border
                border-white/10
                shadow-lg
                flex
                items-center
                justify-center
                text-white
                transition-all
                duration-300
                hover:bg-[#1a1a1a]
                hover:scale-110
                ${showButton
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5 pointer-events-none"
                }
            `}
        >
            <FiChevronUp size={24} />
        </button>
    );
};

export default ScrollToTopButton;