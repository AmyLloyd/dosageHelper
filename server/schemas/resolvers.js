const { Client, Vet, Patient, Prescription, Drug } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const db = require('../config/connection');

const resolvers = {
  Query: {
    vets: async () => {
      return await Vet.find({}).populate('clients').populate({
        path:'clients',
        populate: 'vet'
      });
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
      return Prescription.find({}).populate('prescriber', 'drug')
    },
    prescription: async(parent, args) => {
      return Prescription.findById(args.id).populate('prescriber', 'drug')
    },
    drugs: async() => {
      return Drug.find({})
    },
    drug: async(parent, args) => {
      return Drug.findById(args.id)
    }
  },

  Mutation: {
    addVet: async (parent, { username, email, password }) => {
      const vet = await Vet.create({ username, email, password });
      const token = signToken(vet);
      return { token, vet };
    },
    addClientToVet: async (parent, { vetId, username, email, password }) => {
      Vet.findOneAndUpdate(
        {_id: vetId},
        {
          $addToSet: { patients: { username, email, password }},
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    
    addPatient(_, args) {
      let patient = {
        ...args.patient,
        id: Math.floor(Math.random() * 10000).toString()
      }
      Patient.push(patient)

      return patient
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
