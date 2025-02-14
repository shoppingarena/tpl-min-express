# Route Protection Table

Route       Method      Needs Authentication? Why?
/register   POST        ❌ No Users register without authentication.
/login      POST        ❌ No Users log in without authentication.
/refresh    POST        ❌ No Users refresh access tokens when expired.
/logout     POST        ✅ Yes Only logged-in users should log out.
/home       GET         ✅ Yes Home should only be accessible to authenticated users.
/profile    GET         ✅ Yes Profile data should only be available to the logged-in user.
/settings   GET/POST    ✅ Yes Users must be authenticated to change settings.
/admin      GET         ✅ Yes (with role check) Only admins should access admin routes.

[https://restfulapi.net/http-status-codes/]
[https://developer.mozilla.org/en-US/docs/Web/HTTP/Status]
[https://en.wikipedia.org/wiki/List_of_HTTP_status_codes]
