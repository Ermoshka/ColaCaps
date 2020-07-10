const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const pg = require('pg')
const cors = require('cors')
const path = require('path')
const multer = require('multer')

const auth = require('./routes/auth')
const caps = require('./routes/caps')
const admin = require('./routes/admin')
const news = require('./routes/news')
const shop = require('./routes/shop')

const isAuth = require('./middleware/isAuth')
const sequelize = require('./utils/database')

const User = require('./models/user')
const UserCaps = require('./models/user-caps')
const UserProducts = require('./models/user-products')
const CapCodes = require('./models/cap-codes')
const CapTypes = require('./models/cap-types')
const Products = require('./models/products')

const PORT = process.env.PORT || 8080
// const buildPath = path.join(__dirname, "..", 'build')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images/');
    },
    filename: (req, file, cb) => {
      cb(null, (new Date()).toISOString() + '-' + Math.round(Math.random() * 1E9) + file.originalname);
    }
});
  
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  app.use(
      multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
  );
  
  // app.use(express.static(buildPath))
  
  app.use(bodyParser.json())
  // app.use(bodyParser.urlencoded({ extended: true }))
  
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
      );
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });
    
    // app.use(cors())

    app.use('/images', express.static(path.join(__dirname, 'images')), (req, res) => {
      res.status(200).json({
        data: req.file.path
      })
    });
    
    app.use('/auth',  auth)
    app.use('/caps', caps)
    app.use('/admin', admin)
    app.use('/news', news)
    app.use('/shop', shop)

    // app.get("*", (req, res) => {
    //   res.sendFile(path.join(buildPath, "index.html"))
    // })
    
    sequelize
    .sync({force: false})
  .then(result => {
    return User.findByPk(1)
  })
  .then(user => {
    if (!user) {
      return User.create({
        username: 'admin',
        password: 'colacapsadmin',
        email: 'ermahan2001@mail.ru',
        isAdmin: true,
        capsBalance: 1000
      })
    }
    return user
  })
  .catch(err => {
    console.log(err)
  })

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

User.belongsToMany(CapCodes, {through: UserCaps})
CapCodes.belongsToMany(User, {through: UserCaps})
CapTypes.hasMany(CapCodes, {onDelete: 'CASCADE'})
CapCodes.belongsTo(CapTypes, {onDelete: 'CASCADE'})
Products.belongsToMany(User, {through: UserProducts})
User.belongsToMany(Products, {through: UserProducts})

app.listen(PORT)
