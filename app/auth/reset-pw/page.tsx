/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { axiosClient } from '@/lib/axiosClient';
import Swal from 'sweetalert2';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams!.get('user_id'); // Ambil user_id dari URL
  const token = searchParams!.get('token'); // Ambil token dari URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: 'Gagal!',
        text: 'Password dan konfirmasi password tidak cocok.',
        icon: 'error',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosClient.post(`/auth/reset-password/${userId}/${token}`, {
        new_password: newPassword,
      });

      Swal.fire({
        title: 'Berhasil!',
        text: response.data.message || 'Password berhasil direset.',
        icon: 'success',
      });

      router.push('/auth/login'); // Redirect ke halaman login setelah berhasil reset password
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message || 'Gagal mereset password. Coba lagi nanti.';
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
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Masukkan password baru"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 w-full rounded mb-2"
          required
        />
        <input
          type="password"
          placeholder="Konfirmasi password baru"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 w-full rounded mb-2"
          required
        />
        <button
          type="submit"
          className={`bg-blue-600 text-white px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Mengirim...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}