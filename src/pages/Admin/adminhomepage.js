import React, { useState } from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const AdminPage = () => {
  const [name, setName] = useState('John Doe');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleLogout = () => {
    // ... your logout logic
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSave = (updatedName) => {
      setName(updatedName);
    };

    const handlePasswordChange = (currentPassword, newPassword) => {
      // Handle password change logic here
      console.log('Password changed:', { currentPassword, newPassword });
    };

  return (
  <>
  <Header/>
  <Sidebar sidebarType="sidebarAdmin" />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div>
      <p> This will be the home page </p>
      </div>
    </div>
    </>
  );
};

export default AdminPage;
