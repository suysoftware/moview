const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();
const server=require('../../app');

chai.use(chaiHttp);

describe('Node Server',()=>{
    it('(Get /) returns the homepage',(done)=>{

        chai.request(server).get('/').end((err,res)=>{
            res.should.have.status(200);
            done();
        });
    });
    it('(Get /) movies endpoint',(done)=>{
        done();
    });
});