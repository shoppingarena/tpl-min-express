# Conditinal Rendering

## Conditionally Render Elements in Pug

Once the user data is passed to the template, you can conditionally render or update HTML elements based on whether user is defined.

Example

// admin.pug (or whatever template you are using)

```pug
doctype html
html
    head
        title Admin Page
    body
        // Display username if logged in
        if user
            p.welcome-message Welcome, #{user.username}!
            button#logout Logout
        else
            p Please log in to access the admin page.

        // The admin content
        .admin-content
            h1 Admin Panel
            // other admin elements go here
```
