const typeDefs = `
    type Client {
        _id: ID!
        username: String
        email: String
        password: String
        is_client: Boolean
        patients: [Patient]
    } 
    type ClientInfo {
        vet: Vet
        password: String!
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
        created_at: String
        drug: Drug!
        dose_frequency: Int
        instructions: String
        quantity: Int
        course_length: Int
        prescriber: Vet
        number_of_dosages: Int
        time_of_dosages: [String]
        dosage_checked_at: String
        dosage_notes: String
        active: Boolean
    }

    type Drug {
        _id: ID!
        name: String!
        strength: String
        type: String
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

    type Query {
        vets: [Vet]
        vet(id: ID!): Vet

        me: Vet
        clients: [Client]
        client(id: ID!): Client
        clientsByVet: [Vet]
        myClients: Vet
        patients: [Patient]
        patient(id: ID!): Patient
        prescriptions: [Prescription]
        prescription(id: ID!): Prescription
        drugs: [Drug]
        drug(id: ID!): Drug
    }
    
    type Mutation {
        signUpVet(username: String!, email: String!, password: String!): Auth
        addPatient(patient: PatientInput!): Patient
        updateVet(username: String, email: String, password: String): Vet
        loginVet(email: String!, password: String!): Auth
        createClient(username: String!, email: String!, password: String! vet: String!): Client
        loginClient(email: String!, password: String!): Auth

        addClientToVet( username: String!, email: String!, password: String!): Vet
        addPatientToClient(name: String!, animal_type: String!, condition_description: String!, client_id: ID!): Client

        addPrescriptionToPatient(dose_frequency: Int!, instructions: String, quantity: Int, course_length: Int, prescriber: ID, number_of_dosages: Int, time_of_dosages: [String], dosage_notes: String, patient_id: ID!): Patient

        addDrugToPrescription(drug_id: ID!, prescription_id: ID!): Prescription  
    }

`;

module.exports = typeDefs;
