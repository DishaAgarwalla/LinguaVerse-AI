import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave, FaUser, FaEnvelope, FaSpinner, FaCheck } from "react-icons/fa";

export default function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from localStorage (same source as Dashboard)
    const userName = localStorage.getItem("userName") || "User";
    const userEmail = localStorage.getItem("userEmail") || "user@example.com";
    
    setName(userName);
    setEmail(userEmail);
    setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setSaving(true);
    
    try {
      // Save to localStorage (same source as Dashboard)
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/profile");
      }, 1500);
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <FaSpinner className="w-12 h-12 text-blue-500 animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-slideUp">
      <div className="flex items-center gap-4">
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
        >
          <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Profile
        </Link>
        <div className="h-6 w-px bg-gray-300" />
        <span className="text-sm text-gray-500">Edit Profile</span>
      </div>

      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Edit Profile
        </h1>
        <p className="mt-2 text-gray-500">
          Update your personal information and preferences.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-lg shadow-gray-100/50 border border-gray-100/50">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Personal Information</h2>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaUser className="w-4 h-4 text-blue-500" />
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaEnvelope className="w-4 h-4 text-blue-500" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300"
              placeholder="Enter your email address"
              required
            />
            <p className="mt-1 text-xs text-gray-400">This is the email associated with your account.</p>
          </div>

          {success && (
            <div className="rounded-xl bg-green-50 border border-green-200 p-3 text-green-700 text-sm animate-slideDown flex items-center gap-2">
              <FaCheck className="w-4 h-4" />
              Profile updated successfully! Redirecting...
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
            
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-3 font-medium text-gray-600 transition-all duration-300 hover:border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>

      {/* Security Note */}
      <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-4">
        <div className="flex items-start gap-3">
          <div className="text-yellow-600 text-lg">🔒</div>
          <div>
            <p className="text-sm font-medium text-yellow-800">Security Note</p>
            <p className="text-sm text-yellow-700">
              To change your password, please use the password reset feature or contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}