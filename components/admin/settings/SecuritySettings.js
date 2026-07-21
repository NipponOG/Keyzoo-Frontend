import SectionCard from "./SectionCard";
import { useEffect, useState } from "react";
import PasskeyList from "@/components/admin/passkey/PasskeyList";
import { getPasskeys, renamePasskey, deletePasskey } from "@/lib/passkey";
import RenamePasskeyModal from "@/components/admin/passkey/RenamePasskeyModal";
import DeletePasskeyModal from "@/components/admin/passkey/DeletePasskeyModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { changePassword } from "@/lib/auth";

export default function SecuritySettings() {

    const [passkeys, setPasskeys] = useState([]);
    const [loadingPasskeys, setLoadingPasskeys] = useState(true);
    const [selectedPasskey, setSelectedPasskey] = useState(null);
    const [deletePasskeyItem, setDeletePasskeyItem] = useState(null);
    const [deletingPasskey, setDeletingPasskey] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    const loadPasskeys = async () => {
        try {
            setLoadingPasskeys(true);

            const jwt = localStorage.getItem("jwt");

            const data = await getPasskeys(jwt);

            setPasskeys(data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoadingPasskeys(false);
        }
    };

    useEffect(() => {
        loadPasskeys();
    }, []);

    return (
        <div className="space-y-8">

            {/* <SectionCard
                title="Passkeys"
                description="Use Windows Hello, Face ID or a hardware security key to sign in without a password."
            >
                <button
                    className="
                        rounded-xl
                        bg-indigo-600
                        px-5
                        py-3
                        font-medium
                        text-white
                        transition
                        hover:bg-indigo-500
                    "
                >
                    Register Passkey
                </button>
            </SectionCard> */}

            {
                loadingPasskeys
                    ? (
                        <div className="text-gray-400">
                            Loading passkeys...
                        </div>
                    )
                    : (
                        <PasskeyList
                            passkeys={passkeys}
                            onRefresh={loadPasskeys}
                            onRename={(passkey) => {
                                setSelectedPasskey(passkey);
                            }}
                            onDelete={(passkey) => {
                                setDeletePasskeyItem(passkey);
                            }}
                        />
                    )
            }

            <SectionCard
                title="Password"
                description="Manage your account password."
            >
                <button
                    onClick={() => setShowChangePassword(true)}
                    className="
        rounded-xl
        border
        border-white/10
        px-5
        py-3
        text-white
    "
                >
                    Change Password
                </button>
            </SectionCard>

            <SectionCard
                title="Two-factor Authentication"
                description="Additional protection for your account."
            >
                <span className="text-gray-400">
                    Coming Soon
                </span>
            </SectionCard>

            <RenamePasskeyModal
                passkey={selectedPasskey}
                onClose={() => setSelectedPasskey(null)}
                onSave={async (deviceName) => {

                    try {

                        const jwt = localStorage.getItem("jwt");

                        await renamePasskey(
                            jwt,
                            selectedPasskey.documentId,
                            deviceName
                        );

                        setSelectedPasskey(null);

                        await loadPasskeys();

                    } catch (err) {
                        alert(err.message);
                    }

                }}


            />

            <DeletePasskeyModal
                passkey={deletePasskeyItem}
                deleting={deletingPasskey}
                onClose={() => setDeletePasskeyItem(null)}
                onDelete={async () => {

                    try {

                        setDeletingPasskey(true);

                        const jwt = localStorage.getItem("jwt");

                        await deletePasskey(
                            jwt,
                            deletePasskeyItem.documentId
                        );

                        setDeletePasskeyItem(null);

                        await loadPasskeys();

                    } catch (err) {

                        alert(err.message);

                    } finally {

                        setDeletingPasskey(false);

                    }

                }}
            />

            <ChangePasswordModal
                open={showChangePassword}
                loading={changingPassword}
                onClose={() => setShowChangePassword(false)}
                onSave={async ({
                    currentPassword,
                    newPassword,
                    confirmPassword,
                }) => {

                    if (newPassword !== confirmPassword) {
                        return alert("Passwords do not match.");
                    }

                    try {

                        setChangingPassword(true);

                        const jwt = localStorage.getItem("jwt");

                        await changePassword(
                            jwt,
                            currentPassword,
                            newPassword
                        );

                        setShowChangePassword(false);

                        alert("Password changed successfully.");

                    } catch (err) {

                        alert(err.message);

                    } finally {

                        setChangingPassword(false);

                    }

                }}
            />

        </div>
    );
}