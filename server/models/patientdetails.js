"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PatientDetails extends Model {
    static associate(models) {       
      PatientDetails.belongsTo(models.Patient, {foreignKey: 'patientId'})
    }
  }
  PatientDetails.init(
    {
      weight: DataTypes.STRING,
      height: DataTypes.STRING,
      datemesure: DataTypes.DATE,
      
    },
    {
      sequelize,
      modelName: "PatientDetails",
    }
  );
  return PatientDetails;
};
