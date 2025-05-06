'use client';

export default function ExpiredPassword() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="text-red-600 text-6xl mb-4">❗</div>
        <h1 className="text-2xl font-bold mb-2">Link Tidak Valid</h1>
        <p className="text-gray-600">Link ini telah kadaluarsa atau sudah pernah digunakan.</p>
      </div>
    </div>
  );
}