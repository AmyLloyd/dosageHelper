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
        created_at: String!
        drug_name: String!
        drug_strength: String!
        drug_type: String!
        dose_frequency: Int!
        instructions: String
        quantity: Int!
        course_length: Int!
        prescriber: Vet
        number_of_dosages: Int!
        time_of_dosages: [String]!
        dosage_checked_at: String
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
        vet(id: ID!): Vet
        me: Vet
        clients: [Client]
        client(id: ID!): Client

        patients: [Patient]
        patient(id: ID!): Patient
        prescriptions: [Prescription]
        prescription(id: ID!): Prescription
    }
    
    type Mutation {
        addVet(username: String!, email: String!, password: String!): Vet
        login(email: String!, password: String!): Auth
        addClient(_id: ID!, username: String!, email: String!, password: String!): Client
        updateVet(_id: ID!, username: String!): Vet
    }

`;

module.exports = typeDefs;

// #type Mutation {
//     addVet(username: String!, email:String!, password: String!): Auth 
//     login(email: String!, password:String!): Auth
// //     addClient(username: String!, email:String!, password: String!): Auth
// //     addPetPatient(name: String!, pet_type: String!, condition_description: String!, prescriptions: ): PetPatient 
// }