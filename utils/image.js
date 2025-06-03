import Cookies from "js-cookie";

export async function uploadImage(file) {
    try {
        // Step 1: Get auth parameters from your API
        const authRes = await fetch(`${process.env.NEXT_PUBLIC_ADDRESS}/api/image/auth`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'x-auth-token': Cookies.get("loggedIn") || "",
            },
        }
        );
        const auth = await authRes.json();        

        // Step 2: Prepare FormData
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);
        formData.append("token", auth.data.token);
        formData.append("expire", auth.data.expire);
        formData.append("signature", auth.data.signature);
        formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY);

        // Step 3: Upload to ImageKit
        const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
            method: "POST",
            body: formData,
        });

        const result = await uploadRes.json();

        if (uploadRes.ok) {
            return { success: true, data: result };
        } else {
            return { success: false, error: result.message };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}
