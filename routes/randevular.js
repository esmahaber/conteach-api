var express = require('express');
var router = express.Router();
var zaman = require('../helper/date');


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
        connection.query('SELECT * FROM randevu ORDER BY randevu_tarihi ASC LIMIT 10', (err, results) => {
            if (err) return next(err);
            res.send(results);
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
                console.log(err);
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
                console.log(err);
        })
    });
});

//POST tek randevu
router.post('/', (req, res, next) => {
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
            if (!err)
                res.send('Randevu silme işlemi başarılı');
            else
                console.log(err);
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


