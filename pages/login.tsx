import router from "next/router";
import React, { useState } from "react";
import httpClient from "../api/httpClient";
import { setStorage } from "../helper/storage";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginRefreshToken = () => {
    httpClient
      .post("/login-refresh-token", { username, password })
      .then((res) => {
        console.log(res.data);
        setStorage("my-token", res.data.token);
        setStorage("my-refresh-token", res.data.refresh_token);
        router.push("/product");
      });
  };

  return (
    <div className="login container mx-auto">
      <input
        className="my-2"
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        className="my-2"
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className="btn my-2" onClick={handleLoginRefreshToken}>
        Login
      </button>
    </div>
  );
};

export default login;
