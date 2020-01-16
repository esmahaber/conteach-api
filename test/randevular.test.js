const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');
chai.use(chaiHttp);

let token, randevuId, data;

describe('/api/randevular tests', () => {
    before((done) => {
        chai.request(server)
            .post('/dogrulama')
            .send({eposta: 'es@hotmail.com', sifre: '12345'})
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('/GET randevular', () => {
        it('tüm randevuları getirir', (done) => {
            chai.request(server)
                .get('/api/randevular')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        });
    });
    describe('/GET /ilk10', () => {
        it('ilk 10 randevuyu getirir', (done) => {
            chai.request(server)
                .get('/api/randevular/ilk10')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');                    
                    res.body[0].should.be.property('randevu_id');
                    res.body[0].should.be.property('k_id');
                    res.body[0].should.have.property('randevu_sahibi');
                    res.body[0].should.have.property('randevu_tarihi');
                    res.body[0].should.have.property('kullanici_notu');
                    res.body[0].should.have.property('olusturma_tarihi');
                    res.body[0].should.have.property('guncelleme_tarihi');
                    done();
                })
        });
    });

    describe('/POST randevu', () => {
        it('randevu ekler eder', (done) => {
            const randevu = {
                randevu_tarihi: '2021-01-30',
                kullanici_notu: 'test deneme',
            };

            chai.request(server)
                .post('/api/randevular')
                .send(randevu)
                .set('x-access-token', token)
                .end((err, res,) => {
                    data = res.request._data;
                    randevuId = res.body.insertId;
                    res.should.have.status(200);
                    data.should.be.a('object');
                    data.should.have.property('randevu_tarihi');
                    data.should.have.property('kullanici_notu');                    
                    done();
                });
        });
    });

    describe('/GET /api/:randevuId tests', () => {
        it('Tek randevu döndürür ', (done) => {
            chai.request(server)
                .get('/api/randevular/' +randevuId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');                    
                    res.body[0].should.be.property('randevu_id');
                    res.body[0].should.be.property('k_id');
                    res.body[0].should.have.property('randevu_sahibi');
                    res.body[0].should.have.property('randevu_tarihi');
                    res.body[0].should.have.property('kullanici_notu');
                    res.body[0].should.have.property('olusturma_tarihi');
                    res.body[0].should.have.property('guncelleme_tarihi');
                    done();
                })

        });
    })

    describe('/PUT /:randevu_id', () => {
        it('randevuyu gunceller', (done) => {
            const randevu = {
                randevu_tarihi: '2001-01-30',
                kullanici_notu: 'put tests',
                k_id: '360',
            };

            chai.request(server)
                .put('/api/randevular/' + randevuId)
                .send(randevu)
                .set('x-access-token', token)
                .end((err, res,) => {
                    data = res.request._data;
                  //  console.log(res);
                    res.should.have.status(200);
                    data.should.have.property('randevu_tarihi').eql(randevu.randevu_tarihi);
                    data.should.have.property('kullanici_notu').eql(randevu.kullanici_notu);
                    data.should.have.property('k_id').eql(randevu.k_id);                    
                    done();
                });
        });
    });

    describe('/DELETE /:randevu_id', () => {
        it('randevuyu siler', (done) => {
            chai.request(server)
                .delete('/api/randevular/' + randevuId)
                .set('x-access-token', token)
                .end((err, res,) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    res.should.have.property('text').eql("Randevu silindi");
                    done();
                });
        });
    });



});
