const { ClientUser, VetUser, PetPatient, Prescription, Admin } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    clientuser: async () => {
      return ClientUser.find({});
    },
    petPatient: async () => {
        return PetPatient.find({});
    }

  },
  Mutation: {
    createClientUser: async (parent, args) => {
      const clientUser = await ClientUser.create(args);
      return clientUser;
    },
    createPetPatient: async (parent, args) => {
        const petPatient = await PetPatient.create(args);
        return petPatient;
    },
    addVetUser: async (parent, { name, email, password }) => {
      const vetUser = await VetUser.create({ name, email, password });
      const token = signToken(profile);
      return { token, profile };
    },
    login: async (parent, {email, password }) => {
      const vetUser = await UserActivation.findOne({ email });

      if(!vetUser) {
        throw AuthenticationError;
      }

      const correctPw = await vetUser.isCorrectPassword(password);

      if(!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(vetUser);

      return { token, user };
    },

  },

};

module.exports = resolvers;