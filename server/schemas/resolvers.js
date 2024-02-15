const { Client, Vet, Patient, Prescription } = require('../models');
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
    clients: async () => {
      return Client.find({}).populate('patients')
    },
    client: async (parent, args) => {
      return await Client.findById(args.id).populate('patients')
    },
    //crossover with vet ?
    // me: async (parent, args, context) => {
    //   if(context.client) {
    //     return Client.findOne({ _id: context.client._id }).populate('patients')
    //   }
    // },
    patients: async () => {
      return Patient.find({}).populate('prescriptions')
    },
    patient: async (parent, args) => {
      return Patient.findById(args.id).populate('prescriptions')
    },
    prescriptions: async() => {
      return Prescription.find({}).populate('prescriber')
    },
    prescription: async(parent, args) => {
      return Prescription.findById(args.id).populate('prescriber')
    }
  },

  Mutation: {
    addVet: async (parent, { username, email, password }) => {
      const vet = await Vet.create({ username, email, password });
      const token = signToken(vet);
      return { token, vet };
    },
    addClient: async (parent, { username, email, password }) => {
      const client = await Client.create({ username, email, password });
      const token = signToken(client);
      return { token, client };
    },
    updateVet: async (parent, { id, username }) => {
      return await Vet.findOneAndUpdate({ id: id }, { username },{new: true });    
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
