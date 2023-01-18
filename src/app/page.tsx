'use client';

import { getUsers } from '../api';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
    const { isLoading, data } = useQuery(['users'], getUsers);
    console.log(data?.getUsers);
    return (
        <div>
            {
                !isLoading && (
                    data?.getUsers?.map((value:any, key:string) => (
                        <div key={key}>
                            {value.login}
                            {value.id}
                        </div>
                    ))
                )
            }
        </div>
    );
}
