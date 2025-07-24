const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, 
    required: true },

  price: { type: Number, 
    required: true },

  size: { type:[Number],
    set: val => (Array.isArray(val) && val.length === 0 ? undefined : val)
  },

    productcode:{type:String,
      required:true,
      },
    

  category: String,

  subcategory: String,  

  description: String,

  image: String,

  imagePublicId: String,

  inStock: { type: Boolean },

}, 
{ timestamps: true });

module.exports = mongoose.model('Product', productSchema);
