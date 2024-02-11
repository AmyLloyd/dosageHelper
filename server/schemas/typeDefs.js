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

    type Auth {
        token: ID!
        //Is this right? or is it vet: Vet or user: User
        user: Vet
    }

    type Query {
        vets: [Vet]
        vet(username: String!): User
        clients: [Client]
        client(username: String!): Client
        //this could need to be user - vet/client
        me: Vet
    }
    
    type Mutation {
        addVet(username: String!, email:String!, password: String!): Auth 
        login(email: String!, password:String!): Auth
        addClient(username: String!, email:String!, password: String!): Auth
        addPetPatient(name: String!, pet_type: String!, condition_description: String!, perscriptions: [Prescription]): PetPatient 
    }
`;

module.exports = typeDefs;