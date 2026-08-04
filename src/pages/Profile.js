import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/authService';
import Spinner from '../components/common/Spinner';

function Profile({ showToast }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const profile = await getUserProfile();
      setUser(profile);
    }
    fetchProfile();
  }, []);

  if (!user) return <Spinner />;

  const handleUpgrade = () => {
    showToast("🚀 Upgrade option selected!");
    // redirect to Upgrade page or payment flow
  };

  return (
    <div className="profile-page">
      <h2>👤 Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Current Plan:</strong> {user.plan}</p>
        <button onClick={handleUpgrade}>Upgrade to Pro</button>
      </div>
    </div>
  );
}

export default Profile;
