import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';

const RolesPage: React.FC<{ roles: { id: number; name: string }[] }> = ({ roles }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/roles', { name });
    };

    return (
        <Authenticated header={<h2 className='page-haed'>Roles and permissions</h2>}>
            <Head title='Roles and permissions' />

            <section className="p-4">
                <h1>Manage Roles</h1>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Role Name"
                    />
                    <Button type="submit">Add Role</Button>
                </form>
                <ul>
                    {roles.map((role) => (
                        <li key={role.id}>{role.name}</li>
                    ))}
                </ul>
            </section>
        </Authenticated>
    );
};

export default RolesPage;
