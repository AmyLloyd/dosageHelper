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
        drug: Drug!
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

    type Drug {
        _id: ID!
        name: String!
        strength: String!
        type: String!
    }

    type Patient {
        _id: ID!
        name: String!
        animal_type: String
        condition_description: String
        prescriptions: [Prescription]
    }

    input PatientInput {
        name: String
        animal_type: String!
        condition_description: String
    }

    type Auth {
        token: ID!
        vet: Vet
    }

    type AuthClient {
        token: ID!
        client: Client
    }

    type Query {
        vets: [Vet]
        vet(id: ID!): Vet
        Vet(id: ID!): Vet

        
        me: Vet
        clients: [Client]
        client(id: ID!): Client
        Client(vetId: ID!): Vet
        clientsByVet: [Vet]

        patients: [Patient]
        patient(id: ID!): Patient
        prescriptions: [Prescription]
        prescription(id: ID!): Prescription
        drugs: [Drug]
        drug(id: ID!): Drug

    }
    
    type Mutation {
        addVet(username: String!, email: String!, password: String!): Auth
        addClientToVet( username: String!, email: String!, password: String!): AuthClient
        addPatient(patient: PatientInput!): Patient
        updateVet(_id: ID!, username: String!): Vet
        loginVet(email: String!, password: String!): Auth
        createClient(username: String!, email: String!, password: String! vet: String!): Client
        loginClient(email: String!, username: String!, password: String!): AuthClient
        addPatientToVet(name: String!, animal_type: String!, condition_description: String!, prescriptions: [String]): Auth

       
        

    
    }

`;

module.exports = typeDefs;
