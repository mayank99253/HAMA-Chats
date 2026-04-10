import React from 'react'
import { LoaderIcon, LoaderPinwheel } from 'lucide-react'
const PageLoader = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <LoaderIcon className='animate-spin text-white' />
            {/* <LoaderPinwheel className='animate-spin text-white' /> */}
        </div>
    )
}

export default PageLoader