import  {  gql  }  from  'apollo-server-micro'; 

export const typeDefs = gql`
    type  User {
        id: ID
        login: String
        avatar_url: String
    }

    type After {
        ok: String
        data: String
        error: String
    }

    type Login {
        ok: String
        token: String
        error: String
    }

    type  Query {
        getUsers: [User]
        getUser(name: String!): User!
        login(email: String!, password: String!): Login
    }

    type Mutation {
        createUser(email: String!, password: String!): After
    }
`;