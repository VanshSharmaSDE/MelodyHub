const { faker } = require('@faker-js/faker'); // Updated import statement

/**
 * Generates an array of fake users for testing or seeding the database
 * @param {number} count - Number of users to generate
 * @returns {Array} Array of user objects
 */
const generateFakeUsers = (count = 100) => {
  const users = [];
  const domains = ["google.com", "melodyhub.com", "mailhub.org", "devverse.io"];

  for (let i = 1; i <= count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}`.replace(/[^a-z]/g, '');
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${faker.helpers.arrayElement(domains)}`;
    const password = faker.internet.password({ length: 10, memorable: true }); // e.g., "A!3nM@kd92"

    users.push({
      name: `${firstName} ${lastName}`,
      username,
      email,
      password,
      role: 'user'
    });
  }

  return users;
};

module.exports = generateFakeUsers;
