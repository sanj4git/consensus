import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import ForgotPasswordModal from "./ForgotPasswordModal"; 

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", formData);
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
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
        <p className="brand-subtitle">Many models - One verdict</p>
      </div>

      <Card className="auth-box">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to access your workspace</p>
        </div>

        {/* Form Inputs Container */}
        <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Email Field */}
          <div className="form-group">
            <label className="input-label">Email Address</label>
            <Input 
              placeholder="name@example.com" 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          {/* Password Field with Forgot Link */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="input-label" style={{ marginBottom: 0 }}>Password</label>
              
              {/* 👇 FIXED BUTTON: type="button" prevents accidental submit */}
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault(); 
                  setShowForgot(true);
                }}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#2563eb', /* Bright Blue */
                  fontSize: '0.8rem', 
                  fontWeight: '600', 
                  cursor: 'pointer',
                  padding: '0',
                  zIndex: 10,
                  textDecoration: 'none'
                }}
                className="hover:text-blue-700 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            
            <Input 
              type="password" 
              placeholder="••••••••" 
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <Button className="w-full" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Sign In"}
          </Button>
        </div>

        <div className="auth-footer">
          New to Consensus?{" "}
          <Link to="/register" className="link">
            Create Account
          </Link>
        </div>
      </Card>

      {/* 👇 Forgot Password Modal Popup */}
      <ForgotPasswordModal 
        isOpen={showForgot} 
        onClose={() => setShowForgot(false)} 
      />

    </div>
  );
}