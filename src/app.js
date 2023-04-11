const express = require('express');
const userController = require('./controllers/userController');
const verifyUserFields = require('./middlewares/verifyUserFields');
const validateJWT = require('./auth/validateJWT');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...
app.post('/login', userController.createLogin);

app.post('/user', verifyUserFields, userController.createUser);

app.get('/user/:id', validateJWT, userController.getByUserId);

app.get('/user', validateJWT, userController.getAllUsers);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
