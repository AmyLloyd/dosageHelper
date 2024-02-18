const { Client, Vet, Patient, Prescription, Drug } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const {signTokenClient, AuthenticationErrorClient } = require('../utils/authClient');

const resolvers = {
  Query: {
    vets: async () => {
      return await Vet.find().populate('clients');
    },
    vet: async (parent, args)=> {
      return await Vet.findById(args.id).populate('clients');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user, "context.user");
        return Vet.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    myClients: async (parent, args, context) => {
      if(context.user) {
        return Vet.findOne({ _id: context.user._id }).populate('clients');
      }
      return  AuthenticationError
    },
    client: async (parent, args) => {
      return await Client.findById(args.id).populate('patients')
    },
    clientsByVet: async (parent, args, context) => {
        return await Vet.findOne({_id: context.user._id}).populate('clients');
    },
    clients: async () => {
      return await Client.find({}).populate('patients')
    },
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
    },
  },

  Mutation: {
    signUpVet: async (parent, { username, email, password }) => {
      const vet = await Vet.create({ username, email, password });
      const token = signToken(vet);
      return { token, vet };
    },
    addClientToVet: async (parent, {username, email, password}, context) => {
      if(context.user ) {
        const client = await Client.create({ username, email, password });
        const vet = await Vet.findOneAndUpdate(
          {_id:context.user._id},
          { $push: {clients:client._id}}
          )
        const token = signTokenClient(client);
        return { token, client };
      }
      throw AuthenticationErrorClient;
      ('You need to be logged in!');
    },
    // addPatientToClient: async (parent, {$_id}, {name, animal_type, condition_description}, context) => {
    //   if(context.user) {
    //     const patient = await Patient.create({ name, animal_type, condition_description });
    //     const client = await Client.findOneAndUpdate(
    //       {_id: args._id},
    //       { $push: {patients: patient._id}}
    //       )
    //     const token = signTokenClient(client);
    //     return { token, patient };
    //   }
    // },
    addPatientToClient: async (parent, args, context) => {
      if(context.user) {
        const patient = await Patient.create(args.name, args.animalType, args.conditionDescription);
        const client = await Client.findOneAndUpdate(
          {_id: args.client._id},
          { $push: { patients: patient._id }}
        )
        const token = signToken(client);
        return {token, patient};
      }
    },
    loginVet: async (parent, {email, password }) => {
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
    // loginClient: async (parent, {email, password }) => {
    //   const client = await Client.findOne({ email });

    //   if(!client) {
    //     throw AuthenticationErrorClient;
    //   }

    //   const correctPw = await client.isCorrectPassword(password);

    //   if(!correctPw) {
    //     throw AuthenticationErrorClient;
    //   }

    //   const token = signTokenClient(client);

    //   return { token, client };
    // },
  }
};

module.exports = resolvers;
