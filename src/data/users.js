const users = [
  {
    email: "atapas@email.com",
    password: "password",
    generations: 2,
  },
  {
    email: "alex@email.com",
    password: "password",
    generations: 3,
  },
  {
    email: "bob@email.com",
    password: "password",
    generations: 4,
  },
];

export const getUserByEmail = (email) => {
  const found = users.find((user) => user.email === email);
  return found;
};
