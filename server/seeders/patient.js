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
      "patients",
      [
        {
          firstName: "admin",
          lastName: "admin", 
          email: "admin@admin.com", 
          gender: "Homme", 
          cin: 1,
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
     await queryInterface.bulkDelete('patients', null, {});
  },
};
