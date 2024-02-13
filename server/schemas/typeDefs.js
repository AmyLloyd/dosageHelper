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
        date: String
        drug_name: String
        drug_strength: String
        drug_type: String
        dosage: String
        instructions: String
        quantity: Int
        course_length: Int
        prescriber: [Vet]
        number_of_dosages: Int
        time_of_dosages: String
        dosages_checked: Boolean
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

    #cannot include me: Client
    type Query {
        vets: [Vet]
        vet(_id: String!): Vet
        me: Vet
        clients: [Client]
        client(_id: String!): Client  
    }
    
    type Mutation {
        addVet(username: String!, email: String!, password: String!): Vet
        login(email: String!, password:String!): Auth
        addClient(_id: String!, username: String!, email: String!, password: String!): Client
    }

`;

module.exports = typeDefs;

// #type Mutation {
//     addVet(username: String!, email:String!, password: String!): Auth 
//     login(email: String!, password:String!): Auth
// //     addClient(username: String!, email:String!, password: String!): Auth
// //     addPetPatient(name: String!, pet_type: String!, condition_description: String!, prescriptions: ): PetPatient 
// }