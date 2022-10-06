// @desc Register new user
// @route POST /api/users
// @acess Public
import  jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import e from 'express';
import mongoose from 'mongoose';

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)

       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex|options)\b/g, match => '$' + match)
  
    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than

       this.query.find(JSON.parse(queryStr))

         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}


export const getPopularCard = asyncHandler(async(req, res) => {
  try{
      const ObjectId = mongoose.Types.ObjectId;
      const pipeline = [
          {
            '$lookup': {
              'from': 'users', 
              'localField': 'sellers.user', 
              'foreignField': '_id', 
              'as': 'related'
            }
          }, {
            '$project': {
              'sellers': {
                '$map': {
                  'input': '$sellers', 
                  'in': {
                    'user': {
                      '$arrayElemAt': [
                        '$related', {
                          '$indexOfArray': [
                            '$related._id', '$$this.user'
                          ]
                        }
                      ]
                    }, 
                    'price': '$$this.price', 
                    'stock': '$$this.stock'
                  }
                }
              }, 
              'name': '$name', 
              'category': '$category', 
              'image': '$image', 
              'brand': '$brand', 
              'popular_card': '$popular_card', 
              'popular_product': '$popular_product', 
              'checked': '$checked', 
              'slug': '$slug'
            }
          }, {
            '$match': {
              'popular_card': {
                '$gte': 1
              }
            }
          }, {
            '$sort': {
              'popular_card': 1
            }
          }, {
            '$unset': [
              'sellers.user.resetPasswordExpire', 'sellers.user.resetPasswordToken', 'sellers.user.password'
            ]
          }, {
            '$addFields': {
              'cheapest_seller': {
                '$reduce': {
                  'input': '$sellers', 
                  'initialValue': {
                    'price': 99999999
                  }, 
                  'in': {
                    '$cond': [
                      {
                        '$lte': [
                          '$$this.price', '$$value.price'
                        ]
                      }, '$$this', '$$value'
                    ]
                  }
                }
              }
            }
          }
        ];

        const popular_card = await Product.aggregate(pipeline)

        if(popular_card){

      
            res.status(200).json({ sucess: true, result: popular_card.length,products: popular_card})

        }
        else{
            res.status(400).json({
                message : 'product not found'
            })
            
        }
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

})

export const getTrendingProducts = asyncHandler(async(req, res) => {
  try{
      const ObjectId = mongoose.Types.ObjectId;
      const pipeline = [
          {
            '$lookup': {
              'from': 'users', 
              'localField': 'sellers.user', 
              'foreignField': '_id', 
              'as': 'related'
            }
          }, {
            '$project': {
              'sellers': {
                '$map': {
                  'input': '$sellers', 
                  'in': {
                    'user': {
                      '$arrayElemAt': [
                        '$related', {
                          '$indexOfArray': [
                            '$related._id', '$$this.user'
                          ]
                        }
                      ]
                    }, 
                    'price': '$$this.price', 
                    'stock': '$$this.stock'
                  }
                }
              }, 
              'name': '$name', 
              'category': '$category', 
              'image': '$image', 
              'brand': '$brand', 
              'popular_card': '$popular_card', 
              'trending': '$trending', 
              'checked': '$checked', 
              'slug': '$slug'
            }
          }, {
            '$match': {
              'trending': {
                '$gte': 1
              }
            }
          }, {
            '$sort': {
              'trending': 1
            }
          }, {
            '$unset': [
              'sellers.user.resetPasswordExpire', 'sellers.user.resetPasswordToken', 'sellers.user.password'
            ]
          }, {
            '$addFields': {
              'cheapest_seller': {
                '$reduce': {
                  'input': '$sellers', 
                  'initialValue': {
                    'price': 99999999
                  }, 
                  'in': {
                    '$cond': [
                      {
                        '$lte': [
                          '$$this.price', '$$value.price'
                        ]
                      }, '$$this', '$$value'
                    ]
                  }
                }
              }
            }
          }
        ];

        const trending_products = await Product.aggregate(pipeline)

        if(trending_products){

      
            res.status(200).json({ sucess: true, result: trending_products.length,products: trending_products})

        }
        else{
            res.status(400).json({
                message : 'product not found'
            })
            
        }
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

})



export const getProducts = asyncHandler(async(req,res) => {
        try {
            const features = new APIfeatures(Product.find(), req.query)
            .filtering().sorting().paginating()

            //const products = await features.query
            const products = await features.query
            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }

})

export const getProductSearch = asyncHandler(async(req,res)=>{
    try{

        const ObjectId = mongoose.Types.ObjectId;
        const pipeline = [
            {
              '$lookup': {
                'from': 'users', 
                'localField': 'sellers.user', 
                'foreignField': '_id', 
                'as': 'related'
              }
            }, {
              '$project': {
                'sellers': {
                  '$map': {
                    'input': '$sellers', 
                    'in': {
                      'user': {
                        '$arrayElemAt': [
                          '$related', {
                            '$indexOfArray': [
                              '$related._id', '$$this.user'
                            ]
                          }
                        ]
                      }, 
                      'price': '$$this.price', 
                      'stock': '$$this.stock'
                    }
                  }
                }, 
                'name': '$name', 
                'category': '$category', 
                'image': '$image', 
                'brand': '$brand', 
                'popular_card': '$popular_card', 
                'popular_product': '$popular_product', 
                'checked': '$checked', 
                'slug': '$slug'
              }
            }, {
              '$match': {
                'name': {
                  '$regex': (req.query.regex ) , '$options' : 'i'
                }
              }
            }, {
              '$unset': [
                'sellers.user.resetPasswordExpire', 'sellers.user.resetPasswordToken', 'sellers.user.password'
              ]
            }, {
              '$addFields': {
                'cheapest_seller': {
                  '$reduce': {
                    'input': '$sellers', 
                    'initialValue': {
                      'price': 99999999
                    }, 
                    'in': {
                      '$cond': [
                        {
                          '$lte': [
                            '$$this.price', '$$value.price'
                          ]
                        }, '$$this', '$$value'
                      ]
                    }
                  }
                }
              }
            }
          ];

          const product = await Product.aggregate(pipeline)
   
          if(product){

        
              res.status(200).json({ sucess: true, result: product.length,products: product})
  
          }
          else{
              res.status(400).json({
                  message : 'product not found'
              })
              
          }
          
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
})

export const getProduct = asyncHandler(async(req,res) => {
    try {
    

        const ObjectId = mongoose.Types.ObjectId;
        const pipeline = [
            {
              '$lookup': {
                'from': 'users', 
                'localField': 'sellers.user', 
                'foreignField': '_id', 
                'as': 'related'
              }
            }, {
              '$project': {
                'sellers': {
                  '$map': {
                    'input': '$sellers', 
                    'in': {
                      'user': {
                        '$arrayElemAt': [
                          '$related', {
                            '$indexOfArray': [
                              '$related._id', '$$this.user'
                            ]
                          }
                        ]
                      }, 
                      'price': '$$this.price', 
                      'stock': '$$this.stock'
                    }
                  }
                }, 
                'name': '$name', 
                'category': '$category', 
                'image': '$image', 
                'brand': '$brand', 
                'popular_card': '$popular_card', 
                'popular_product': '$popular_product', 
                'checked': '$checked', 
                'slug': '$slug'
              }
            }, {
              '$match': {
                '_id': new ObjectId(req.query)
              }
            }, {
              '$unset': [
                'sellers.user.resetPasswordExpire', 'sellers.user.resetPasswordToken', 'sellers.user.password'
              ]
            }, {
              '$addFields': {
                'cheapest_seller': {
                  '$reduce': {
                    'input': '$sellers', 
                    'initialValue': {
                      'price': 99999999
                    }, 
                    'in': {
                      '$cond': [
                        {
                          '$lte': [
                            '$$this.price', '$$value.price'
                          ]
                        }, '$$this', '$$value'
                      ]
                    }
                  }
                }
              }
            }
          ];
          
        const product = await Product.aggregate(pipeline)
   
        if(product){
            res.status(200).json({ sucess: true, data: product})

        }
        else{
            res.status(400).json({
                message : 'product not found'
            })
            
        }
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    return;
})

export const getProductSellerInfo = asyncHandler(async(req,res) => {
  try {
    

      const ObjectId = mongoose.Types.ObjectId;
      
     
      const pipeline = [
        {
          '$unwind': {
            'path': '$sellers', 
            'includeArrayIndex': 'string'
          }
        }, {
          '$match': {
            '_id' : ObjectId(req.query.product),
            'sellers.user' :ObjectId(req.query.user)
          }
        }, {
          '$lookup': {
            'from': 'users', 
            'localField': 'sellers.user', 
            'foreignField': '_id', 
            'as': 'seller_info'
          }
        }, {
          '$unset': [
            'seller_info.resetPasswordExpire', 'seller_info.resetPasswordToken', 'seller_info.password'
          ]
        }
      ];
      const product = await Product.aggregate(pipeline)

      if(product){
          res.status(200).json({ sucess: true, data: product})

      }
      else{
          res.status(400).json({
              message : 'product not found'
          })
          
      }
      
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
  return;
})
  export const getCartTotal = asyncHandler(async(req,res) => {

    const ObjectId = mongoose.Types.ObjectId;
    const re=  req.body
    console.log(re.cart.length)
    var total = 0
    for ( var i=0; i < re.cart.length; i++){
      const pipeline = [
        {
          '$unwind': {
            'path': '$sellers', 
            'includeArrayIndex': 'string'
          }
        }, {
          '$match': {
            '_id': (new ObjectId(re.cart[i].id)), 
            'sellers.user': (new ObjectId(re.cart[i].user_id))
          }
        }, {
          '$project': {
            'price': {
              '$multiply': [
                '$sellers.price',  parseInt(re.cart[i].quantity)
              ]
            }
          }
        }
      ];
      
      try{
        const ret = await Product.aggregate(pipeline)
        console.log(ret)
        total += ret[0].price
      } catch(err){
        return res.status(500).json({msg: err.message})
      }
    }

    try{
      res.status(200).json({ sucess: true, data: total})
      console.log("sucesss")
    } catch (err) {
      return res.status(500).json({msg: err.message})
  }
  

  })

