
import { CognitoIdentityProviderClient, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import * as AWSCognitoIdentity from 'amazon-cognito-identity-js';

import axios from 'axios';

const { NEXT_PUBLIC_USER_POOL_CLIENT_ID, NEXT_PUBLIC_REGION, NEXT_PUBLIC_USER_POOL_ID } = process.env;

export const resolvers = {
    Query: {
        getUsers: async () => {
            const users = await axios.get('https://api.github.com/users');
            return users.data.map(({ id, login, avatar_url }:{id:any, login: any, avatar_url:any}) => ({
                id,
                login,
                avatar_url
            }));
        },
        getUser: async (_:any, args:any) => {
            const user = await axios.get(
                `https://api.github.com/users/${args.name}`
            );
            return {
                id: user.data.id,
                login: user.data.login,
                avatar_url: user.data.avatar_url
            };
        },
        login: async (_:any, args:any) => {
            const userPoolData = {
                UserPoolId: NEXT_PUBLIC_USER_POOL_ID!,
                ClientId: NEXT_PUBLIC_USER_POOL_CLIENT_ID!
            };

            const userData = {
                Username: args.email,
                Pool: new AWSCognitoIdentity.CognitoUserPool(userPoolData)
            };

            const authenticationData = {
                Username: args.email,
                email: args.email,
                Password: args.password
            };

            const cognitoUser = new AWSCognitoIdentity.CognitoUser(userData);
            const authenticationDetails = new AWSCognitoIdentity.AuthenticationDetails(authenticationData);

            return await new Promise((resolve, reject) => {
                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: function (result: AWSCognitoIdentity.CognitoUserSession) {
                        resolve(
                            {
                                ok: true,
                                error: null,
                                token: result.getIdToken().getJwtToken()
                            }
                        );
                    },
                    onFailure: function (err) {
                        reject(err.message);
                    }
                });
            });
        }
    },
    Mutation: {
        createUser: async (_:any, args:any) => {
            const params:any = {
                ClientId: NEXT_PUBLIC_USER_POOL_CLIENT_ID,
                Password: args.password,
                Username:args.email,
                UserAttributes: [
                    {
                        Name: 'email',
                        Value: args.email
                    }
                ],
                ValidationData: [ 
                    {
                        Name: 'email',
                        Value: args.email
                    }
                ]
            };

            const cognitoClient = new CognitoIdentityProviderClient({
                region: NEXT_PUBLIC_REGION
            });

            const signUpCommand = new SignUpCommand(params);

            try {
                const response = await cognitoClient.send(signUpCommand);

                return {
                    ok:response
                };
            } catch (err) {
                console.log(err);
                return {
                    error:'error'
                };
            }
        },
    }
};