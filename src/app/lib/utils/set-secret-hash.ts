import { createHmac } from 'crypto';

const { NEXT_PUBLIC_USER_POOL_CLIENT_ID, NEXT_PUBLIC_USER_POOL_CLIENT_SECRET } = process.env;

export const setSecretHash = (email:string) => {
    const hasher = createHmac('sha256', NEXT_PUBLIC_USER_POOL_CLIENT_SECRET!);
    hasher.update(`${email}${NEXT_PUBLIC_USER_POOL_CLIENT_ID}`);
    return hasher.digest('base64');
};