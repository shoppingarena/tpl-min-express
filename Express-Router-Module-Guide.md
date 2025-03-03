# Express Router Module Guide

## express.Router()

- is class to create modular, mountable route handlers
- Router instance is complete middleware and routing system
- it is often referred as "mini-app", from Express guide

### The next example creates a router as a module

- loads a middleware function in it
- defines some routes
- mounts the router module on a path in the main app

Create a router file named  [get-router-module.mjs](./server/get-router-module.mjs)

```js
import express from 'express'

const router = express.Router()
```

### Midlleware callback function examples

`Single Midlleware`

Define and **mount** middleware function **locally**

```js
app.use((req, res, next) => {
    next()
})
```

Router is valid **middleware**

```js
const router = express.Router()
router.get('/', (req, res, next) => {
    next()
})
app.use(router)
// or if you want to create domain router middleware
const domain = express.Router()
domain.get('/', (req, res, next) => {
    next()
})
app.use(domain)
```

Express **app** is valid middleware

```js
const registerDomain-subApp = express()
registerDomain-subApp.get('/', (req, res, next) => {
    next()
})
app.use(registerDomain-subApp)
```

`Series of Middleware`

You can specify more than one middleware function at the same **mount path**

```js
const domain = express.Router()
domain.get ('/domain', (req,res,next) => {
    res.render('domain', { title: 'Domain' }
}, (req, res, next) => {
    next()
})
const searchDomain = express.Router()
searchDomain.post('/search-domain', (req, res, next) => {
    const domain-name = req.body.name
    res.render('search-domain', { title: 'Search Domain' }
}, (req, res, next) => {
    next()
})

const buyDomain = express.Router()
buyDomain.post('/buy-domain', (req, res, next) => {
    const domain-name = req.body.name
    res.render('buy-domain', { title: 'Buy Domain' }
}, (req, res, next) => {
    next()
})
//Series of Middleware
app.use(domain, searchDomain, buyDomain)
```

Equivalent to:

```js
app.use(domain)
app.use(searchDomain)
app.use(buyDomain)

//Arrya of Middleware, you can use as Dynamic middlerware
app.use([domain, searchDomain, buyDomain])

/* There is no difference between series and arrya of middleware, but array of middleware is more readable and easier to manage. */

const middlewares = [middleware1, middleware2, middleware3];
app.use(middlewares);

```

#### Example of `Dynamic` Middleware

In this example, the middlewares applied to the app depend on the NODE_ENV environment variable.How It Works:

1. In development (NODE_ENV=development)
Only logger middleware runs.
2. In production (NODE_ENV=production)
Both logger and auth middleware run.
If the request doesn’t have the correct Authorization header, it returns 403 Forbidden.

```js
import express from 'express';

const app = express();

// Define middlewares
const logger = (req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.url}`);
  next();
};

const auth = (req, res, next) => {
  if (req.headers.authorization === 'secret-token') {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};

// Dynamically select middlewares
const middlewares = process.env.NODE_ENV === 'production' ? [logger, auth] : [logger];

// Apply middlewares dynamically
app.use(middlewares);

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

Why Use Dynamic Middleware?
✅ You can enable or disable middleware based on conditions (e.g., environment, user roles, settings).
✅ Useful for feature toggles, API versioning, or performance optimizations.

#### EXAMPLE Middleware Based on User Role

If you’re building an admin panel, you might only allow admin users to access certain routes:

```js
const isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    next();
  } else {
    res.status(403).send('Admins only');
  }
};

// Apply middleware dynamically
const adminMiddlewares = [auth, isAdmin]; 

app.use('/admin', adminMiddlewares, (req, res) => {
  res.send('Welcome Admin');
});

```

## EXEMPLE Applying Dynamic Middleware to Routes

```js
import express from 'express';

const app = express();

app.use(authMiddleware); // Apply authentication globally

// Public route (no authorization required)
app.get('/', (req, res) => {
  res.send('Public route');
});

// Protected route (only for logged-in users)
app.get('/profile', (req, res) => {
  res.send(`Hello, ${req.user.username}`);
});

// Admin-only route
app.get('/admin', authorize(['admin']), (req, res) => {
  res.send('Welcome, Admin!');
});

// Moderator & Admin can access
app.get('/moderate', authorize(['admin', 'moderator']), (req, res) => {
  res.send('Moderation panel');
});

app.listen(3000, () => console.log('Server running on port 3000'));

```

### Why Use Dynamic Middleware?

- Scalability → Easily add/remove roles without changing route logic.
- Security → Prevent unauthorized users from accessing sensitive data.
- Flexibility → Can support multiple user types and permissions dynamically.
