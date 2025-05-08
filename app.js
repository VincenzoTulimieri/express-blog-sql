// express
const express = require('express');
const app = express();
const port = 3000;

// router
const postsRouter = require('./routers/postsRouter.js');

// importazione middlewares
const notFound = require('./middlewares/notFound.js')
const errorServer = require('./middlewares/errorsHandler.js')

// accesso per il client
app.use(express.static('public'));

// body-parse
app.use(express.json());

// utilizzo router
app.use('/posts', postsRouter);

// middlewares
app.use(errorServer)
app.use(notFound)


// server in attesa
app.listen(port,()=>{
    console.log(`Sono in attesa sulla porta ${port}`)
})