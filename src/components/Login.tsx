"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginModal = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (
      credentials.email === "admin@road2tech.in" &&
      credentials.password === "Admin@1234"
    ) {
      const res = axios.post("/api/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });
      toast.promise(res, {
        loading: "Logging in...",
        success: () => {
          (
            document.getElementById("login_modal") as HTMLDialogElement
          )?.close();
          router.push("/admin");
          return "Login successful!";
        },
        error: (error) => {
          console.error(error);
          return "Login failed. Please try again.";
        },
      });
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <dialog id="login_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-xl mb-4">Admin Login</h3>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <div className="modal-action">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default LoginModal;
