export async function changePassword(
    jwt,
    currentPassword,
    newPassword
) {

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}api/admin-auth/change-password`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
            }),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            data.error?.message ||
            data.message ||
            "Unable to change password."
        );
    }

    return data;
}