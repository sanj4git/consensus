import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleRegister = async () => {
    setLoading(true);
    try {
      await api.post("/auth/register", formData);
      alert("Registration successful! Please login.");
      navigate("/");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      
      {/* 🔹 LOGO SECTION */}
      <div className="brand-section">
        <div className="brand-wrapper">
          <img src="/logo.jpeg" alt="Logo" className="brand-logo-img" />
          <h1 className="brand-title">Consensus</h1>
        </div>
        <p className="brand-subtitle">Join thousands of researchers today</p>
      </div>

      <Card className="auth-box">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Get started with your free account</p>
        </div>

        <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
             <label className="input-label">Email Address</label>
            <Input 
              placeholder="name@example.com" 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <label className="input-label">Password</label>
            <Input 
              type="password" 
              placeholder="Create a strong password" 
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <Button className="w-full" onClick={handleRegister} disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </Button>
        </div>
        
        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/" className="link">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
}