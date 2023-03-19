const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const app = require('./app');

app.listen(process.env.PORT, ()=>{
    console.log("server is running on port 4000");
});