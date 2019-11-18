var express = require('express');
var router = express.Router();
var zaman = require('../helper/date');


// GET Tüm kullanıcı
router.get('/', (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err)
            return next(err);
        connection.query('SELECT * FROM kullanici', function (err, results) {
            if (err) return next(err);
            res.send(results);
        });
    });
});

// GET Tüm kullanıcı randevu ile birlikte
router.get('/listele', (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err)
            return next(err);
        connection.query('SELECT kullanici.k_id, randevu_id, kullanici.isim, kullanici.soyisim, randevu.randevu_tarihi, randevu.kullanici_notu\n' +
            ' FROM randevu, kullanici WHERE kullanici.k_id = randevu.k_id;', function (err, results) {
            if (err) return next(err);
            res.send(results);
        });
    });
});

//GET tek kulanıcı
router.get('/:id', (req, res, next) => {
    req.getConnection((err, connection) => {
        connection.query('SELECT * FROM kullanici WHERE k_id = ?', [req.params.id], (error, rows, fields) => {
            if (!error) {
                res.send(rows);
            } else
                res.send({message: 'Kullanici bulunamadı'});
        });
    });
});

//ogrenci numarasına göre sınırlandırma
router.get('/kisitla/:baslangic_no', (req, res, next) => {
    const baslangic_no = req.params.baslangic_no;
    // var baslangic_no = 16;
    req.getConnection((err, connection) => {
        if (err)
            return next(err);
        connection.query('SELECT * FROM kullanici WHERE ogr_no LIKE ? ', baslangic_no + '%',  (err, results) => {
            if (err) return next(err);
            res.send(results);
        });
    });
});

//POST tek kullanıcı
router.post('/', (req, res, next) => {
    var postData = req.body;
    req.body.kayit_tarihi = zaman;
    req.getConnection((err, connection) => {
        if (err)
            return next(err);
        connection.query('INSERT INTO kullanici SET ?', postData, (err, rows, fields) => {
            if (!err)
                res.send(req.body);
            else
                res.send(err);
        })
    });
});

//DELETE tek kullanıcı
router.delete('/:id', (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err)
            return next(err);
        connection.query('DELETE FROM kullanici WHERE k_id = ?', [req.params.id], (err, rows, fields) => {
            if (!err)
                res.send('Silme işlemi başarılı');
            else
                console.log(err);
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


