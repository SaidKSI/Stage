"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      }, 
      visitId: {
        type: Sequelize.INTEGER,
        references: {
          model: "visits",
          key: "id",
        },
        onDelete : "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      
      montant: {
        type: Sequelize.FLOAT,
      },
      rest: {
        type: Sequelize.FLOAT,
        defaultValue : 0.0
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
    await queryInterface.dropTable("payments");
  },
};
