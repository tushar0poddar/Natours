const Tour = require('../models/tour-model')

exports.getAllTours =  (req,res)=>{
    res.status(200).json({
        status: "success",
        // result: tours.length,
        // data: {tours}
    })
}

exports.getATour = (req, res)=> {
    res.status(200).json({
        status: "success",
    })
}

exports.createATour = async(req, res)=>{
    try{
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'Success',
            data: {
                tour: newTour
            }
        })
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
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
