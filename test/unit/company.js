/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Company   = require('../../app/models/company'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'chs-test';

describe ('Company', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('company constructor', function(){
    it('should create a new company object', function(done){
      var c = new Company({name: 'Tyler, Inc.',
                            email: 'tyler@example.com',
                            contact: 'Tyler Malone',
                            products: ['111111111111111111111111','222222222222222222222222']});
      expect(c).to.be.instanceof(Company);
      done();
    });
  });

  describe('#insert', function(){
    it('should save a company to db', function(done){
      var c1 = new Company({name: 'Tyler, Inc.',
                            email: 'tyler@example.com',
                            contact: 'Tyler Malone',
                            products: ['111111111111111111111111','222222222222222222222222']});
      c1.insert(function(){
        expect(c1._id).to.be.instanceof(Mongo.ObjectID);
        expect(c1.email).to.equal('tyler@example.com');
        expect(c1.products).to.have.length(2);
        done();
      });
    });
  });

  describe('.findAll', function(){
    it('should find all companies', function(done){
      Company.findAll(function(records){
        expect(records).to.have.length(3);
        done();
      });
    });
  });

  describe('.findByProduct', function(){
    it('should find companies by product id', function(done){
      Company.findByProduct('444444444444444444444444', function(records){
        expect(records).to.have.length(2);
        done();
      });
    });
  });

  describe('.addProduct', function(){
    it('should add a product to a company', function(done){
      var cID = '000000000000000000000003',
          pID = '333333333333333333333333';
      Company.addProduct(cID, pID, function(count){
        expect(count).to.equal(1);
        done();
      });
    });
  });
// close bracket
});
