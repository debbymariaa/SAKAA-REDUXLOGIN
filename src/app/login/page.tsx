"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import "./login.css";
import { login, selectUserStatus } from "@/redux/slices/userSlice";
import Link from "next/link";

const Login = () => {
  const status = useSelector(selectUserStatus);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      login({
        email: email,
        password: password,
      })
    );
  };

  const users = useSelector((state: any) => state.user.users);

  useEffect(() => {
    if (status === "loggedIn") {
      router.push("/logout"); // Redirect ke halaman logout setelah login
    }
  }, [status, router]);

  return (
    <div className="login">
      <form className="login_form" onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <input
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit" className="submit_button">
          Submit
        </button>
      </form>

      {status === "loginFailed" && (
        <p style={{ color: "red" }}>Login failed. Incorrect email or password.</p>
      )}

      {users.length > 0 ? (
        <ul>
          {users.map((user: any, index: number) => (
            <li key={index}>
              <strong>Name:</strong> {user.name} <br />
              <strong>Email:</strong> {user.email} <br />
              <p>{user.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          No registered users yet.{" "}
          <Link style={{ color: "blue" }} href="/register">
            Register
          </Link>
        </p>
      )}
    </div>
  );
};

export default Login;
