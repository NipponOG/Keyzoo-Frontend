import SettingsLayout from "@/components/admin/settings/SettingsLayout";
import ProfileSettings from "@/components/admin/settings/ProfileSettings";
import SecuritySettings from "@/components/admin/settings/SecuritySettings";
import PreferenceSettings from "@/components/admin/settings/PreferenceSettings";

import AdminRouteGuard from "@/components/admin/AdminRouteGuard";

export default function SettingsPage() {
    return (
        <AdminRouteGuard>

            <SettingsLayout
                profile={<ProfileSettings />}
                security={<SecuritySettings />}
                preferences={<PreferenceSettings />}
            />

        </AdminRouteGuard>
    );
}