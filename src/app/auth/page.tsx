// Suggested code may be subject to a license. Learn more: ~LicenseLog:2168146446.
// src/app/auth/page.tsx
import React from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

const AuthPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-6xl font-bold text-center">Authentication</h1>
        <div className="flex flex-col items-center justify-center mt-10">
          <h2 className="text-3xl font-semibold">Sign Up</h2>
      <SignupForm />
          <h2 className="text-3xl font-semibold mt-10">Login</h2>
      <LoginForm />
    </div>
      </div>
    </main>
  );
};

export default AuthPage;