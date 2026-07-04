import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, getToken } from "../services/authService";
import toast from "react-hot-toast";
import Button from "../components/common/Button";
import FormInput from "../components/common/FormInput";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const demoCredentials = {
    admin: {
      email: "admin@example.com",
      password: "12345",
    },
    user: {
      email: "user@example.com",
      password: "12345",
    },
  };

  const fillDemoCredentials = (role) => {
    setFormData(demoCredentials[role]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginUser({ email: formData.email, password: formData.password });
      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (getToken()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
        <h2 className="mb-2 text-3xl font-bold text-center text-gray-800">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />

          <Button type="submit" loading={loading} loadingText="Logging in...">
            Login
          </Button>
        </form>

        {/* Demo Accounts */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-center text-gray-600">Demo Accounts</h3>

          <div className="space-y-3">
            {/* Admin */}
            <div
              onClick={() => fillDemoCredentials("admin")}
              className="p-3 transition border border-blue-200 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-blue-700">👑 Admin</span>

                <span className="text-[11px] text-blue-600">Click to Fill</span>
              </div>

              <p className="text-xs text-gray-700">
                <strong>Email:</strong> {demoCredentials.admin.email}
              </p>

              <p className="text-xs text-gray-700">
                <strong>Password:</strong> {demoCredentials.admin.password}
              </p>
            </div>

            {/* User */}
            <div
              onClick={() => fillDemoCredentials("user")}
              className="p-3 transition border border-green-200 rounded-lg cursor-pointer bg-green-50 hover:bg-green-100"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-green-700">👤 User</span>

                <span className="text-[11px] text-green-600">Click to Fill</span>
              </div>

              <p className="text-xs text-gray-700">
                <strong>Email:</strong> {demoCredentials.user.email}
              </p>

              <p className="text-xs text-gray-700">
                <strong>Password:</strong> {demoCredentials.user.password}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
