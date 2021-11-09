'use strict';

const userModel = require('./users.js');


const {db}=require('../../models/index')
const {DataTypes}=require('../../models/index')


module.exports = {
 
  users: userModel(db, DataTypes),
}
