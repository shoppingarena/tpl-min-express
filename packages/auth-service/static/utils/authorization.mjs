// Function to check if a token exists in cookies
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
}

// Check for accessToken before making the request
const token = getCookie("token");
console.log("Access Token:", token);
if (!token) {
    console.warn("No access token found! Redirecting to login...");
    window.location.href = "/login";
} else {
    // Fetch the /admin route only if the token exists
    fetch("/admin", { method: "GET", credentials: "include" })
        .then(response => response.json())
        .then(data => {
            console.log("Response Data:", data);

            // If the server sends a redirect response, navigate to /login
            if (data.redirect) {
                window.location.href = data.redirect;
            }
        })
        .catch(err => console.error("Error fetching /admin:", err));
}
