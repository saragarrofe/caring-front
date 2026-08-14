const API = import.meta.env.VITE_API_URL;

export const apiLogin = async (email: string, password: string) => {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

export const apiLogout = async () => {
  const res = await fetch(`${API}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Logout failed');
};

export const getMe = async () => {
  const res = await fetch(`${API}/auth/me`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Not authenticated');
  return res.json();
};

export const apiRegister = async (email: string, password: string) => {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};
