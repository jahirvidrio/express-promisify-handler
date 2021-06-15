# Express promisify handler

An express handlers promises support.

# Installation
```bash
npm install express-promisify-handler
```

# Examples

```js
const express = require('express');
const promisify = require('express-promisify-handler');
const axios = require('axios');

const app = express();


app.get('/', promisify(async (req, res)) => {
  const user = await axios.get('https://api.domain.com/users/1');
  res.json(user);
});
```

It’s important to ensure that Express catches all errors that occur while running route handlers and middleware.
Errors that occur in synchronous code inside route handlers and middleware require no extra work. If synchronous
code throws an error, then Express will catch and process it in *yor error handler*

```js
// your error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

// your handler errors generator
app.get('/', function (req, res) {
  throw new Error('BROKEN') // Express will catch this on its own.
});
```

Unfortunately, express doesn't catch error in handlers and middleware that return a Promise. For example:
```js
app.get('/user/:id', async function (req, res, next) {
  var user = await getUserById(req.params.id)
  res.send(user)
});
```

Previous code returns in a console dirt. For example:
```
(node:22384) UnhandledPromiseRejectionWarning: AxiosError: Connection refused
    at Object.<anonymous> (......)
    at Generator.throw (<anonymous>)
    at rejected (....)
(Use `node --trace-warnings ...` to show where the warning was created)
(node:22384) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)(node:22384) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

# Solution
Using express-promisify-handler forces to express to catch error in yor error handler
