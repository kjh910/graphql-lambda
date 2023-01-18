import { gql } from '@apollo/client';
import client from '../apollo-client';

export const getUsers = async () => {
    return await client.query({
        query: gql`
            query getUsers {
                getUsers{
                    id
                    login
                }
            }
        `,
    }).then((res:any) => {
        return res.data;
    }).catch((err:any) => {
        return err;
    });
};

export const CognitoLogin = async (email: string, password: string) => {
    return await client.query({
        query: gql`
            query login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    ok
                    token
                }
            }
        `,
        variables:{
            email,
            password
        }
    }).then((res:any) => {
        return res.data.login;
    }).catch((err:any) => {
        console.log(err);
        return err;
    });
};