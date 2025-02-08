# TailwindCss Configuration

## Steps to configure TailwindCss in a project

1. Install TailwindCss
`pnpm add tailwindcss`
2. Install @tailwindcss/cli
3. Start the Tailwind CLI build process
Run the CLI tool to scan your source files for classes and build your CSS.
pnpx @tailwindcss/cli -i ./static/input.css -o ./static/output.css --watch
**This solve the issue with not working CDN TailwindCss**

### Recap of the Problem

You're trying to load the tailwindcss CSS file from <http://localhost:3000/static/tailwindcss>.
The server is responding with a 404 Not Found error.
The server is returning text/html instead of text/css.
You've installed tailwindcss using pnpm add tailwindcss.
You've imported tailwindcss inside styles.css with @import "tailwindcss".

### Analysis and Troubleshooting

The issue is still that the server cannot locate the tailwindcss file. You need to set it up in a different way. The steps you took were not sufficient to create the tailwindcss file that the browser needs.

pnpm add tailwindcss: This command correctly adds the tailwindcss package to your project's node_modules directory. This makes Tailwind's JavaScript code available for you to use within your project. However, it does not generate the static CSS file that the browser can directly request. This is only the first part.
@import "tailwindcss" in styles.css: This is where the misunderstanding occurs. The @import directive in CSS is used to include other CSS files. But:
It doesn't magically generate the Tailwind CSS. It simply tells the browser, "Hey, go find another CSS file called tailwindcss."
tailwindcss is not a CSS file in node_modules: The tailwindcss package in node_modules is a collection of JavaScript modules. It contains the logic to generate the CSS, but it's not the CSS itself.
It needs a build process: You need a build process that uses the Tailwind CSS JavaScript package to generate the actual CSS.
It must be imported from the node_modules folder If you use @import "tailwindcss" it will search it at the same folder as the styles.css file.
