export default function ForgotPasswordPage() {
    const handleSubmit = () => {
      alert('Password reset link sent!');
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Forgot Password</h2>
          <input type="email" placeholder="Enter your email" className="w-full mb-4 p-2 border rounded" />
          <button onClick={handleSubmit} className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
            Send Reset Link
          </button>
          <p className="mt-4 text-sm text-center">
            Remembered your password? <a href="/login" className="text-blue-500 hover:underline">Login</a>
          </p>
        </div>
      </div>
    );
  }
  