import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'test@admin.com',
    password: bcrypt.hashSync('123456789'),
    isAdmin: true,
  },
  {
    name: 'Labesh',
    email: 'labesh0@test.com',
    password: bcrypt.hashSync('123456789'),
  },
  {
    name: 'Labesh',
    email: 'labesh1@test.com',
    password: bcrypt.hashSync('123456789'),
  },
];

export default users;
