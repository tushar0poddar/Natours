const Tour = require('../models/tour-model')

exports.aliasTopTours = (req, res, next) =>{
    req.query.limit = '5';
    req.query.sort = 'price,-ratingAverage';
    req.query.fields = 'name,price,ratingAverage,difficulty';
    next();
}

exports.getAllTours = async (req,res)=>{
    try{
        console.log(req.query);
        //Build Query
        //1A) Filtering
        const queryObj = {...req.query};
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);

        //2B) Advance Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, match=> `$${match}`);

        let query = Tour.find(JSON.parse(queryStr));

        //3) Sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy); 
        } else{
            query = query.sort('-createdAt');
        }

        //4) Fields Limiting
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else{
            query = query.select('-__v');
        }

        //5) Pagination:
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page -1)* limit;

        query = query.sort('_id').skip(skip).limit(limit);

        if(req.query.page){
            const numTours = await Tour.countDocuments();
            if(skip >= numTours)
            throw new Error('This page is not exists.');
        }

        //Execute Query
        const tours = await query;
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
