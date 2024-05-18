const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
    Query: {
        user: async (parent, { userId }) => {
            return User.findOne({_id: userId});
        }
    },

    Mutation: {
        addUser: async(parent, {firstName, lastName, email, password}) => {
            const user = await User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });

            const token = signToken(user);

            return {token, user}
        },
        login: async(parent, {email, password}) => {
            const user = await User.findOne({ email });

            if(!user) throw AuthenticationError;

            const validPassword = await user.isValidPassword(password);

            if (!validPassword) throw AuthenticationError;

            const token = signToken(user);
            return { token, user };
        }
    }
}

module.exports = resolvers;