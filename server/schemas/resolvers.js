const { Client, Vet, Patient, Prescription, Drug } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

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
        console.log(context.user._id, "user");
        return Vet
        .findById({ _id: context.user._id })
        .populate({
          path:     'clients',
          populate: {
            path:  'patients',
            populate: {
                path: 'prescriptions',
                populate: {
                  path: 'drug'
                }
            }
          },
        });
      }
      return  AuthenticationError;
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
      return Prescription.find({}).populate('drug');
    },
    prescription: async(parent, args) => {
      return Prescription.findById(args.id).populate('drug')
    },
    drugs: async() => {
      return await Drug.find({});
    },

    drug: async(parent, args) => {
      return await Drug.findById(args.id)
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
        try {
          const client = await Client.create({ username, email, password });
          const vet = await Vet.findOneAndUpdate(
            {_id:context.user._id},
            { $addToSet: {clients:client._id}},
            { new: true })

          return vet;
        } catch (err) {
          console.log(err);
        }
      }
    },
    addPatientToClient: async (parent, args, context) => {

      if(context.user) {
        try {
          console.log(context.user, "context.user");
          const patient = await Patient.create({
            name: args.name,
            animal_type: args.animal_type,
            condition_description: args.condition_description
          });
          console.log(patient, "patient");
          const client = await Client.findOneAndUpdate(
            {_id: args.client_id},
            { $addToSet: { patients: patient._id }},
            { new: true }
          ).populate('patients')

          return client;

        } catch (err) {
          console.log(err);
        }
      }
    },
    addPrescriptionToPatient: async (parent, args, context) => {

      if(context.user) {
        try {
 
          const prescription = await Prescription.create({
            dose_frequency: args.dose_frequency,
            instructions: args.instructions,
            quantity: args.quantity,
            course_length: args.course_length,
            prescriber: args.prescriber,
            number_of_dosages: args.number_of_dosages,
            time_of_dosages: args.time_of_dosages,
            dosage_checked_at: args.dosage_checked_at,
            dosage_notes: args.dosage_notes
          });
  
          const patient = await Patient.findOneAndUpdate(
            {_id: args.patient_id},
            { $addToSet: { prescriptions: prescription._id }},
            { new: true }
          ).populate({
            path: 'prescriptions',
            populate: {
              path: 'drug'
            }          
          });
   
          return patient;

        } catch (err) {
          console.log(err);
        }
      }
    },
    addDrugToPrescription: async (parent, args, context) => {
      if(context.user) {
        try {

          const drug_id = await Drug.findById({_id: args.drug_id});
          console.log(drug_id, "drug_id");
          const prescription = await Prescription.findOneAndUpdate(
            {_id: args.prescription_id},
            { $set: { drug: drug_id }},
            { new: true }
          );
          console.log(prescription, "prescription");

          return prescription;

        } catch (err) {
          console.log(err);
        }
      }
    },
    loginVet: async (parent, {email, password }) => {
      const vet = await Vet.findOne({ email });

      if(!vet) {
        throw AuthenticationError("Vet not found with the provided email");
      }

      const correctPw = await vet.isCorrectPassword(password);

      if(!correctPw) {
        throw AuthenticationError("Incorrect password");
      }

      const token = signToken(vet);

      return { token, vet };
    },

    loginClient: async (parent, { email, password }) => {
      const client = await Client.findOne({ email });
      if(!client) {
        throw AuthenticationError;
      }
      const correctPw = await client.isCorrectPassword(password);
      if(!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(client);

      return { token, client };
    },
    updateVet: async (parent, args, context) => {
      if(context.user) {
      return Vet.findByIdAndUpdate(context.user._id, args, {
        new: true
      }).populate('clients');
      }
      
      throw AuthenticationError;
    },
    addClientToVet: async (parent, {username, email, password}, context) => {
      if(context.user ) {
        const client = await Client.create({ username, email, password });
        const vet = await Vet.findOneAndUpdate(
          {_id:context.user._id},
          { $addToSet: {clients:client._id}},
          { new: true }
          ).populate('clients')
        return { vet, password };
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
  },
};

// addClientToVet: async (parent, {username, email, password}, context) => {
//   if(context.user ) {
//     try {
//       const client = await Client.create({ username, email, password });
//       const vet = await Vet.findOneAndUpdate(
//         {_id:context.user._id},
//         { $addToSet: {clients:client._id}},
//         { new: true })

//       return vet;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// },

module.exports = resolvers;