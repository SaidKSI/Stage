"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      Patient.hasMany(models.Rdv),
        Patient.hasMany(models.Visit),
        Patient.hasMany(models.Payment),
        Patient.belongsTo(models.User, { foreignKey: "docteurId" });
    }
  }
  Patient.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      cin: DataTypes.INTEGER,
      dateN: DataTypes.DATE,
      email: DataTypes.STRING,

      gender: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
