const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();
const server=require('../../app');

chai.use(chaiHttp);

let token,directorId;
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

    describe('/POST directors',()=>{
        it('it should Post a director',(done)=>{

            const director={
                name:"test director",
                surname: "test surname",
                bio:"test bio"
            }


            chai.request(server).post('/api/directors').send(director).set('x-access-token',token).end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('surname');
                res.body.should.have.property('bio');
                directorId=res.body._id;
                done();
            });
        });
    });

    describe('/GET/:director_id director',()=>{
        it('it should GET the directors by given id',(done)=>{
            chai.request(server).get('/api/directors/'+directorId).set('x-access-token',token).end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('surname');
                res.body.should.have.property('movies');
                res.body.should.have.property('_id').eql(directorId);
                done();
            });
        });
    });


});