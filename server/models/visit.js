'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visit extends Model {
  
    static associate(models) {
      Visit.belongsTo(models.Patient, {foreignKey: 'patientId'}),
      Visit.hasMany(models.Payment)

    }
  }
  Visit.init({ 
    motif: DataTypes.STRING,
    interrogatoire: DataTypes.STRING,
    conclusion: DataTypes.STRING,
    prix: DataTypes.FLOAT
   
    
  }, {
    sequelize,
    modelName: 'Visit',
  });
  return Visit;
};