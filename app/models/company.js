'use strict';

var Mongo = require('mongodb');

function Company(attrs) {
  this.name = attrs.name;
  this.email = attrs.email;
  this.contact = attrs.contact;
  this.products = attrs.products;
}

Object.defineProperty(Company, 'collection', {
  get: function(){return global.mongodb.collection('companies');}
});

Company.prototype.insert = function(fn){
  Company.collection.insert(this, function(err, records){
    fn(records[0]);
  });
};

Company.findAll = function(fn){
  Company.collection.find().toArray(function(err, records){
    fn(records);
  });
};

Company.findByProduct = function(id, fn){
  Company.collection.find({products:Mongo.ObjectID(id)}).toArray(function(err, records){
    fn(records);
  });
};

Company.addProduct = function(cID, pID, fn){
  Company.collection.update({_id:Mongo.ObjectID(cID)}, {$push: {products:Mongo.ObjectID(pID)}}, function(err, count){
    fn(count);
  });
};

module.exports = Company;
