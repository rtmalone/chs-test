/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Product   = require('../../app/models/product'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'chs-test';

describe ('Product', function(){
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

  describe('Product constructor', function(){
    it('should create a new Product object', function(done){
      var p = new Product({name: 'Super Awesome Software',
                           version: 2.0});
      expect(p).to.be.instanceof(Product);
      done();
    });
  });

  describe('#insert', function(){
    it('should save a Product to db', function(done){
      var p1 = new Product({name: 'The Clinics Amoung Us',
                            version:5.3});
      p1.insert(function(){
        expect(p1._id).to.be.instanceof(Mongo.ObjectID);
        expect(p1.version).to.equal(5.3);
        expect(p1.name).to.include('Clinics');
        done();
      });
    });
  });

  describe('.findAll', function(){
    it('should find all companies', function(done){
      Product.findAll(function(records){
        expect(records).to.have.length(3);
        done();
      });
    });
  });

  describe('.findByID', function(){
    it('should find a product by its ID', function(done){
      var id = '000000000000000000000009';
      Product.findByID(id, function(p){
        expect(p.name).to.equal('Superb Medication');
        expect(p.version).to.equal(4);
        done();
      });
    });
  });
// close bracket
});
