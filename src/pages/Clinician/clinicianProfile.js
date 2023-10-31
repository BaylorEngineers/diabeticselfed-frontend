import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";

const ClinicianProfile = ({ name, onChangeName, onSave, onChangePassword, onChangeEmail, onChangePhone }) => {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showChangeEmail, setShowChangeEmail] = useState(false);
    const [showChangePhone, setShowChangePhone] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');

    const handleSave = () => {
        // Logic to save the profile changes
        onSave(name);
    };

    const handleChangePassword = () => {
        setShowChangePassword(true);
    };

    const handleChangeEmail = () => {
        setShowChangeEmail(true);
    };

    const handleChangePhone = () => {
        setShowChangePhone(true);
    };

    const handleCancel = () => {
        setShowChangePassword(false);
        setShowChangeEmail(false);
        setShowChangePhone(false);
        // Reset fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setNewEmail('');
        setNewPhone('');
    };

    const handleSubmitPasswordChange = () => {
        // Logic to handle password change
        onChangePassword(currentPassword, newPassword);
        console.log('Password changed:', { currentPassword, newPassword });
        handleCancel();
    };

    const handleSubmitEmailChange = () => {
        // Logic to handle email change
        onChangeEmail(newEmail);
        console.log('Email changed:', newEmail);
        handleCancel();
    };

    const handleSubmitPhoneChange = () => {
        // Logic to handle phone change
        onChangePhone(newPhone);
        console.log('Phone changed:', newPhone);
        handleCancel();
    };

    return (
        <>
            <Header />
            <Sidebar sidebarType="sidebarClinician" />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ marginRight: '10px' }}>
                        Name:
                        <input type="text" value={name} onChange={(e) => onChangeName(e.target.value)}
                               style={{ marginLeft: '10px' }} />
                    </label>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Button label="Change Email" onClick={handleChangeEmail} size="small" />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Button label="Change Phone" onClick={handleChangePhone} size="small" />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Button label="Change Password" onClick={handleChangePassword} size="small" />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Button label="Save" onClick={handleSave} size="small" />
                    <Button label="Cancel" onClick={handleCancel} size="small" style={{ marginLeft: '10px' }} />
                </div>
                {showChangeEmail && (
                    <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ marginRight: '10px' }}>
                                New Email:
                                <input
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    style={{ marginLeft: '10px' }}
                                />
                            </label>
                        </div>
                        <div>
                            <Button label="Submit" onClick={handleSubmitEmailChange} size="small" />
                            <Button label="Cancel" onClick={handleCancel} size="small" style={{ marginLeft: '10px' }} />
                        </div>
                    </div>
                )}
                {showChangePhone && (
                    <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ marginRight: '10px' }}>
                                New Phone:
                                <input
                                    type="tel"
                                    value={newPhone}
                                    onChange={(e) => setNewPhone(e.target.value)}
                                    style={{ marginLeft: '10px' }}
                                />
                            </label>
                        </div>
                        <div>
                            <Button label="Submit" onClick={handleSubmitPhoneChange} size="small" />
                            <Button label="Cancel" onClick={handleCancel} size="small" style={{ marginLeft: '10px' }} />
                        </div>
                    </div>
                )}
                {showChangePassword && (
                    <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ marginRight: '10px' }}>
                                Current Password:
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    style={{ marginLeft: '10px' }}
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ marginRight: '10px' }}>
                                New Password:
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    style={{ marginLeft: '10px' }}
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ marginRight: '10px' }}>
                                Confirm Password:
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    style={{ marginLeft: '10px' }}
                                />
                            </label>
                        </div>
                        <div>
                            <Button label="Submit" onClick={handleSubmitPasswordChange} size="small" />
                            <Button label="Cancel" onClick={handleCancel} size="small" style={{ marginLeft: '10px' }} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ClinicianProfile;
