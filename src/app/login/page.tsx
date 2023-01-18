'use client';

import { CognitoLogin } from '../../api';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function login(){
    const { register, handleSubmit } = useForm({
        mode:'onSubmit'
    });
    const router = useRouter();

    const onValid = async (form:any) => {
        await CognitoLogin(form.email, form.password)
            .then((res:any) => {
                window.localStorage.setItem('access_token', res.token);
                router.push('/');
            });
    };

    useEffect(() => {
        if(window.localStorage.getItem('access_token')){
            router.replace('/');
        }
    },[]);

    return (
        <div>
            <form onSubmit={handleSubmit(onValid)}>
                <span>email</span>
                <span><input type="text" {...register('email')} /></span>
                <br />
                <span>password</span>
                <span><input type="password" {...register('password')} /></span>
                <br />
                <input type="submit" value="Login" />
            </form>
            <div>
            </div>
        </div>
    );
}