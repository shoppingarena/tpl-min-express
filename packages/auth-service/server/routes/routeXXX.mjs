// 401 - Unauthorized - route
import express from 'express'
import { title } from 'process'

const routeXXX = express.Router()

routeXXX.get('/401', (req, res) => {

    res.status(401).render('status', { title: '401 - Unauthorized', message: 'You are not authorized to view this page, when authentication is required and has failed or has not yet been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource. ' })

})
routeXXX.get('/403', (req, res) => {
    res.status(403).render('status', { title: '403 - Client Error - Forbidden', message: `Unauthorized request. The client does not have access rights to the content. Unlike 401, the client’s identity is known to the server.` })
})
routeXXX.get('/404', (req, res) => {
    res.status(403).render('status', { title: '404 - Not Found', message: 'The server can not find the requested resource,but may be available in the future' })
})
routeXXX.get('/405', (req, res) => {
    res.status(405).render('status', {
        title: '405 - Method not Allowed', message: `The server knows the request method, but the target resource doesn't support this method.The server must generate an Allow header in a 405 response with a list of methods that the target resource currently supports.`
    })
})

export default routeXXX

/* 200 OK
Title: OK
Message: The request has succeeded.

201 Created
Title: Created
Message: The request has been fulfilled, and a new resource has been created.

400 Bad Request
Title: Bad Request
Message: The server could not understand the request due to invalid syntax.

401 Unauthorized
Title: Unauthorized
Message: Access denied.

403 Forbidden
Title: Forbidden
Message: You do not have permission to access this resource.

404 Not Found
Title: Not Found
Message: The requested resource could not be found.

500 Internal Server Error
Title: Internal Server Error
Message: The server encountered an internal error and could not complete your request.

502 Bad Gateway
Title: Bad Gateway
Message: The server received an invalid response from the upstream server.

503 Service Unavailable
Title: Service Unavailable
Message: The server is not ready to handle the request.
*/