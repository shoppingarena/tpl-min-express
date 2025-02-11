document.addEventListener('DOMContentLoaded', function (event) {
    const form = document.getElementById('register');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const formData = new FormData(form);

        // Debug: Log form data before sending
        for (const pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }

        try {
            const response = await fetch("/register", {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data); // Debug: Log the response data
            if (response.ok) {
                window.location.href = data.redirect; // Redirect on successto the specified URL
            } else {
                if (errorMessage) {
                    console.log(errorMessage)
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = data.message; // Show error message from server
                }
            }
        } catch (error) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'An error occurred. Please try again.';
        }
    })
})