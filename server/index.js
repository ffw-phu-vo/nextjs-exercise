const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const todo = require('./data/todo');
const post = require('./data/post');
const product = require('./data/product');
var Chance = require('chance');
var chance = new Chance();
const { sort } = require('fast-sort');
const multer  = require('multer');
const mime = require('mime-types');
const PORT = 5000;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + `.${mime.extension(file.mimetype)}`) //Appending .jpg
  }
})
var upload = multer({ storage: storage });

const isAuth = async (req, res, next) => {
	// Lấy access token từ header
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({
      message: 'error'
    });
	}

	try {
    var decoded = jwt.verify(token, 'secret');
    return next();
  } catch (err) {
    // err
    res.status(401).json({
      message: 'error'
    })
  }
};

const products = [
];

const media = [];

const cors = require('cors');
const corsConfig = {
  origin: true,
  credentials: true,
};

const refreshTokens = {};
app.use(express.static(__dirname+'/public'))

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ data: todo.todo })
});

app.get('/post', (req, res) => {
  res.json({ data: post.post(), total: 200, perPage: 15 })
});

app.get('/product', (req, res) => {
  const { search, priceFrom, priceTo, orderBy, isAscending } = req.query;
  let results = products;
  console.log('search', search);

  if (search) {
    console.log('search2', search);

    results = results.filter(product => product.title.includes(search))
  }
  if (priceFrom > 0) {
    results = results.filter(product => product.price >= priceFrom)
  }
  if (priceTo > 0) {
    results = results.filter(product => product.price <= priceTo)
  }

  if (isAscending == 'true') {
    results = sort(results).asc(u => u[orderBy]);

  } else {
    results = sort(results).desc(u => u[orderBy]);

  }
  

  const tmp = [...results]
  
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const slicedArray = tmp.slice((page - 1) * 10, 10 * page);


  res.json({ data: slicedArray, total: results.length, perPage: 10 })
});

app.get('/product/:id', (req, res) => {
  const index = products.findIndex(product => product.productId === req.params.id);

  res.json({ data: products[index]})
});

app.post('/product', [upload.single('thumb'), isAuth], (req, res) => {
  const prod = {
    "productId": chance.hash({length: 15}),
    "thumb": req.file.filename,
    "title": req.body.title,
    "price": +req.body.price,
    "description": req.body.description,
    "date": new Date()
  }
  products.push(prod)
  res.json({ data: prod})
})

app.put('/product/:id', [upload.single('thumb'), isAuth], (req, res) => {
  const prod = {
    "productId": req.params.id,
    "title": req.body.title,
    "price": +req.body.price,
    "description": req.body.description,
    "date": new Date()
  }

  const index = products.findIndex(product => product.productId === req.params.id);
  if (req.file && req.file.filename) {
    prod.thumb = req.file.filename;
  } else {
    prod.thumb = products[index].thumb;
  }
  products[index] = prod;
  res.json({ data: prod})

})

app.delete('/product/:id', (req, res) => {
  const index = products.findIndex(product => product.productId === req.params.id);
  products.splice(index, 1);
  res.json({data: true})
})

app.get('/post-detail', (req, res) => {
  res.json(post.postDetail())
});

app.get('/protected-cookie', (req, res) => {
  const token = req.headers
  console.log('token', token);
  res.json({ message: 'protected-cookie' })
});

app.get('/protected', (req, res) => {
  const token = req.headers.authorization
  console.log('token3', token);
  try {
    var decoded = jwt.verify(token, 'secret');
    res.json({
      message: decoded
    })
  } catch (err) {
    // err
    res.status(401).json({
      message: 'error'
    })
  }
});

app.post('/login', (req, res) => {
  const token = jwt.sign({
    data: req.body
  }, 'secret', { expiresIn: 60 * 60 });
  res.json({
    token
  })
});

app.post('/login-refresh-token', (req, res) => {
  const token = jwt.sign({
    data: req.body
  }, 'secret', { expiresIn: 60 * 60 });

  const refresh_token = randtoken.generate(16);
  refreshTokens[refresh_token] = req.body
  res.json({
    token,
    refresh_token
  })
});

app.post('/login-cookie-http-only', (req, res) => {
  const token = jwt.sign({
    data: req.body
  }, 'secret', { expiresIn: 60 * 60 });

  res
    .status(200)
    .cookie('XSRF-TOKEN', token, {
      path: '/',
      expires: new Date(new Date().getTime() + 100 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      origin: 'http://localhost:3000',
    }).json({
      message: 'Ok'
    })
});

app.get('/refresh-token', (req, res) => {
  const refresh_token = req.headers.refreshtoken;
  const userData = refreshTokens[refresh_token]
  if (userData) {
    const token = jwt.sign({
      data: userData
    }, 'secret', { expiresIn: 60 * 60 });

    const new_refresh_token = randtoken.generate(16);
    refreshTokens[new_refresh_token] = userData;
    delete refreshTokens[refresh_token];
    res.json({
      token,
      refresh_token: new_refresh_token
    })
  } else {
    res.status(401).json({ message: 'err' })
  }

});

app.post('/media', [upload.single('media'), isAuth], function (req, res, next) {
  const url = `http://localhost:${PORT}/${req.file.filename}`;
  title = req.body.title;
  media.push({
    url,
    title
  })
  setTimeout(() => {
    res.json({
      url,
      title
    })
  }, 4000);
})

app.get('/media', function (req, res, next) {
  res.json(media);
})

app.listen(PORT);