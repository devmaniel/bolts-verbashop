import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  Bell, 
  CreditCard, 
  Shield, 
  Globe, 
  Moon, 
  Sun, 
  Eye, 
  EyeOff, 
  Camera, 
  Edit3, 
  Save, 
  X, 
  Check, 
  AlertCircle, 
  Trash2,
  Plus,
  ArrowLeft,
  Settings,
  Heart,
  Package,
  HelpCircle,
  LogOut
} from 'lucide-react';

interface ProfileSettingsPageProps {
  onBack: () => void;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  avatar: string;
}

interface Address {
  id: number;
  type: 'home' | 'work' | 'other';
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: number;
  type: 'card' | 'paypal' | 'bank';
  name: string;
  details: string;
  isDefault: boolean;
  expiryDate?: string;
}

const ProfileSettingsPage: React.FC<ProfileSettingsPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  React.useEffect(() => {
    setTimeout(() => setShowAnimation(true), 100);
  }, []);

  // Profile data
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200'
  });

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: 'home',
      name: 'Home Address',
      address: '1131 Dusty Townline',
      city: 'Jacksonville',
      state: 'TX',
      zipCode: '40322',
      country: 'United States',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      name: 'Office',
      address: '2715 Ash Dr.',
      city: 'San Jose',
      state: 'SD',
      zipCode: '83475',
      country: 'United States',
      isDefault: false
    }
  ]);

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      type: 'card',
      name: 'Visa ending in 9530',
      details: '**** **** **** 9530',
      isDefault: true,
      expiryDate: '12/26'
    },
    {
      id: 2,
      type: 'paypal',
      name: 'PayPal Account',
      details: 'john.doe@example.com',
      isDefault: false
    }
  ]);

  // Settings
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      orderUpdates: true,
      promotions: true,
      newsletter: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      dataSharing: false
    },
    preferences: {
      language: 'en',
      currency: 'USD',
      theme: 'light',
      timezone: 'America/New_York'
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  const handleProfileUpdate = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSettingUpdate = (category: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
    console.log('Saving profile:', profile);
  };

  const handleAddAddress = () => {
    const newAddress: Address = {
      id: Date.now(),
      type: 'other',
      name: 'New Address',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      isDefault: false
    };
    setAddresses(prev => [...prev, newAddress]);
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleAddPaymentMethod = () => {
    const newPayment: PaymentMethod = {
      id: Date.now(),
      type: 'card',
      name: 'New Card',
      details: '',
      isDefault: false
    };
    setPaymentMethods(prev => [...prev, newPayment]);
  };

  const handleDeletePaymentMethod = (id: number) => {
    setPaymentMethods(prev => prev.filter(payment => payment.id !== id));
  };

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-white text-gray-600 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{profile.firstName} {profile.lastName}</h2>
            <p className="text-blue-100 mb-4">{profile.email}</p>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Edit3 className="h-4 w-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleProfileUpdate('email', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleProfileUpdate('phone', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => handleProfileUpdate('dateOfBirth', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              value={profile.gender}
              onChange={(e) => handleProfileUpdate('gender', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {isEditing && (
          <div className="flex space-x-4 mt-8">
            <button
              onClick={handleSaveProfile}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderAddressesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Saved Addresses</h3>
        <button
          onClick={handleAddAddress}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Address</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div key={address.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  address.type === 'home' ? 'bg-green-500' : 
                  address.type === 'work' ? 'bg-blue-500' : 'bg-gray-500'
                }`} />
                <h4 className="font-semibold text-gray-900">{address.name}</h4>
                {address.isDefault && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    Default
                  </span>
                )}
              </div>
              <button
                onClick={() => handleDeleteAddress(address.id)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            
            <div className="text-gray-600 space-y-1">
              <p>{address.address}</p>
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <p>{address.country}</p>
            </div>

            <div className="flex space-x-3 mt-4">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Edit
              </button>
              <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                Set as Default
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Payment Methods</h3>
        <button
          onClick={handleAddPaymentMethod}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Payment Method</span>
        </button>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((payment) => (
          <div key={payment.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-8 rounded flex items-center justify-center ${
                  payment.type === 'card' ? 'bg-blue-100' :
                  payment.type === 'paypal' ? 'bg-yellow-100' : 'bg-gray-100'
                }`}>
                  <CreditCard className={`h-5 w-5 ${
                    payment.type === 'card' ? 'text-blue-600' :
                    payment.type === 'paypal' ? 'text-yellow-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{payment.name}</h4>
                  <p className="text-gray-600 text-sm">{payment.details}</p>
                  {payment.expiryDate && (
                    <p className="text-gray-500 text-xs">Expires {payment.expiryDate}</p>
                  )}
                </div>
                {payment.isDefault && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                    Default
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePaymentMethod(payment.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-8">
      {/* Change Password */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Change Password</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
            />
          </div>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Two-Factor Authentication</h3>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-green-600" />
            <div>
              <h4 className="font-medium text-gray-900">SMS Authentication</h4>
              <p className="text-sm text-gray-600">Receive codes via SMS</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Login Sessions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Active Sessions</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Current Session</h4>
              <p className="text-sm text-gray-600">Chrome on Windows • New York, NY</p>
              <p className="text-xs text-gray-500">Last active: Now</p>
            </div>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
              Active
            </span>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Mobile App</h4>
              <p className="text-sm text-gray-600">iPhone • New York, NY</p>
              <p className="text-xs text-gray-500">Last active: 2 hours ago</p>
            </div>
            <button className="text-red-600 hover:text-red-800 text-sm font-medium">
              Revoke
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h3>
      
      <div className="space-y-8">
        {/* Email Notifications */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Email Notifications</h4>
          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email notifications', description: 'Receive notifications via email' },
              { key: 'orderUpdates', label: 'Order updates', description: 'Get notified about order status changes' },
              { key: 'promotions', label: 'Promotions & deals', description: 'Receive promotional offers and deals' },
              { key: 'newsletter', label: 'Newsletter', description: 'Weekly newsletter with latest products' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h5 className="font-medium text-gray-900">{item.label}</h5>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                    onChange={(e) => handleSettingUpdate('notifications', item.key, e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Push Notifications */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Push Notifications</h4>
          <div className="space-y-4">
            {[
              { key: 'push', label: 'Push notifications', description: 'Receive push notifications on your device' },
              { key: 'sms', label: 'SMS notifications', description: 'Receive notifications via SMS' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h5 className="font-medium text-gray-900">{item.label}</h5>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                    onChange={(e) => handleSettingUpdate('notifications', item.key, e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-8">
      {/* Language & Region */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Language & Region</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={settings.preferences.language}
              onChange={(e) => handleSettingUpdate('preferences', 'language', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              value={settings.preferences.currency}
              onChange={(e) => handleSettingUpdate('preferences', 'currency', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={settings.preferences.timezone}
              onChange={(e) => handleSettingUpdate('preferences', 'timezone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <div className="flex space-x-3">
              <button
                onClick={() => handleSettingUpdate('preferences', 'theme', 'light')}
                className={`flex-1 flex items-center justify-center space-x-2 p-3 border rounded-xl transition-colors ${
                  settings.preferences.theme === 'light'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </button>
              <button
                onClick={() => handleSettingUpdate('preferences', 'theme', 'dark')}
                className={`flex-1 flex items-center justify-center space-x-2 p-3 border rounded-xl transition-colors ${
                  settings.preferences.theme === 'dark'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Privacy Settings</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => handleSettingUpdate('privacy', 'profileVisibility', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          {[
            { key: 'showEmail', label: 'Show email in profile', description: 'Allow others to see your email address' },
            { key: 'showPhone', label: 'Show phone in profile', description: 'Allow others to see your phone number' },
            { key: 'dataSharing', label: 'Data sharing', description: 'Share anonymized data for analytics' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h5 className="font-medium text-gray-900">{item.label}</h5>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.privacy[item.key as keyof typeof settings.privacy]}
                  onChange={(e) => handleSettingUpdate('privacy', item.key, e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Account Actions</h3>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Package className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Download my data</span>
            </div>
            <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180" />
          </button>

          <button className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <HelpCircle className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Help & Support</span>
            </div>
            <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180" />
          </button>

          <button className="w-full flex items-center justify-between p-4 border border-red-300 rounded-xl hover:bg-red-50 transition-colors text-red-600">
            <div className="flex items-center space-x-3">
              <Trash2 className="h-5 w-5" />
              <span className="font-medium">Delete Account</span>
            </div>
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'addresses':
        return renderAddressesTab();
      case 'payment':
        return renderPaymentTab();
      case 'security':
        return renderSecurityTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'preferences':
        return renderPreferencesTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className={`lg:col-span-1 transition-all duration-1000 ${
            showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className={`lg:col-span-3 transition-all duration-1000 delay-300 ${
            showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;