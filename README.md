# This is minimnal template for Express.js Server with type:module

- I use pnpm package manager
- .gitignore file is included

## <https://datatracker.ietf.org/doc/html/rfc7231> - HTTP Semantics and Content

### Representation is name for abstraction for the purpose of HTTP protocol

- representation is information

#### Representation Metadata

### Header fields

- Content-Type
- Content-Encoding
- Content-Language
- Content-Location

**Representation header fields provide metadata about the
   representation.  When a message includes a payload body, the
   representation header fields describe how to interpret the
   representation data enclosed in the payload body.  In a response to a
   HEAD request, the representation header fields describe the
   representation data that would have been enclosed in the payload body
   if the same request had been a GET.**

### Representation Data

Data type of representation data is determined via the header fields:

- Content-Type
- Content-Encoding

### Payload Semantics

#### Payload Header Fields

- Content-Length
- Content-Range
- Trailer
- Transfer-Encoding

## <https://datatracker.ietf.org/doc/html/rfc7234> - HTTP Caching
