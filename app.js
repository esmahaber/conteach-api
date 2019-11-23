const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const kullanicilar = require('./routes/kullanicilar');
const randevular = require('./routes/randevular');

const app = express();

//Middleware
const verifyToken = require('./middleware/verify-token');

//db connection
const mysql = require('mysql'), // node-mysql module
    myConnection = require('express-myconnection'), // express-myconnection module
    dbOptions = {
      host: 'localhost',
      user: 'root',
      password: '1234',
      port: 3306,
      database: 'rezervasyon',
        dateStrings:true,
    };

app.use(myConnection(mysql, dbOptions, 'single'));

// Config
const config = require('./config');
app.set('api_secret_key', config.api_secret_key);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', verifyToken);
app.use('/api/kullanicilar', kullanicilar);
app.use('/api/randevular', randevular);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});
app.listen(3000, () => console.log('Express server 3000 portu ile çalışıyor.'));
module.exports = app;
