/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { axiosClient } from '@/lib/axiosClient';
import Swal from 'sweetalert2';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axiosClient.post('/auth/forgot-password', { email });
            Swal.fire({
                title: 'Berhasil!',
                text: response.data.message || 'Link reset password telah dikirim ke email Anda.',
                icon: 'success',
            }).then(() => {
                router.push('/auth/login'); // Redirect ke halaman login
            });
        } catch (error: any) {
            const errMsg =
                error?.response?.data?.message || 'Gagal mengirim permintaan. Coba lagi nanti.';
            Swal.fire({
                title: 'Gagal!',
                text: errMsg,
                icon: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Lupa Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Masukkan email kamu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full rounded mb-2"
                    required
                />
                <button
                    type="submit"
                    className={`bg-blue-600 text-white px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Mengirim...' : 'Kirim Link Reset'}
                </button>
            </form>
        </div>
    );
}