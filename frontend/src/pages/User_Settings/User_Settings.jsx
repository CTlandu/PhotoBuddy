import React from "react";
import { Shield, Bell, Mail, UserX, CreditCard } from "lucide-react";
import Navbar from "../../components/Navbar";

// Account Settings Component
const AccountSecuritySettings = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Account & Security</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <span>Email Settings</span>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Manage
          </button>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-gray-400" />
            <span>Change Password</span>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

// Notifications Component
const NotificationSettings = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <Bell className="h-5 w-5 text-gray-400" />
            <span>Message Notifications</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-5 w-5 text-gray-400" />
            <span>Subscription Updates</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

// Account Deletion Component
const AccountDeletion = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-red-500">Danger Zone</h2>
      <div className="border border-red-500 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UserX className="h-5 w-5 text-red-500" />
            <div>
              <h3 className="font-medium text-red-500">Delete Account</h3>
              <p className="text-sm text-gray-400">
                This action cannot be undone
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Settings Page Component
const SettingsPage = ({ token }) => {
  return (
    <>
      <Navbar token={token}></Navbar>
      <div className="max-w-2xl mx-auto p-6 text-white">
        <h1 className="text-2xl font-bold mb-8">Settings</h1>
        <AccountSecuritySettings />
        <NotificationSettings />
        <AccountDeletion />
      </div>
    </>
  );
};

export default SettingsPage;
