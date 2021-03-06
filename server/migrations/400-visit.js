"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("visits", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      motif: {
        type: Sequelize.STRING,
      },
      interrogatoire: {
        type: Sequelize.STRING,
      },
      conclusion: {
        type: Sequelize.STRING,
      },
      patientId: {
        type: Sequelize.INTEGER,
        references: {
          model: "patients",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      datevisit: {
        type: Sequelize.DATE,
      },
      prix: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("visits");
  },
};
