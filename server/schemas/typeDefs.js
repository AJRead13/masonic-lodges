const typeDefs = `
  type User {
    _id: ID
    firstName: String,
    lastName: String,
    email: String
  }

  type Query {
    user(userId: ID!): User
  }
`;

module.exports = typeDefs;
