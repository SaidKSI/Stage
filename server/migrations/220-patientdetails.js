"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("patientdetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      patientId: {
        type: Sequelize.INTEGER,
        references: {
          model: "patients",
          key: "id"
        },
        onDelete : "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false
      },
      weight: {
        type: Sequelize.STRING,
        unique: true ,
        allowNull: false
      },
      height: {
        type: Sequelize.STRING,
      },
      datemesure: {
        type: Sequelize.DATE,
      },
      
      

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("patientdetails");
  },
};
