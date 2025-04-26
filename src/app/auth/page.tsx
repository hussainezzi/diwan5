// src/app/auth/page.tsx
import React from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

const AuthPage: React.FC = () => {
  return (
    <div>
      <h1>Authentication</h1>
      <h2>Sign Up</h2>
      <SignupForm />
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
};

export default AuthPage;