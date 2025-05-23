'use client'

import dynamic from 'next/dynamic'

const AdminPanel = dynamic(() => import('./AdminPanel'), {
    ssr: false,
    loading: () => <p>Загрузка административной панели...</p>,
})

export default function AdminPage() {
    return <AdminPanel />
}
