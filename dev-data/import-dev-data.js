const fs = require('fs');
const dotenv = require('dotenv');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const Tour = require('../models/tour-model');

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(() => {
    console.log("DB connection successful!!!");
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8'));

const importData = async()=>{
    try {
        await Tour.create(tours);
        console.log("Data successfully imported");
    } catch (err) {
        console.log(err);
    }
    process.exit();
};
const deleteData = async()=>{
    try {
        await Tour.deleteMany();
        console.log("Data successfully deleted");
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
}