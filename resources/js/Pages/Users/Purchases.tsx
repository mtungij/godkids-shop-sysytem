import Authenticated from '@/Layouts/AuthenticatedLayout'
import { User } from '@/types'
import UserTabs from '@/Utils/UserTabs'
import { Head } from '@inertiajs/react'
import React from 'react'

const Purchases = ({ user }: { user: User}) => {
  return (
    <Authenticated header={ <UserTabs user={user} />}>
        <Head title={`${user.name} Purchases`} />

        <section className='p-4'>
            This is the upcoming feature!
        </section>
    </Authenticated>
  )
}

export default Purchases