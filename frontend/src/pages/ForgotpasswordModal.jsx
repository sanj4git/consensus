import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { api } from "../lib/api";

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, success, error

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    setStatus("idle");
    
    try {
      await api.post("/auth/forgot-password", { email });
      setStatus("success");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Failed to send reset link"));
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        
        {/* Close Button (X) */}
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Reset Password</h3>
          <p className="text-sm text-gray-500 mt-1">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-green-600 font-medium">Reset link sent!</p>
            <p className="text-sm text-gray-500 mb-4">Check your inbox.</p>
            <Button className="w-full" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="input-label">Email Address</label>
              <Input
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button className="w-full" onClick={handleSubmit} disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}