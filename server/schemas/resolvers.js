const { Client, Vet, PetPatient, Prescription } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    clients: async () => {
      return await Client.find({}).populate('pets')
    },

  },
  Mutation: {
    createClient: async (parent, {username, email, password, pets}) => {
      const client = await Client.create({username, email, password, pets});
      return client;
    },
    createPetPatient: async (parent, {name, }) => {
        const petPatient = await PetPatient.create();
        return petPatient;
    },
    addVet: async (parent, { name, email, password }) => {
      const vet = await Vet.create({ name, email, password });
      const token = signToken(profile);
      return { token, vet };
    },
    login: async (parent, {email, password }) => {
      const vet = await UserActivation.findOne({ email });

      if(!vet) {
        throw AuthenticationError;
      }

      const correctPw = await vet.isCorrectPassword(password);

      if(!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(vet);

      return { token, vet };
    },

  },

};

module.exports = resolvers;