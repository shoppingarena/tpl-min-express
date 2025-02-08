# This is not minimnal template for Express.js Server with type:module

**Purpose of this repository is to practise simple Authentication.**
>> [https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API]

## This is monorepo for practise with some subprojects

### Subprojects are in  packages/ directory

Subprojects:

- [Default project packages/auth-service](./packages/auth-service/)
- [LandingPage](./packages/landingpage/)
- [PLAYWRIGHT](./packages/playwright/)

**WebAuthn** ( Web Authentication API ) is extention of **Credential Managment API**

- I use pnpm package manager
- .gitignore file is included
- I use Pug template engine >> [PUG-TEMPLATE-ENGINE.md](PUG-TEMPLATE-ENGINE.md)
- I use Consolidate to use React as template engine

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

#### Content Negotiation

- **proactive**, where the
   server selects the representation based upon the user agent's stated
   preferences
- **reactive**, where the server provides a
   list of representations for the user agent to choose from
- conditional content
- active content

## Request Methods

+---------+-------------------------------------------------+-------+
   | Method  | Description                                     | Sec.  |
   +---------+-------------------------------------------------+-------+
   | GET     | Transfer a current representation of the target | 4.3.1 |
   |         | resource.                                       |       |
   | HEAD    | Same as GET, but only transfer the status line  | 4.3.2 |
   |         | and header section.                             |       |
   | POST    | Perform resource-specific processing on the     | 4.3.3 |
   |         | request payload.                                |       |
   | PUT     | Replace all current representations of the      | 4.3.4 |
   |         | target resource with the request payload.       |       |
   | DELETE  | Remove all current representations of the       | 4.3.5 |
   |         | target resource.                                |       |
   | CONNECT | Establish a tunnel to the server identified by  | 4.3.6 |
   |         | the target resource.                            |       |
   | OPTIONS | Describe the communication options for the      | 4.3.7 |
   |         | target resource.                                |       |
   | TRACE   | Perform a message loop-back test along the path | 4.3.8 |
   |         | to the target resource.                         |       |
   +---------+-------------------------------------------------+-------+

// CONTINUE HERE <https://datatracker.ietf.org/doc/html/rfc7231#section-4.3.3>

## <https://datatracker.ietf.org/doc/html/rfc7234> - HTTP Caching
