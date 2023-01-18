'use client';

import React from 'react';
import './globals.css';
import QueryClientProv from './QueryClientProv';

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body>
                <QueryClientProv>
                    {children}
                </QueryClientProv>
            </body>
        </html>
    );
}
