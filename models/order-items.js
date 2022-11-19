const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    quantity : {
        type:Number,
        required:true
    },

    product: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"products",
        required:true  
    },

    
})

orderItemSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

orderItemSchema.set('toJSON',{
    virtuals:true
})

exports.OrderItems = mongoose.model('orderitems', orderItemSchema);