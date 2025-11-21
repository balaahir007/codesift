import React, { useEffect, useRef, useState } from "react";
import { Moon, Sun, User, Lock, Bell, LogOut, Settings, Trash2, X } from "lucide-react";
import useThemeStore from "../../zustand/themeStore";
import useAuthStore from "../../zustand/auth/useAuthStore";
import axiosInstance from "../../utils/axiosInstance";

const SettingsPage = () => {
  const { mode } = useThemeStore()
  const [notifications, setNotifications] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordMode, setPasswordMode] = useState('change'); // 'change' or 'forgot'
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  // Theme colors
  const bgPrimary = mode === 'dark' ? 'bg-[#0F1419]' : 'bg-white';
  const bgSecondary = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-gray-50';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';

  const toggleMode = () => setMode(mode === 'dark' ? 'light' : 'dark');
  const deleteModalRef = useRef(null);
  const passwordModalRef = useRef(null);


  // Scroll modal into center when it opens
  useEffect(() => {
    if (passwordModalRef && passwordModalRef.current) {
      passwordModalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showPasswordModal]);

  const { authUser, logout } = useAuthStore()
  // Scroll modal into center when it opens
  useEffect(() => {
    if (showDeleteModal && deleteModalRef.current) {
      deleteModalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showDeleteModal]);

  const [logoutLoading, setLogoutLoading] = useState(false)


  const handleLogout = async () => {
    try {
      setLogoutLoading(true)
      logout()
    } catch (error) {

    } finally {
      setLogoutLoading(false)
    }
  }


  const resetPasswrod = async()=>{
    try {
      const res = await axiosInstance.post('/user/password/reset-password')
      console.log("navigate : ",res);
    } catch (error) {
      
    }
  }
  return (
    <>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto">
          <div ref={deleteModalRef} // attach the ref
            className={`rounded-2xl p-6 w-full max-w-md border border-red-300 ${mode === 'dark' ? 'bg-red-950' : 'bg-red-50'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-red-600">Delete Account</h3>
              <button onClick={() => { setShowDeleteModal(false); setDeleteConfirmation(''); }} className="text-red-600 hover:text-red-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <p className={`text-sm ${textSecondary} mb-4`}>
                This action cannot be undone. Your account, data, and all associated information will be permanently deleted.
              </p>
              <p className={`text-sm ${textSecondary} mb-3`}>
                Type "<strong>DELETE</strong>" to confirm:
              </p>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder='Type "DELETE" to confirm'
                className={`w-full p-2 rounded-lg border ${borderColor} ${bgPrimary} ${textPrimary}`}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setShowDeleteModal(false); setDeleteConfirmation(''); }}
                className={`flex-1 px-4 py-2 rounded-lg border ${borderColor} ${textPrimary} hover:${bgSecondary} transition`}
              >
                Cancel
              </button>
              <button
                disabled={deleteConfirmation !== 'DELETE'}
                className={`flex-1 px-4 py-2 rounded-lg text-white transition ${deleteConfirmation === 'DELETE' ? 'bg-red-600 hover:bg-red-700 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div ref={passwordModalRef} className={`rounded-2xl p-6 w-full max-w-md border ${borderColor} ${bgSecondary}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${textPrimary}`}>
                {passwordMode === 'change' ? 'Change Password' : 'Reset Password'}
              </h3>
              <button onClick={() => setShowPasswordModal(false)} className={`${textSecondary} hover:${textPrimary}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {passwordMode === 'change' && (
                <>
                  <div>
                    <label className={`block text-sm ${textSecondary} mb-1`}>Current Password</label>
                    <input type="password" placeholder="Enter current password" className={`w-full p-2 rounded-lg border ${borderColor} ${bgPrimary} ${textPrimary}`} />
                  </div>
                  <div>
                    <label className={`block text-sm ${textSecondary} mb-1`}>New Password</label>
                    <input type="password" placeholder="Enter new password" className={`w-full p-2 rounded-lg border ${borderColor} ${bgPrimary} ${textPrimary}`} />
                  </div>
                  <div>
                    <label className={`block text-sm ${textSecondary} mb-1`}>Confirm Password</label>
                    <input type="password" placeholder="Confirm new password" className={`w-full p-2 rounded-lg border ${borderColor} ${bgPrimary} ${textPrimary}`} />
                  </div>
                </>
              )}

              {passwordMode === 'forgot' && (
                <>
                  <div>
                    <label className={`block text-sm ${textSecondary} mb-1`}>Email Address</label>
                    <input type="email" placeholder="Enter your email" defaultValue={authUser?.email || "user@example.com"} className={`w-full p-2 rounded-lg border ${borderColor} ${bgPrimary} ${textPrimary}`} />
                  </div>
                  <p className={`text-sm ${textSecondary}`}>We'll send you a link to reset your password.</p>
                </>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowPasswordModal(false)} className={`flex-1 px-4 py-2 rounded-lg border ${borderColor} ${textPrimary} hover:${bgSecondary} transition`}>
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-[#0097B2] text-white rounded-lg hover:bg-[#007D93] transition">
                {passwordMode === 'change' ? 'Update Password' : 'Send Reset Link'}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={`min-h-screen p-6 transition-colors duration-300 bg-backGray`}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Settings className={`w-6 h-6 ${textPrimary}`} />
              <h1 className={`text-2xl font-semibold ${textPrimary}`}>Settings</h1>
            </div>
            {/* <button
              onClick={toggleMode}
              className={`p-2 rounded-lg transition ${mode === 'dark' ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}
            >
              {mode === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button> */}
          </div>

          {/* Profile Section */}
          <div className={`rounded-2xl p-6 mb-6 border ${borderColor} ${bgSecondary}`}>
            <div className="flex items-center gap-3 mb-4">
              <User className={`w-5 h-5 ${textPrimary}`} />
              <h2 className={`text-lg font-semibold ${textPrimary}`}>Profile</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm ${textSecondary} mb-1`}>Full Name</label>
                <input
                  type="text"
                  defaultValue={authUser?.username || "username"}
                  className={`w-full p-2 rounded-lg border ${borderColor} ${bgPrimary} ${textPrimary}`}
                />
              </div>
              <div>
                <label className={`block text-sm ${textSecondary} mb-1`}>Email</label>
                <input
                  type="email"
                  defaultValue={authUser?.email || "user@example.com"}
                  className={`w-full p-2 rounded-lg border ${borderColor} ${bgPrimary} ${textPrimary}`}
                />
              </div>
              {/* <button className="mt-2 px-4 py-2 bg-[#0097B2] text-white rounded-lg hover:bg-[#007D93] transition">
                Save Changes
              </button> */}
            </div>
          </div>

          {/* Notification Section */}
          <div className={`rounded-2xl p-6 mb-6 border ${borderColor} ${bgSecondary}`}>
            <div className="flex items-center gap-3 mb-4">
              <Bell className={`w-5 h-5 ${textPrimary}`} />
              <h2 className={`text-lg font-semibold ${textPrimary}`}>Notifications</h2>
            </div>
            <div className="flex items-center justify-between">
              <span className={textSecondary}>Enable notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#0097B2] transition"></div>
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></span>
              </label>
            </div>
          </div>

          {/* Security Section */}
          <div className={`rounded-2xl p-6 mb-6 border ${borderColor} ${bgSecondary}`}>
            <div className="flex items-center gap-3 mb-4">
              <Lock className={`w-5 h-5 ${textPrimary}`} />
              <h2 className={`text-lg font-semibold ${textPrimary}`}>Security</h2>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => { setPasswordMode('change'); setShowPasswordModal(true); }}
                className="w-full px-4 py-2 bg-[#0097B2] text-white rounded-lg hover:bg-[#007D93] transition text-left"
              >
                Change Password
              </button>
              <button
                onClick={() => { setPasswordMode('forgot'); setShowPasswordModal(true); }}
                className={`w-full px-4 py-2 ${bgSecondary} ${textPrimary} shadow-md rounded-lg hover:${bgSecondary} transition text-left`}
              >
                Forgot Password
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className={`rounded-2xl p-6 mb-6 border ${borderColor} ${bgSecondary} flex items-center justify-between`}>
            <span className={`${textSecondary}`}>Logout from your account</span>
            <button onClick={handleLogout} className="px-4 py-2 bg-backGray text-white rounded-lg  transition flex items-center gap-2">
              <LogOut  className="w-4 h-4" />
              Logout
              {/* Spinner */}
              {logoutLoading && (

                <svg
                  className="w-4 h-4 animate-spin ml-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
            </button>

          </div>

          {/* Delete Account Section */}
          <div className={`rounded-2xl p-6 border border-red-300 ${mode === 'dark' ? 'bg-red-950' : 'bg-red-50'}`}>
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className={`w-5 h-5 text-red-500`} />
              <h2 className={`text-lg font-semibold text-red-600`}>Delete Account</h2>
            </div>
            <p className={`text-sm ${textSecondary} mb-4`}>
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </div>
        </div>

      </div>


      {/* Delete Account Confirmation Modal */}

    </>
  );
};

export default SettingsPage;