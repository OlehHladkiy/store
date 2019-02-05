const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
// const moment = require('moment');

const app = express();
const mongoose = require('mongoose');
// const async = require('async');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'));

cloudinary.config(
    {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    }
)

// Models 

const { Category } = require('./models/category');
const { Brand } = require('./models/brand');
const { Product } = require('./models/products');
const { User } = require('./models/user');

//Midleware
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role == 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        phone: req.user.phone,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history   
    })
})

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({success: false, err});

        return res.status(200).json({
            success: true
        });
    })
});

app.post('/api/users/login', (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if(!user) return res.json({loginSuccess: false, message: 'Auth failes, email not found'});
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch){
                return res.json({loginSuccess: false, message: 'Wrong password'});
            }

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie('w_auth', user.token).status(200).json({
                    loginSuccess: true
                }); 
            });
        });
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        {_id: req.user._id },
        { token: '' },
        (err, doc) => {
            if(err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            });
        }
    )
});

app.post('/api/users/update_profile', auth, (req, res) => {

    User.findByIdAndUpdate(
        { _id: req.user._id },
        {
            "$set": req.body
        },
        { new: true },
        (err, doc) => {
            if(err) return res.json({success: false, err})
            return res.status(200).send({
                success: true
            })
        }   
    );
})

app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
    cloudinary.uploader.upload(req.files.file.path, (result) => {
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
    }, {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    })
})

app.get('/api/users/removeimage', auth, admin, (req, res) => {
    let image_id = req.query.public_id;

    cloudinary.uploader.destroy(image_id, (error, result) => {
        if(error) return res.json({success: false, error});
        res.status(200).send('ok');
    })
})

// PRODUCTS

app.post('/api/product/article', (req, res) => {
    const product = new Product(req.body);

    product.save((err, doc) => {
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})


app.post('/api/product/brand', auth, admin, (req, res) => {
    const brand = new Brand(req.body);

    brand.save((err, doc) => {
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            brand: doc
        });
    });
});

app.get('/api/product/brands', (auth, res) => {
    Brand.find({}, (err, brands) => {
        if(err) return res.status(400).send({success: false, err});
        res.status(200).send({success: true, brands});
    });
});

app.delete('/api/product/brand', auth, admin, (req, res) => {
    Brand.remove({
        "_id": mongoose.Types.ObjectId(req.query.id)
    }, (err, doc) => {
        if(err) res.status(400).send({success: false, err});
        res.status(200).send({success: true});
    });
})

app.post('/api/product/updateBrand', (req, res) => {
    Brand.findOneAndUpdate({
        "_id": mongoose.Types.ObjectId(req.query.id)
    }, {
        name: req.body.name
    }, (err, brand) => {
        if(err) res.status(400).send({success: false, err});
        res.status(200).send({success: true});
    })
})

app.post('/api/product/category', auth, admin, (req, res) => {
    const category = new Category(req.body);

    category.save((err, doc) => {
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            category: doc
        });
    });
});

app.get('/api/product/categories', auth, admin, (auth, res) => {
    Category.find({}, (err, categories) => {
        if(err) return res.status(400).send({success: false, err});
        res.status(200).send({success: true, categories});
    });
});

app.delete('/api/product/category', auth, admin, (req, res) => {
    Category.remove({
        "_id": mongoose.Types.ObjectId(req.query.id)
    }, (err, doc) => {
        if(err) res.status(400).send({success: false, err});
        res.status(200).send({success: true});
    });
})

app.post('/api/product/updateCategory', auth, admin, (req, res) => {
    Category.findOneAndUpdate({
        "_id": mongoose.Types.ObjectId(req.query.id)
    }, {
        name: req.body.name
    }, (err, category) => {
        if(err) res.status(400).send({success: false, err});
        res.status(200).send({success: true});
    })
})




const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server runing at ${port}`);
});
