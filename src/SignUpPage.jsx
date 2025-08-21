import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', username: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignUp = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Signup failed');
      localStorage.setItem('token', 'mock-token');
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <input name="username" type="text" placeholder="Username" className="w-full mb-4 p-2 border rounded" value={form.username} onChange={handleChange} />
        <input name="name" type="text" placeholder="Full Name" className="w-full mb-4 p-2 border rounded" value={form.name} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" className="w-full mb-4 p-2 border rounded" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded" value={form.password} onChange={handleChange} />
        <button onClick={handleSignUp} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Create Account
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
