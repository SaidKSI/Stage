"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {firstName: "Hafid",
        lastName: "Hafidi",
          role: "Admin",
          email: "admin@admin.com", 
          password: "1234",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Sadik",
        lastName: "Sadiki",
          role: "Doctor",
          specialization: " Dermatology",
          email: "doc@doc.com", 
          password: "1234",
                createdAt: new Date(),
      updatedAt: new Date()
        },
        {
          firstName: "Karim",
        lastName: "Karimi",
          role: "Assistance",
          email: "assistance@assistance.com", 
          password: "1234",
                createdAt: new Date(),
      updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  },
};
