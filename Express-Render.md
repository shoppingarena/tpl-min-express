# Understanding Render and View in Express.js server

res.render(view [, locals] [, callback])

- **view argument** is a string that is the file path of the view file to render.
 If the path does not contain a file extension, then the view engine setting determines the file extension.

"The view argument performs file system operations like reading a file from disk and evaluating Node.js modules, and as so for security reasons should not contain input from the end-user."
