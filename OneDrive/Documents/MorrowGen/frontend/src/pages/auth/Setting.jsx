import React, { useState } from 'react';
import { X, User, Bell, Shield, Eye, Globe, HelpCircle, Trash2, Download, Upload, Moon, Sun, Volume2, VolumeX, Smartphone, Mail, MessageSquare } from 'lucide-react';

const Setting = ({  onClose }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    // Account Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    
    // Privacy Settings
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessaging: true,
    
    // Appearance Settings
    theme: 'light',
    language: 'english',
    timezone: 'asia-kolkata',
    
    // Learning Settings
    autoPlay: true,
    soundEffects: true,
    studyReminders: true,
    weeklyReports: true,
    
    // Security Settings
    twoFactor: false,
    loginAlerts: true,
    sessionTimeout: '30min'
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Eye },
    { id: 'learning', label: 'Learning', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];


  return (
    <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] p-6 text-white flex items-center justify-between">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button
            onClick={onClose}
            className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all"
          >
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            <nav className="p-4">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 mb-1 ${
                      activeTab === tab.id
                        ? 'bg-[#0097B2] text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Account Settings</h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Profile Information</h4>
                    <p className="text-gray-600 text-sm mb-3">Update your basic profile details</p>
                    <button className="bg-[#0097B2] text-white px-4 py-2 rounded-lg hover:bg-[#007a94] transition-colors">
                      Edit Profile
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Change Password</h4>
                    <p className="text-gray-600 text-sm mb-3">Update your account password</p>
                    <button className="bg-[#00B2A9] text-white px-4 py-2 rounded-lg hover:bg-[#009590] transition-colors">
                      Change Password
                    </button>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                      <Trash2 className="w-5 h-5" />
                      Delete Account
                    </h4>
                    <p className="text-red-600 text-sm mb-3">Permanently delete your account and all data</p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Notification Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#0097B2]" />
                      <div>
                        <h4 className="font-medium text-gray-800">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Receive updates via email</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0097B2]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-[#00B2A9]" />
                      <div>
                        <h4 className="font-medium text-gray-800">SMS Notifications</h4>
                        <p className="text-sm text-gray-600">Receive updates via SMS</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.smsNotifications}
                        onChange={(e) => updateSetting('smsNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00B2A9]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-[#0097B2]" />
                      <div>
                        <h4 className="font-medium text-gray-800">Push Notifications</h4>
                        <p className="text-sm text-gray-600">Receive browser notifications</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.pushNotifications}
                        onChange={(e) => updateSetting('pushNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0097B2]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-[#00B2A9]" />
                      <div>
                        <h4 className="font-medium text-gray-800">Marketing Emails</h4>
                        <p className="text-sm text-gray-600">Promotional content and updates</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.marketingEmails}
                        onChange={(e) => updateSetting('marketingEmails', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00B2A9]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Privacy Settings</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Profile Visibility</h4>
                    <p className="text-sm text-gray-600 mb-3">Control who can see your profile</p>
                    <select
                      value={settings.profileVisibility}
                      onChange={(e) => updateSetting('profileVisibility', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#0097B2] focus:outline-none"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">Show Email Address</h4>
                      <p className="text-sm text-gray-600">Allow others to see your email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.showEmail}
                        onChange={(e) => updateSetting('showEmail', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0097B2]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">Show Phone Number</h4>
                      <p className="text-sm text-gray-600">Allow others to see your phone</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.showPhone}
                        onChange={(e) => updateSetting('showPhone', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00B2A9]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Appearance & Language</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                      {settings.theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                      Theme
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => updateSetting('theme', 'light')}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          settings.theme === 'light'
                            ? 'border-[#0097B2] bg-[#E0F2F5]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Sun className="w-6 h-6 mx-auto mb-1 text-[#0097B2]" />
                        <p className="text-sm font-medium">Light</p>
                      </button>
                      <button
                        onClick={() => updateSetting('theme', 'dark')}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          settings.theme === 'dark'
                            ? 'border-[#0097B2] bg-[#E0F2F5]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Moon className="w-6 h-6 mx-auto mb-1 text-[#0097B2]" />
                        <p className="text-sm font-medium">Dark</p>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Language</h4>
                    <select
                      value={settings.language}
                      onChange={(e) => updateSetting('language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#0097B2] focus:outline-none"
                    >
                      <option value="english">English</option>
                      <option value="hindi">हिंदी (Hindi)</option>
                      <option value="tamil">தமிழ் (Tamil)</option>
                      <option value="bengali">বাংলা (Bengali)</option>
                    </select>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Timezone</h4>
                    <select
                      value={settings.timezone}
                      onChange={(e) => updateSetting('timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#0097B2] focus:outline-none"
                    >
                      <option value="asia-kolkata">Asia/Kolkata (IST)</option>
                      <option value="asia-mumbai">Asia/Mumbai (IST)</option>
                      <option value="asia-delhi">Asia/Delhi (IST)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Learning Settings */}
            {activeTab === 'learning' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Learning Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">Auto-play Videos</h4>
                      <p className="text-sm text-gray-600">Automatically play next video</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.autoPlay}
                        onChange={(e) => updateSetting('autoPlay', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0097B2]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {settings.soundEffects ? <Volume2 className="w-5 h-5 text-[#00B2A9]" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
                      <div>
                        <h4 className="font-medium text-gray-800">Sound Effects</h4>
                        <p className="text-sm text-gray-600">Play sounds for interactions</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.soundEffects}
                        onChange={(e) => updateSetting('soundEffects', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00B2A9]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">Study Reminders</h4>
                      <p className="text-sm text-gray-600">Get reminded to study daily</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.studyReminders}
                        onChange={(e) => updateSetting('studyReminders', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0097B2]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Security Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add extra security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.twoFactor}
                        onChange={(e) => updateSetting('twoFactor', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Session Timeout</h4>
                    <p className="text-sm text-gray-600 mb-3">Auto-logout after inactivity</p>
                    <select
                      value={settings.sessionTimeout}
                      onChange={(e) => updateSetting('sessionTimeout', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#0097B2] focus:outline-none"
                    >
                      <option value="15min">15 minutes</option>
                      <option value="30min">30 minutes</option>
                      <option value="1hour">1 hour</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Help & Support */}
            {activeTab === 'help' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Help & Support</h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                      <Download className="w-5 h-5 text-[#0097B2]" />
                      Export Data
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">Download your account data</p>
                    <button className="bg-[#0097B2] text-white px-4 py-2 rounded-lg hover:bg-[#007a94] transition-colors">
                      Export Data
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Contact Support</h4>
                    <p className="text-gray-600 text-sm mb-3">Get help from our support team</p>
                    <button className="bg-[#00B2A9] text-white px-4 py-2 rounded-lg hover:bg-[#009590] transition-colors">
                      Contact Support
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">App Version</h4>
                    <p className="text-gray-600 text-sm">Version 2.1.0</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};


export default Setting;