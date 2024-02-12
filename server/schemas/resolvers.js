const { Client, Vet, PetPatient, Prescription } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    vets: async () => {
      return Vet.find({}).populate('clients')
    },
    vet: async (parent, args)=> {
      return await Vet.findById(args.id).populate('clients');
    },
    me: async (parent, args, context) => {
      if (context.vet) {
        return Vet.findOne({ _id: context.vet._id }).populate('clients');
      } 
      throw AuthenticationError;
    },
  },

  Mutation: {
    addVet: async (parent, { username, email, password }) => {
      const vet = await Vet.create({ username, email, password });
      const token = signToken(vet);
      return { token, vet };
    },
    login: async (parent, {email, password }) => {
      const vet = await Vet.findOne({ email });

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


  //   addClient: async (parent, {username, email, password, pets}) => {
  //     const client = await Client.create({username, email, password, pets});
  //     return client;
  //   },
  //   addPetPatient: async (parent, {name, pet_type, condition_description, prescriptions }) => {
  //       const petPatient = await PetPatient.create({name, pet_type, condition_description, prescriptions });
  //       return petPatient;
  //   },
  //   addVet: async (parent, { name, email, password, clients }) => {
  //     const vet = await Vet.create({ name, email, password, clients });
  //     const token = signToken(vet);
  //     return { token, vet };
  //   },