// sendEmailInfo.mjs
import fetch from 'fetch';
import { FormData } from 'form-data';
import url from 'url';

document.addEventListener('DOMContentLoaded', function (event) {
    const form = document.getElementById('sendEmail');
    const errorMessage = document.getElementById('email-error-message');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Get values from form elements
        const formData = new FormData(form);

        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                body: JSON.stringify({
                    to: encodeURIComponent(formData.get('to')),
                    subject: encodeURIComponent(formData.get('subject')),
                    text: formData.get('text')
                })
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = data.redirect; // Redirect based on server response
            } else {
                if (errorMessage) {
                    errorMessage.textContent = data.message || 'An error occurred. Please try again.';
                    errorMessage.style.display = 'block';
                }
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessage.textContent = 'An error occurred while sending the email. Please try again.';
            errorMessage.style.display = 'block';
        }
    });
});