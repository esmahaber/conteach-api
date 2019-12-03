var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

router.post('/dogrulama', function (req, res, next) {
    const {eposta, sifre} = req.body;
    req.getConnection(function (err, connection) {
        if (err) throw err; // not connected!

        connection.query('SELECT sifre FROM kullanici WHERE eposta like ?', eposta, (error, results, fields) => {
            if (results.length === 0)
                res.json({
                    status: false,
                    message: 'Lütfen eposta adresinizi kontrol ediniz'
                });
            else if (error) throw error;
            else {
                bcrypt.compare(sifre, results[0].sifre).then((result) => {
                    if (!result) {
                        res.json({
                            status: false,
                            message: 'Giriş başarısız. Lütfen şifrenizi kontrol ediniz'
                        });
                    } else {
                        const payload = {
                            eposta
                        };
                        const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                            expiresIn: 300 // 5 hour
                        });
                        res.json({
                            status: true,
                            token
                        })
                    }

                });

            }
        });
    });
});

module.exports = router;

