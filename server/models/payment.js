"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Visit,{ foreignKey: "visitId" })
    }
  }
  Payment.init(
    { 
      montant: DataTypes.FLOAT,
      rest: DataTypes.FLOAT
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
