import { useState } from "react";

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const endpoint = isLogin ? "login" : "register";
    try {
      const res = await fetch(`http://localhost:8080/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      localStorage.setItem("token", data.token);
      onAuthSuccess();
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", height: "100vh", background: "#1a1a1a", color: "#fff"
    }}>
      <form onSubmit={handleSubmit} style={{
        display: "flex", flexDirection: "column", gap: "10px", width: "280px"
      }}>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required
          style={{ padding: "8px" }}
        />
        <input
          type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required
          style={{ padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px", cursor: "pointer" }}>
          {isLogin ? "Login" : "Register"}
        </button>
        <p style={{ cursor: "pointer", fontSize: "13px" }} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need an account? Register" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default Auth;