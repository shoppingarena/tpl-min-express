# REDIRECTING

## Redirecting Users after successful Registration

I'll help you with redirecting users to the /home route after successful registration.
Instead of using `res.render()`, you should use `res.redirect()`.
Here's how you can modify your registration route:

    ```js

    app.post('/register', async (req, res) => {
        try {
            // Your registration logic here (validate input, create user, etc.)
            await User.create({
                // user details from req.body
            });
            
            // After successful registration, redirect to home page
            res.redirect('/home');
        } catch (error) {
            // If there's an error, you might want to render the registration page again with an error message
            res.render('register', { 
                title: 'Register', 
                subtitle: 'Try to Create your account with a password again.',
                error: 'Registration failed'
            });
        }
    });
    ```

    ## How to Redirect User with a Message

    1. Option is to use res.status() and json() to send a message and a redirect URL to the frontend.
    The frontend javascript will handle the redirect a then display the message and redirect the user to the specified URL.

    ```js
    // Using res.status() and json()
    app.post('/register', (req, res) => {
        // After successful registration
        res.status(200).json({ 
            message: 'Registration successful', 
            redirect: '/home'
        });
    });

    // Frontend JavaScript to handle the redirect
    fetch('/register', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);  // Show message
        window.location.href = data.redirect;  // Redirect
    });

    ```

2. Option is using query parameters to pass the message and redirect URL.

    ```js

    // Backend
    res.redirect('/home?message=Registration+successful');

    // On home route
    app.get('/home', (req, res) => {
        const message = req.query.message;
        res.render('home', { message });
    });

    ```

Source: <https://claude.ai/chat/8d0128b4-c556-47eb-a77f-3d2c9138425a>
<https://chatgpt.com/c/67a234d7-3d60-8009-8439-4db54376b098>

## 2 React for Handling Fetch and Errors

In your React component, you will only handle the logic for form submission
and error handling without rendering the form itself.

    ```js

    import { useEffect, useState } from "react";

    export function useLogin() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Add event listener for form submission after component mounts
        const form = document.getElementById("loginForm");
        const errorMessage = document.getElementById("errorMessage");

        form?.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent page reload

        const formData = new FormData(form);
        setIsLoading(true);
        setError(null); // Reset previous error

        try {
            const response = await fetch("/login", {
            method: "POST",
            body: formData,
            });

            const data = await response.json();

            if (response.ok) {
            window.location.href = data.redirect; // Redirect on success
            } else {
            setError(data.message); // Set error message
            errorMessage.style.display = "block"; // Show error
            errorMessage.textContent = data.message; // Display error message
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
            errorMessage.style.display = "block";
            errorMessage.textContent = "Something went wrong. Please try again.";
        } finally {
            setIsLoading(false);
        }
        });

        // Clean up event listener on component unmount
        return () => {
        form?.removeEventListener("submit", () => {});
        };
    }, []);

    return { error, isLoading };
    }

    ```

## 3. Add Javascript for Handling Fetch Requests

    ```js
    document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);

    try {
      const response = await fetch("/login", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.redirect; // Redirect on success
      } else {
        errorMessage.style.display = "block";
        errorMessage.textContent = data.message; // Show error message
      }
    } catch (error) {
      errorMessage.style.display = "block";
      errorMessage.textContent = "Something went wrong. Please try again.";
    }
  });
});

    ```

### Setup | Modife Pug form Template

to include error message container and script to handle form submission

    ```pug
    doctype html
    html
    head
        title Login
        script defer src="/js/login.js" // Include external JS file for handling form
    body
        form(id="loginForm", method="POST")
        input(type="text", name="username", placeholder="Username", required)
        input(type="password", name="password", placeholder="Password", required)
        button(type="submit") Login
        p#errorMessage(style="color: red; display: none;") // Error message placeholder

    ```

### Express Backend to handle Login errors properly

    ```js
    // response for invalid username or password
    if (!user || user.password !== password)
    return res.status(400).json({ message: "Invalid username or password." });

    // response for successful login
    res.status(200).json({ redirect: "/dashboard" });
    // or
    return.

    ```
