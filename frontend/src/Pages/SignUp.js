import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const signup = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });
      window.location.href = "/login";
    } catch (err) {
      setError("User already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Account</h2>

      <input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p style={styles.error}>{error}</p>}

      <button
        style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}
        onClick={signup}
        disabled={loading}
      >
        {loading ? "Creating..." : "Sign Up"}
      </button>

      <p style={styles.text}>
        Already have an account?{" "}
        <span
          style={styles.link}
          onClick={() => (window.location.href = "/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 360,
    margin: "100px auto",
    padding: 24,
    borderRadius: 8,
    background: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  heading: { textAlign: "center", color: "#333" },
  input: {
    padding: 10,
    borderRadius: 4,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  button: {
    padding: 10,
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 15,
  },
  error: { color: "red", fontSize: 13 },
  link: { color: "#4f46e5", cursor: "pointer", fontWeight: 500 },
  text: { textAlign: "center", fontSize: 14 },
};
