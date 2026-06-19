import { useState, useRef } from "react";
import { useFloating, offset, flip, shift, autoUpdate, FloatingPortal, arrow } from "@floating-ui/react";

export default function HoverCard({ title, children }) {

    const [open, setOpen] = useState(false);
    const arrowRef = useRef(null);
    let timeout;

    const isLongTitle = title.length > 100;

    const openTooltip = () => {
        timeout = setTimeout(() => {
            setOpen(true);
        }, 50);
    };

    const closeTooltip = () => {
        clearTimeout(timeout);
        setOpen(false);
    };

    const { refs, floatingStyles, middlewareData, placement } = useFloating({
        open,
        onOpenChange: setOpen,
        placement: "top", // default like Driffle
        middleware: [
            offset(10),
            flip(),
            shift({ padding: 8 }),
            arrow({ element: arrowRef })
        ],
        whileElementsMounted: autoUpdate
    });

    return (
        <>
            {/* Trigger */}
            <span
                ref={refs.setReference}
                onMouseEnter={openTooltip}
                onMouseLeave={closeTooltip}
                className="inline-block"
            >
                {children}
            </span>

            {/* 🔥 PORTAL FIX */}
            {open && (
                <FloatingPortal>
                    <div
                        ref={refs.setFloating}
                        style={floatingStyles}
                        className="z-[9999] w-[300px] rounded-lg bg-[#1c1c1e]/95 backdrop-blur-md border border-white/10 shadow-black/40 px-4 py-3 text-sm text-white pointer-events-none transition-opacity duration-150">
                        {/* 🔺 ARROW */}
                        <div
                            ref={arrowRef}
                            className="absolute w-2.5 h-2.5 bg-[#1c1c1e]/95 rotate-45 border-r border-b border-white/10"
                            style={{
                                left: middlewareData.arrow?.x ?? "",
                                top: middlewareData.arrow?.y ?? "",
                                [placement.startsWith("top") ? "bottom" : "top"]: "-4px",
                            }}
                        />
                        <p className="leading-snug line-clamp-3">
                            {title}
                        </p>
                    </div>
                </FloatingPortal>
            )}
        </>
    );
}
