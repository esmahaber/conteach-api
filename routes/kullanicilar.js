var express = require('express');
var router = express.Router();
var zaman = require('../helper/date');
const {check, validationResult} = require('express-validator');
var bcrypt = require('bcryptjs');


// GET Tüm kullanıcı
router.get('/', (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err)
            return next(err);
        connection.query('SELECT * FROM kullanici', (err, rows) => {
            if (err)
                return next(err);
            res.send(rows);
        });
    });
});

// GET Tüm kullanıcı randevu ile birlikte
router.get('/listele', (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err)
            return next(err);
        connection.query('SELECT kullanici.k_id, randevu_id, kullanici.isim, kullanici.soyisim, randevu.randevu_tarihi, randevu.kullanici_notu\n' +
            ' FROM randevu, kullanici WHERE kullanici.k_id = randevu.k_id;',  (err, rows) => {
            if (err)
                res.send(err.message);
            res.send(rows);

        });
    });
});

//GET tek kulanıcı
router.get('/:id', (req, res, next) => {
    req.getConnection((err, connection) => {
        connection.query('SELECT * FROM kullanici WHERE k_id = ?', [req.params.id], (error, rows, fields) => {
            if (err)
                return next(err);
            res.send(rows);
        });
    });
});

//ogrenci numarasına göre sınırlandırma
router.get('/kisitla/:baslangic_no', (req, res, next) => {
    const baslangic_no = req.params.baslangic_no;
    req.getConnection((err, connection) => {
        if (err)
            return next(err);
        connection.query('SELECT * FROM kullanici WHERE ogr_no LIKE ? ', baslangic_no + '%', (err, results) => {
            if (err)
                res.send(err.message);
            res.send(results);
        });
    });
});

//POST tek kullanıcı
router.post('/', [
        check('isim').not().isEmpty().isLength({min: 3}).withMessage('İsim alanı 2 karakterden fazla olmalı'),
        check('soyisim').not().isEmpty().isLength({min: 3}).withMessage('Soyisim alanı 2 karakterden fazla olmalı'),
        check('eposta').isEmail(),
        check('telefon').isLength({min: 10}).withMessage('Telefon numarasını eksik girdiniz.'),
        check('sifre', 'Sifreniz en az 6 karakterli olmalı.')
    ],
    (req, res, next) => {
        var postData = req.body;
        var sifre = postData.sifre;
        req.body.kayit_tarihi = zaman;

        bcrypt.hash(sifre, 10).then(function(hash) {
            postData.sifre = hash;
            req.getConnection((err, connection) => {
                if (err)
                    return next(err);
                connection.query('INSERT INTO kullanici SET ?', postData, (err, rows, fields) => {
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                        return res.status(422).jsonp(errors.array());
                        // next({message: 'isim gir', code: 444});
                    } else if (err)
                        res.send(err);
                    else
                        res.send(req.body);
                });




                /* if (!err)
                     res.send(req.body);
                 else
                     res.send(err);

                 */
            })

        });

    });

//DELETE tek kullanıcı
router.delete('/:id', (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err)
            return next(err);
        connection.query('DELETE FROM kullanici WHERE k_id = ?', [req.params.id], (err, rows, fields) => {
            if (rows.affectedRows == 0)
                return res.send("Kullanici bulunamadı");
            else
                res.send(req.params.id + " idli kullanıcı silindi");
        })
    });
});

//PUT
router.put('/:id', (req, res, next) => {
    var putData = req.body;
    req.getConnection((err, connection) => {
        if (err)
            return next(err);
        connection.query('UPDATE kullanici SET ? WHERE k_id = ?', [putData, req.params.id], (err, rows, fields) => {
            if (!err)
                res.send(req.body);
            else
                res.send(err);
        })
    });
});


module.exports = router;


