# Understanding Render and View in Express.js server

res.render(view [, locals] [, callback])

- **view argument** is a string that is the file path of the view file to render.
 If the path does not contain a file extension, then the view engine setting determines the file extension.

"The view argument performs file system operations like reading a file from disk and evaluating Node.js modules, and as so for security reasons should not contain input from the end-user."

- **locals**, an object whose properties define local variables for the view.
"The locals object is used by view engines to render a response. The object keys may be particularly sensitive and should not contain user-controlled input, as it may affect the operation of the view engine or provide a path to cross-site scripting. Consult the documentation for the used view engine for additional considerations."

app.render(view, [locals], callback)
Think of app.render() as a utility function for generating rendered view strings. Internally res.render() uses app.render() to render views.

There was issue with __dirname because is not defined in ES module score.
Finally Orama ? in Nodejs.org helpe me to solve this issue,
with following code:

```mjs
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Directory name:', __dirname);

// Set the directory for the views
app.set('views', path.join(__dirname, 'server', 'views'));
```
