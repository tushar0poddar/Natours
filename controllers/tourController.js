const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkId = (req, res, next, val)=>{
    console.log(`id: ${val}`);
    
    if(1*req.params.id > tours.length){
        return res.status(404).json({
            status: "fail",
            message: "Invalid Id"
        })
    }

    next();
}

exports.checkBody = (req, res, next)=>{
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: "fail",
            message: "Bad request!!"
        })
    }

    next();
}

exports.getAllTours =  (req,res)=>{
    res.status(200).json({
        status: "success",
        result: tours.length,
        data: {tours}
    })
}

exports.getATour = (req, res)=> {
    const id = req.params.id *1;
    const tour = tours.find(el => el.id === id);
    res.status(200).json({
        status: "success",
        data: {tour}
    })
}

exports.createATour = (req, res)=>{
    const newId = tours[tours.length-1].id +1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);
    
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), err=>{
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    })
}

exports.updateATour = (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            tour: "updated tour here.."
        }
    })
}

exports.deleteATour = (req, res) => {
    res.status(204).json({
        status: "success",
        data: {
            tour: null
        }
    })
}
