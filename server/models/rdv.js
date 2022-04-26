'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rdv extends Model {
  
    static associate(models) {
        Rdv.belongsTo(models.Patient, {foreignKey: 'patientId'})
    }
  }
  Rdv.init({ 
    motif: DataTypes.STRING,
    daterdv: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Rdv',
  });
  return Rdv;
};