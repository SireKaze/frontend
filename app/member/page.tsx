"use client";

import React, { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '../component/ButtonProps';

const Member = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user.role !== "member") {
      router.push("/access"); // Redirect to home or another page if not a member
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/auth/login"); // Redirect to login if not authenticated
    return null;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Member Dashboard</h1>
      {status === "authenticated" && session?.user && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <h2>Welcome, {session.user.name}!</h2>
            <p>Email: {session.user.email}</p>
            <p>Role: {session.user.role}</p>
          </div>
          <Button
            onClick={() => {
              signOut();
            }}
            colorSchema="blue"
            title="Logout"
          />
          <Button
            onClick={() => {
              router.push('/book');
            }}
            colorSchema="green"
            title="Go to Book Page"
          />
        </>
      )}
    </div>
  );
};

export default Member;