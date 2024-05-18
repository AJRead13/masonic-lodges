const typeDefs = `
  type User {
    _id: ID
    firstName: String,
    lastName: String,
    email: String
  }
  type Auth{
    token: ID!
    user: User
  }

  type Query {
    user(userId: ID!): User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
