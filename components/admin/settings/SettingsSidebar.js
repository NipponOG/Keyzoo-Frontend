export default function SettingsSidebar({
    active,
    onChange,
}) {
    const items = [
        {
            key: "profile",
            label: "Profile",
        },
        {
            key: "security",
            label: "Security",
        },
        {
            key: "preferences",
            label: "Preferences",
        },
    ];

    return (
        <div
            className="
                rounded-3xl
                border
                border-white/10
                p-4
            "
        >
            {items.map((item) => (
                <button
                    key={item.key}
                    onClick={() => onChange(item.key)}
                    className={`
                        mb-2
                        w-full
                        rounded-xl
                        p-4
                        text-left
                        transition
                        ${active === item.key
                            ? "bg-[#1a1a1a] text-white"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }
                    `}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}