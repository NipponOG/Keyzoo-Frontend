import { useState } from "react";

import SettingsSidebar from "./SettingsSidebar";

export default function SettingsLayout({
    profile,
    security,
    preferences,
}) {
    const [active, setActive] = useState("security");

    return (
        <div className="mx-auto max-w-7xl">

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-white">
                    Settings
                </h1>

                <p className="mt-2 text-gray-400">
                    Manage your account, security and preferences.
                </p>

            </div>

            <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

                <SettingsSidebar
                    active={active}
                    onChange={setActive}
                />

                <div>

                    {active === "profile" && profile}

                    {active === "security" && security}

                    {active === "preferences" &&
                        preferences}

                </div>

            </div>

        </div>
    );
}