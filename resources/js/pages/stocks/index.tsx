import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stok',
        href: '/stocks',
    },
];

export default function Stocks() {
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stok" />
            <div className='p-4'>Stocks</div>
        </AppLayout>
    )
}
