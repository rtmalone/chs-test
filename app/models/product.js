'use strict';

var Mongo = require('mongodb');

function Product(attrs) {
  this.name = attrs.name;
  this.version = attrs.version;
}

Object.defineProperty(Product, 'collection', {
  get: function(){return global.mongodb.collection('products');}
});

Product.prototype.insert = function(fn){
  Product.collection.insert(this, function(err, records){
    fn(records[0]);
  });
};

Product.findAll = function(fn){
  Product.collection.find().toArray(function(err, records){
    fn(records);
  });
};

Product.findByID = function(id, fn){
  var pID = Mongo.ObjectID(id);
  Product.collection.findOne({_id: pID}, function(err, record){
    fn(record);
  });
};

module.exports = Product;
