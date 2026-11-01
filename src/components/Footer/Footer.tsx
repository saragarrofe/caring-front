import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-[var(--color-bg-dark)] text-[var(--color-bg)] [[data-theme='dark']_&]:border-t [[data-theme='dark']_&]:border-white/[0.06] [[data-theme='dark']_&]:bg-[var(--color-bg-darker)]">
      <div className="mx-auto w-full max-w-2xl px-4">
        <p className="m-0 p-4 text-center">2024 Plant Care App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
