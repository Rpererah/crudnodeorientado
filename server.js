const express = require('express');
const bodyParser=require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/UserRoutes');

const app =express()
const port = 8000;
app.use(bodyParser.json())
app.use(cors());
app.use('/users', userRoutes);


app.listen(port,()=>{
    console.log(`server is running on the port ${port}`);
})