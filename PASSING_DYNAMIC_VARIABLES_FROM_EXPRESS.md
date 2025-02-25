# Passing Dynamic Variebles from Express Backend

## Example

In your Express.js route, you can pass the iconNames dynamically based on conditions (like user role, authentication status, etc.).

```js
app.get('/', (req, res) => {
    // Example dynamic icons
    const iconNames = "home,menu,login,logout";
    res.render('index', { iconNames });
});
```

### Benefits of this Approach

- Dynamic Rendering: Every time you request the page, the icon list is dynamically injected into the navbar.
- Code Reusability: You can reuse the navbar.pug partial in multiple pages without duplicating code.
- Customizability: By passing iconNames from the backend, you can adjust which icons show up based on user state or other conditions.

### Additional Considerations

- Default Icons: If no iconNames are provided from the route, the default icons will be used.
- User-specific Icons: If you want user-specific icons (e.g., admin gets different icons), simply modify the iconNames value dynamically based on the authenticated user.
