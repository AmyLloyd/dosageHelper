const typeDefs = `
    type ClientUser {
        _id: ID!
        username: String!
        email: String!
        pets: [pets]
    } 

    type VetUser {
        _id: ID!
        username: String!
        email: String!
        clients: [ClientUser]
    }

    type Auth {
        token: ID!
        user: User
    }
    
    `