# PUG Template engine

I chose this template because I already practiced react.js

- [Here is Babel plugin to transpile pug templates to jsx](<https://github.com/pugjs/babel-plugin-transform-react-pug>)

**Difference between res.send and res.render in Express.js**
In Express.js, both `res.send()` and `res.render()` are methods used to send a response to the client, but they serve different purposes and are used in different contexts. Here’s a breakdown of each:

## res.send()

Purpose: Sends a plain response back to the client. It could be text, HTML, JSON, or anything else.
Use case: When you don’t need to render a template but want to send simple data.

Examples:

- Sending JSON:

```js
app.get('/json', (req, res) => {
    res.send({ message: 'Hello, JSON!' });
});
```

## res.render()

Purpose: Renders a view/template file (e.g., a Pug template) and sends the rendered HTML back to the client.
Use case: When you want to dynamically generate HTML using a template engine like Pug, EJS, etc.

Examples:

- The example.pug file:

```pug
doctype html
html
  head
    title= title
  body
    h1= message
```

- Rendering a Pug template:

```js
app.set('view engine', 'pug'); // Set Pug as the view engine
app.set('views', './views'); // Set the folder containing the Pug templates

app.get('/render', (req, res) => {
    res.render('example', { title: 'My Page', message: 'Hello, dynamic Pug!' });
});
```

- Output:

```html
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello, dynamic Pug!</h1>
  </body>
</html>

```
