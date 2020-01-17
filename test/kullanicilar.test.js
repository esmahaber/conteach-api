const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');
chai.use(chaiHttp);

let token, kullaniciId, data;

describe('/api/kullanicilar tests', () => {
    before((done) => {
        chai.request(server)
            .post('/dogrulama')
            .send({eposta: 'es@hotmail.com', sifre: '12345'})
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('/GET kullanıcılar', () => {
        it('tüm kullanıcıları getirir', (done) => {
            chai.request(server)
                .get('/api/kullanicilar')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.be.a('object');
                    done();
                })
        });
    });
    describe('/GET /listele', () => {
        it('tüm kullanıcıları randevuları ile getirir', (done) => {
            chai.request(server)
                .get('/api/kullanicilar/listele')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.be.property('k_id');
                    res.body[0].should.be.property('randevu_id');
                    res.body[0].should.have.property('isim');
                    res.body[0].should.have.property('soyisim');
                    res.body[0].should.have.property('randevu_tarihi');
                    res.body[0].should.have.property('kullanici_notu');
                    done();
                })
        });
    });

    describe('/GET /kisitla/:baslangic_no', () => {
        const baslangic_no = 15;
        it('Siralanmis ogr_no getirir', (done) => {
            chai.request(server)
                .get('/api/kullanicilar/kisitla/' + baslangic_no)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        });
    });

    describe('/POST kullanici', () => {
        it('kullanici post eder', (done) => {
            const kullanici = {
                isim: 'Udemy',
                soyisim: 'deneme',
                eposta: 'utest2@hotmail.com',
                sifre: '123',
                ogr_no: '1621012110',
                dogum_tarihi: '1997-05-05',
                telefon: '5417992790'
            };

            chai.request(server)
                .post('/api/kullanicilar')
                .send(kullanici)
                .set('x-access-token', token)
                .end((err, res,) => {
                    data = res.request._data;
                    kullaniciId = res.body.insertId;
                    res.should.have.status(200);
                    data.should.be.a('object');
                    data.should.have.property('isim');
                    data.should.have.property('soyisim');
                    data.should.have.property('eposta');
                    data.should.have.property('sifre');
                    data.should.have.property('ogr_no');
                    data.should.have.property('dogum_tarihi');
                    done();
                });
        });
    });

    describe('/GET /api/:kullaniciId tests', () => {
        it('kullaniciyi döndürür ', (done) => {
            chai.request(server)
                .get('/api/kullanicilar/' + kullaniciId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.be.property('k_id');
                    res.body[0].should.be.property('isim');
                    res.body[0].should.have.property('soyisim');
                    res.body[0].should.have.property('eposta');
                    res.body[0].should.have.property('sifre');
                    res.body[0].should.have.property('ogr_no');
                    res.body[0].should.have.property('dogum_tarihi');
                    done();
                })

        });
    })

    describe('/PUT /:k_id kullanici', () => {
        it('kullaniciyi gunceller', (done) => {
            const kullanici = {
                isim: 'Esma',
                soyisim: 'Haber',
                eposta: 'ehaber@hotmail.com',
                sifre: '1234',
                ogr_no: '1621012114',
                dogum_tarihi: '1992-05-05',
                telefon: '5417992791'
            };

            chai.request(server)
                .put('/api/kullanicilar/' + kullaniciId)
                .send(kullanici)
                .set('x-access-token', token)
                .end((err, res,) => {
                    data = res.request._data;
                    res.should.have.status(200);
                    data.should.be.a('object');
                    data.should.have.property('isim').eql(kullanici.isim);
                    data.should.have.property('soyisim').eql(kullanici.soyisim);
                    data.should.have.property('eposta').eql(kullanici.eposta);
                    data.should.have.property('sifre').eql(kullanici.sifre);
                    data.should.have.property('ogr_no').eql(kullanici.ogr_no);
                    data.should.have.property('dogum_tarihi').eql(kullanici.dogum_tarihi);
                    done();
                });
        });
    });

    describe('/DELETE /:k_id kullanici', () => {
        it('kullaniciyi siler', (done) => {
            chai.request(server)
                .delete('/api/kullanicilar/' + kullaniciId)
                .set('x-access-token', token)
                .end((err, res,) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    res.should.have.property('text').eql(kullaniciId + " idli kullanıcı silindi");
                    done();
                });
        });
    });


});
