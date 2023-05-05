const Tour = require('../models/tour-model');
const ApiFeature = require('../utils/apiFeatures');
const AppError = require('../utils/appError');


// eslint-disable-next-line arrow-body-style
const catchAsync = fn =>{
    return (req, res, next)=>{
        fn(req, res, next).catch(next);
    }
}

exports.aliasTopTours = (req, res, next) =>{
    req.query.limit = '5';
    req.query.sort = 'price,-ratingAverage';
    req.query.fields = 'name,price,ratingAverage,difficulty';
    next();
}

exports.getAllTours = async (req,res)=>{
    try{
        console.log(req.query);
        //Execute Query
        const feature = new ApiFeature(Tour.find(), req.query)
        .filter()
        .sorting()
        .limitingFields()
        .Pagination();

        const tours = await feature.query;
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

exports.getATour = catchAsync(async (req, res, next)=> {
    const tour = await Tour.findById(req.params.id);

    if(!tour){
        return next(new AppError('No tour found with that ID', 404));
    }

    res.status(200).json({
        status: "success",
        data: {tour}
    })
});

exports.createATour = catchAsync(async(req, res)=>{
    const newTour = await Tour.create(req.body);
    res.status(201).json({
        status: 'Success',
        data: {
            tour: newTour
        }
    });
});

exports.updateATour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!tour){
        return next(new AppError('No tour found with that ID', 404));
    }

    res.status(200).json({
        status: "success",
        data: {tour}
    })
})

exports.deleteATour = catchAsync(async(req, res, next) => {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if(!tour){
        return next(new AppError('No tour found with that ID', 404));
    }

    res.status(204).json({
        status: "success",
        data: {
            tour: null
        }
    })
});

exports.getTourStats = catchAsync(async(req, res, next) => {
    const stats = await Tour.aggregate([
        {
            $match: {ratingAverage: {$gte: 4}}
        },
        {
            $group: {
                _id: { $toUpper: '$difficulty'},
                numTours: {$sum: 1},
                numRatings: {$sum: '$ratingQuantity'},
                avgRating: {$avg: '$ratingAverage'},
                avgPrice: {$avg: '$price'},
                minPrice: {$min: '$price'},
                maxPrice: {$max: '$price'}
            }
        },
        {
            $sort: {avgPrice: 1} 
        },
    ]);
    res.status(200).json({
        status: "success",
        data: {stats}
    })
})

exports.getMonthlyPlan = catchAsync(async(req, res, next) =>{
    const year = req.params.year *1;
    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte : new Date(`${year}-01-01T04:30:00.000Z`),
                    $lte : new Date(`${year}-12-31T04:30:00.000Z`)
                }
            }
        },
        {
            $group: {
                _id: {$month: '$sstartDates'},
                numberOfTours: {$sum: 1},
                tours: {$push: '$name'} 
            }
        },
        {
            $addFields: {month: '$_id'}
        },
        {
            $project: {_id: 0}
        },
        {
            $sort: {numberOfTours: -1}
        }
    ])
    
    res.status(200).json({
        status: "success",
        data: plan
    })
})
