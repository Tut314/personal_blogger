import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Task Manager (Frontend OK)</h1>
      <p className="mt-2">Next: connect to Flask backend & Firebase Auth.</p>
      <Link className="text-blue-600 underline" to="/login">
        Go to Login
      </Link>
    </div>
  );
}

function Login() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Login (placeholder)</h2>
      <p>We'll wire Firebase Auth soon.</p>
      <Link className="text-blue-600 underline" to="/">
        Back
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
