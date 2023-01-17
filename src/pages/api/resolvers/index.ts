import axios from 'axios';

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
    }
  }
};