const typeDefs = `
    type Client {
        _id: ID!
        username: String!
        email: String!
        password: String!
        patients: [Patient]
    } 

    type Vet {
        _id: ID!
        username: String!
        email: String!
        password: String!
        clients: [Client]
    }

    type Prescription {
        _id: ID!
        date: Date!
        drug_name: String!
        drug_strength: String!
        drug_type: String!
        dose_frequency: Int!
        instructions: String
        quantity: Int!
        course_length: Int!
        prescriber: Vet!
        number_of_dosages: Int!
        time_of_dosages: [String]!
        dosage_checked: Date
        dosage_notes: String
    }

    type Patient {
        _id: ID!
        name: String!
        animal_type: String
        condition_description: String
        prescriptions: [Prescription]
    }

    type Auth {
        token: ID!
        vet: Vet
    }

    type Query {
        vets: [Vet]
        vet(_id: ID!): Vet
        me: Vet
        clients: [Client]
        client(_id: ID!): Client

        patients: [Patient]
        patient(_id: ID!): Patient
        prescriptions: [Prescription]
        prescription(_id: ID!): Prescription
    }
    
    type Mutation {
        addVet(username: String!, email: String!, password: String!): Vet
        login(email: String!, password:String!): Auth
        addClient(_id: ID!, username: String!, email: String!, password: String!): Client
    }

`;

module.exports = typeDefs;

// #type Mutation {
//     addVet(username: String!, email:String!, password: String!): Auth 
//     login(email: String!, password:String!): Auth
// //     addClient(username: String!, email:String!, password: String!): Auth
// //     addPetPatient(name: String!, pet_type: String!, condition_description: String!, prescriptions: ): PetPatient 
// }