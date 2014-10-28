#!/bin/bash

mongoimport --jsonArray --drop --db $1 --collection companies --file ../../db/companies.json
mongoimport --jsonArray --drop --db $1 --collection products --file ../../db/products.json
