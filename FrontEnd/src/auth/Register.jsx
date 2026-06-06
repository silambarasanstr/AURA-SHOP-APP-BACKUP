import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, getCurrentUser, getToken, registerUser } from "../services/authService";
import toast from "react-hot-toast";
import Button from "../components/common/Button";
import FormInput from "../components/common/FormInput";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(userData);
      toast.success("Registration Successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
        <h2 className="mb-2 text-3xl font-bold text-center text-gray-800">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Name"
            name="name"
            type="text"
            value={userData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
          <Button type="submit">Register</Button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
