# EXPRESS-VALIDATOR MIDDLEWARE

[https://express-validator.github.io/docs]

## REQUIRES

Node.js 14+
Express.js 4.x

## Work with HTTP request object contain these properties

- req.body
- req.cookies
- req.header
- req.params
- req.query     : portion after ? in the HTTP request

## HANDLING VALIDATION ERRORS

Express-validator uses **validatorResults function** to collect and validate request field

Example

```js
import { query, body, validationResult } from 'expres-validator'

app.post('/send-email',


)
```

## Validation chain = method chaining are also middleware functions

Validaion chain has three kind of methods:

- validators    : check if request field is valid
- sanitizers    : transofrm field value
- modifiers     : define behave of validation chain

Example:

```js
app.post(
  '/newsletter',
  // For the `email` field in `req.body`...
  body('email')
    // ...mark the field as optional
    .optional()
    // ...and when it's present, trim its value, then validate it as an email address
    .trim()
    .isEmail(),
  maybeSubscribeToNewsletter,
);
```

### [Standard validators](https://express-validator.github.io/docs/api/validation-chain/#standard-validators)

#### is Email

```js
isEmail(options?: {
  allow_display_name?: boolean;
  allow_underscores?: boolean;
  allow_utf8_local_part?: boolean;
  require_tld?: boolean;
  ignore_max_length?: boolean;
  allow_ip_domain?: boolean;
  domain_specific_validation?: boolean;
  blacklisted_chars?: string;
  host_blacklist?: string[];
  host_whitelist?: string[];
}): ValidationChain
```
