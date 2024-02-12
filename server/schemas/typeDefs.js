const typeDefs = `
    type Client {
        _id: ID!
        username: String!
        email: String!
        password: String!
        pets: [PetPatient]!
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

    type PetPatient {
        _id: ID!
        name: String!
        pet_type: String
        condition_description: String
        prescriptions: [Prescription]
    }

    type Auth {
        token: ID!
        vet: Vet
    }

    type Query {
        vets: [Vet]
        vet(username: String!): Vet
        me: Vet
    }
    
    type Mutation {
        addVet(username: String!, email: String!, password: String!): Vet
        login(email: String!, password:String!): Auth
    }

`;

module.exports = typeDefs;

// #type Mutation {
//     addVet(username: String!, email:String!, password: String!): Auth 
//     login(email: String!, password:String!): Auth
// //     addClient(username: String!, email:String!, password: String!): Auth
// //     addPetPatient(name: String!, pet_type: String!, condition_description: String!, prescriptions: ): PetPatient 
// }