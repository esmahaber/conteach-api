var express = require('express');
var router = express.Router();
var zaman = require('../helper/date');
const {check, validationResult} = require('express-validator/check');


// GET tüm randevular
router.get('/', (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err)
            return next(err);

        connection.query('SELECT * FROM randevu', (err, rows) => {
            if (err) return next(err);
            res.send(rows);
        });
    });
});

//ilk 10 randevu
router.get('/ilk10', (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err)
            return next(err);
        connection.query('SELECT * FROM randevu ORDER BY randevu_tarihi ASC LIMIT 10', (err, rows) => {
            if (err) return next(err);
            res.send(rows);
        });
    });
});

//GET tek randevu
router.get('/:id', (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err)
            return next(err);
        connection.query('SELECT * FROM randevu WHERE randevu_id = ?', [req.params.id], (err, rows) => {
            if (!err)
                res.send(rows);
            else
                res.send(err);
        })
    });
});


// istenilen gün aralığında randevu
router.get('/kisitla/:baslangic/:bitis', (req, res, next) => {
    const {baslangic, bitis} = req.params;
    req.getConnection((err, connection) => {
        if (err)
            return next(err);
        connection.query('select * from randevu where randevu_tarihi between ? and ?', [baslangic, bitis], (err, rows) => {
            if (!err)
                res.send(rows);
            else
                res.send(err);
        })
    });
});

//POST tek randevu
router.post('/',
    (req, res, next) => {
        var postData = req.body;
        req.getConnection((err, connection) => {
            if (err)
                return next(err);
            connection.query('INSERT INTO randevu SET ? ', postData, (err, rows, fields) => {
                if (!err)
                    res.send(req.body);
                else
                    res.send(err);
            })
        });
    });

//DELETE tek randevu
router.delete('/:id', (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err)
            return next(err);
        connection.query('DELETE FROM randevu WHERE randevu_id = ?', [req.params.id], (err, rows, fields) => {
            if (rows.affectedRows == 0)
                return res.send("Randevu bulunamadı");
            else
                res.send("Randevu silindi");
        })
    });
});

//PUT randevu
router.put('/', (req, res, next) => {
    var putData = req.body;
    req.getConnection((err, connection) => {
        if (err)
            return next(err);
        connection.query('UPDATE randevu SET randevu_tarihi = ?, kullanici_notu = ?, guncelleme_tarihi = ?, k_id=? WHERE randevu_id = ?',
            [putData.randevu_tarihi, putData.kullanici_notu, zaman, putData.k_id, putData.randevu_id], (err, rows, fields) => {

                if (!err)
                    res.send(req.body);
                else
                    res.send(err);
            })

    });
});


module.exports = router;


