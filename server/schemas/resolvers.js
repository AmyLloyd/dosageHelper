const { Client, Vet, PetPatient, Prescription } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    client: async () => {
      return Client.find({});
    },
    petPatient: async () => {
        return PetPatient.find({});
    }

  },
  Mutation: {
    createClient: async (parent, args) => {
      const client = await Client.create(args);
      return client;
    },
    createPetPatient: async (parent, args) => {
        const petPatient = await PetPatient.create(args);
        return petPatient;
    },
    addVet: async (parent, { name, email, password }) => {
      const vetUser = await Vet.create({ name, email, password });
      const token = signToken(profile);
      return { token, profile };
    },
    login: async (parent, {email, password }) => {
      const vet = await UserActivation.findOne({ email });

      if(!vetUser) {
        throw AuthenticationError;
      }

      const correctPw = await vet.isCorrectPassword(password);

      if(!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(vet);

      return { token, user };
    },

  },

};

module.exports = resolvers;