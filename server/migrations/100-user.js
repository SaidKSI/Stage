'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { 
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      // petientId: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: "patients",
      //     key: "id",
      //   }
      // },
      role: {
        type: Sequelize.STRING,
        isIn: [['Doctor', 'Assistance','Admin']],
      },
      specialization: {
        type: Sequelize.STRING,
        
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};