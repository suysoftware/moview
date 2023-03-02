const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();
const server=require('../../app');

chai.use(chaiHttp);
describe('/api/directors test',()=>{

    before((done)=>{
        chai.request(server).post('/authenticate').send({username:'testuser',password:'testpass'}).end((err,res)=>{
            token=res.body.token;
            console.log(token);
            done();
        });

        
    }) 

    describe('/GET directors',()=>{
        it('it should GET all the directors',(done)=>{
            chai.request(server).get('/api/directors').set('x-access-token',token).end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });


});