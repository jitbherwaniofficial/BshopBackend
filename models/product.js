const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    description: {
        type : String,
        required: true
    },
    richDescription : {
        type : String,
        default : ''
    },
    image : {
        type : String,
        default : ''
    },
    images: [{
        type : String
    }],
    brand : {
        type : String,
        default : ''
    },
    price : {
        type : Number,
        default : 0
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'categories',
        required : true
    },
    countInStock: {
        type: Number,
        required: true,
        min : 0,
        max : 500
    },
    rating : {
        type : Number,
        default : 0
    },
    numReviews : {
        type : Number,
        default : 0
    },
    isFeatured : {
        type : Boolean,
        default : true
    },
    dateCreated :{
        type : Date,
        default : Date.now
    }
})

productSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
                                    //THIS METHOD WILL HELP TO CREATE ID WITHOUT HEX IN IT LIKE THIS(_ID)//
productSchema.set('toJSON',{
    virtuals:true
})

exports.Product = mongoose.model('products', productSchema); //Model starts with capital letter//

