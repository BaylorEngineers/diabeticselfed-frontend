import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";

const ClinicianProfile = ({ firstname, lastname, onSave, onChangePassword }) => {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSave = () => {
        // Logic to save the profile changes
        onSave();
    };

    const handleChangePassword = () => {
        setShowChangePassword(true);
    };

    const handleCancel = () => {
        setShowChangePassword(false);
        // Reset fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleSubmitPasswordChange = () => {
        // Logic to handle password change
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match");
            return;
        }
        onChangePassword(currentPassword, newPassword);
        console.log("Password changed:", { currentPassword, newPassword });
        handleCancel();
    };

    return (
        <>
            <Header  role="clinician"/>
            {/* <Sidebar sidebarType="sidebarClinician" /> */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                }}
            >
                <div style={{ marginBottom: "20px" }}>
                    <span style={{ marginRight: "10px" }}>
                        First Name: {"John"}
                    </span>
                    <span style={{ marginLeft: "10px" }}>
                        Last Name: {"Smith"}
                    </span>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <Button label="Change Password" onClick={handleChangePassword} size="small" />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <Button label="Save" onClick={handleSave} size="small" />
                    <Button label="Cancel" onClick={handleCancel} size="small" style={{ marginLeft: "10px" }} />
                </div>

                {showChangePassword && (
                    <div
                        style={{
                            marginTop: "20px",
                            border: "1px solid #ccc",
                            padding: "20px",
                            borderRadius: "5px",
                        }}
                    >
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ marginRight: "10px" }}>
                                Current Password:
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    style={{ marginLeft: "10px" }}
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ marginRight: "10px" }}>
                                New Password:
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    style={{ marginLeft: "10px" }}
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ marginRight: "10px" }}>
                                Confirm Password:
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    style={{ marginLeft: "10px" }}
                                />
                            </label>
                        </div>
                        <div>
                            <Button label="Submit" onClick={handleSubmitPasswordChange} size="small" />
                            <Button label="Cancel" onClick={handleCancel} size="small" style={{ marginLeft: "10px" }} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ClinicianProfile;
