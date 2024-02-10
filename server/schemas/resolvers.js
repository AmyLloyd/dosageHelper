const { ClientUser, VetUser, PetPatient, Prescription, Admin } = require('../models');

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
    }
  },
};

module.exports = resolvers;