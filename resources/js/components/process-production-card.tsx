import React from 'react'
import { Badge } from './ui/badge'
import { PackageOpen, User } from 'lucide-react'

export default function ProcessProductionCard({ type, time, pj, item }: { type: 'input' | 'output', time: string, pj: string, item: string }) {
    return (
        <div className={`pb-2 p-1 rounded-md ${type === 'input' ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className='text-xs text-gray-800'>
                {time}
            </p>
            <div className=" mt-2">
                <Badge variant="secondary">
                    <User className='inline mb-1 mr-1' />
                    {pj}
                </Badge>
                <Badge variant="secondary" className={`text-white ${type === 'input' ? 'bg-green-700' : 'bg-red-700'}`}>
                    <PackageOpen className='inline mb-1 mr-1' />
                    {item}
                </Badge>
            </div>
        </div>
    )
}
