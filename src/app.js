const express = require('express');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const verifyUserFields = require('./middlewares/verifyUserFields');
const validateJWT = require('./auth/validateJWT');
const { verifyBlogPostFields } = require('./middlewares/verifyBlogPostFields');
const blogPostController = require('./controllers/blogPostController');

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
app.post('/categories', validateJWT, categoryController.createCategory);
app.post('/post', validateJWT, verifyBlogPostFields, blogPostController.createBlogPost);
app.get('/user/:id', validateJWT, userController.getByUserId);
app.get('/user', validateJWT, userController.getAllUsers);
app.get('/categories', validateJWT, categoryController.getAllCategories);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
