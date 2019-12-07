const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');
chai.use(chaiHttp);

let token;

describe('/api/kullanicilar tests', () => {
    before((done) => {
        chai.request(server)
            .post('/dogrulama')
            .send({eposta: 'es@hotmail.com', sifre:'12345'})
            .end((err,res) => {
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
                    res.body.should.be.a('array');
                    done();
                })
        });
    });
});
