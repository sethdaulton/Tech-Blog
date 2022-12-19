const { User } = require('../models');

const userData = [{
    username: 'Ian',
    password: 'Floridababy'
}, 
{
    username: 'Seth',
    password: 'Base56'
},
{
    username: 'Madeline',
    password: 'nawlins'
}
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;