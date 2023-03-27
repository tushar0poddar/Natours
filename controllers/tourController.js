const Tour = require('../models/tour-model')

exports.getAllTours = async (req,res)=>{
    try{
        const tours = await Tour.find()
        res.status(200).json({
            status: "success",
            result: tours.length,
            data: {tours}
        })
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }

}

exports.getATour = async (req, res)=> {
    try{
        const tour = await Tour.findById(req.params.id);
        //Tour.findOne({_id: req.params.id})

        res.status(200).json({
            status: "success",
            data: {tour}
        })
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
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

exports.updateATour = async (req, res) => {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: "success",
            data: {tour}
        })
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteATour = async(req, res) => {
    try{
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "success",
            data: {
                tour: null
            }
        })
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}
