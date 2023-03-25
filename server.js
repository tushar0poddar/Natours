const dotenv = require('dotenv');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

dotenv.config({path: './config.env'});

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(() => {
    console.log("DB connection successful!!!");
})

const tourSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Name of the tour is required'],
        unique:true
    },
    rating: {
        type:Number,
        default:4.3
    },
    price: {
        type:Number,
        required:[true, 'A tour must have a name']
    }
})

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: "Shimla",
    price: 50000
})

testTour.save().then(doc =>{
    console.log(doc);
}).catch(err =>{
    console.log("Error!! ", err);
})

app.listen(process.env.PORT, ()=>{
    console.log("server is running on port 4000");
});