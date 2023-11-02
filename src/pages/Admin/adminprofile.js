import React, { useState } from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";

const AdminProfile = ({ name, onChangeName, onSave, onChangePassword }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    // Logic to save the profile changes
    onSave(name);
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleCancel = () => {
    setShowChangePassword(false);
    // Reset password fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSubmitPasswordChange = () => {
    // Logic to handle password change
    onChangePassword(currentPassword, newPassword);
    console.log('Password changed:', { currentPassword, newPassword });
    handleCancel();
  };

  return (
    <>
    <Header role = "admin"/>
    {/* <Sidebar sidebarType="sidebarAdmin" /> */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => onChangeName(e.target.value)} />
      </label>
      </div>
      <div style={{ marginTop: '20px' }}>
      <Button label="Change Password" onClick={handleChangePassword} size="small"/>
      </div>
      <div style={{ marginTop: '20px' }}>
      <Button label="Save" onClick={handleSave} size="small"/>
      <Button label="Cancel" onClick={handleCancel} size="small"/>
      </div>
      {showChangePassword && (
        <div style={{ marginTop: '20px' }}>
          <label>
                      Current Password:
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </label>
                    <br />
                    <label>
                      New Password:
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </label>
                    <br />
                    <label>
                      Confirm Password:
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </label>
                    <br />
          <Button label="Submit" onClick={handleSubmitPasswordChange} size="small"/>
          <Button label="Cancel" onClick={handleCancel} size="small"/>
        </div>
      )}
    </div>
    </>
  );
};

export default AdminProfile;
