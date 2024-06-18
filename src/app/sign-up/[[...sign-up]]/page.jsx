import React from 'react';

const SignUp = () => (
    <div>
      <h1>Sign Up Mock</h1>
      <p>This is a mock sign-up component for development/testing purposes.</p>
    </div>
);

export default function Page() {
    return (
        <main className="min-h-screen h-full flex items-center justify-center">
          <SignUp />
        </main>
    );
}
