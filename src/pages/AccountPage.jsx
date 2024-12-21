import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo, updateProfilePicture } from "../redux/slices/userSlice";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";

const AccountPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
    country: userInfo?.country || "",
    city: userInfo?.city || "",
    mobileNumber: userInfo?.mobileNumber || "",
    birthdate: userInfo?.birthdate || "",
  });
  const [profilePicture, setProfilePicture] = useState(userInfo?.profilePicture || "/default-profile.png");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
   };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    dispatch(updateUserInfo(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: userInfo?.firstName || "",
      lastName: userInfo?.lastName || "",
      country: userInfo?.country || "",
      city: userInfo?.city || "",
      mobileNumber: userInfo?.mobileNumber || "",
      birthdate: userInfo?.birthdate || "",
    });
    setIsEditing(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        dispatch(updateProfilePicture(reader.result));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    if (storedUser?.password !== oldPassword) {
      setError("Old password is incorrect");
      return;
    }
  
    const updatedUser = { ...storedUser, password: newPassword };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  
    alert("Password changed successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar onSearch={null}/>
      <div className="accoutDiv flex">
        { }
        <aside className="w-1/4 sideBarDiv bg-lime-100 rounded-3xl ml-4 mt-10 p-6 overflow-hidden">
          <div className="text-center">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4 border border-gray-300"
            />
            <h2 className="text-lg font-semibold mb-2">{userInfo?.username}</h2>
            <label
              htmlFor="profilePicture"
              className="text-sm text-blue-500 cursor-pointer hover:underline"
            >
              Change Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </div>
          <ul className="mt-6 space-y-4">
            <li>
              <button
                className="w-full text-left text-gray-700 font-medium hover:text-gray-900"
                onClick={() => setIsEditing(true)}
              >
                Edit Personal Info
              </button>
            </li>
            <li>
              <button className="w-full text-left text-gray-700 font-medium hover:text-gray-900">
                Change Password
              </button>
            </li>
            <li>
              <button 
              onClick={handleLogout}
              className="w-full text-left text-red-600 font-medium hover:text-red-800">
                Logout
              </button>
            </li>
          </ul>
        </aside>

        { }
        <main className="personalDiv w-3/4 p-8">
            {isEditing ? (
                <div>
                <h1 className="text-2xl font-bold mb-6">Edit Personal Info</h1>
                <div className="bg-white p-6 rounded shadow-md">
                    <form>
                    {Object.keys(formData).map((field) => (
                        <div key={field} className="mb-6">
                        <label
                            htmlFor={field}
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            type={field === "birthdate" ? "date" : "text"}
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent ${
                            isEditing ? "bg-white" : "bg-gray-100"
                            }`}
                        />
                        </div>
                    ))}
                    <div className="flex gap-4">
                        <button
                        type="button"
                        onClick={handleSave}
                        className="bg-lime-500 text-white px-6 py-2 rounded-lg hover:bg-lime-600"
                        >
                        Save
                        </button>
                        <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                        >
                        Cancel
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            ) : (
                <div>
                <h1 className="text-2xl font-bold mb-6">Change Password</h1>
                <div className="bg-white p-6 rounded shadow-md">
                    <form onSubmit={handleChangePassword}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Old Password
                        </label>
                        <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                        </label>
                        <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                        </label>
                        <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        required
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="flex gap-4">
                        <button
                        type="submit"
                        className="bg-lime-500 text-white px-6 py-2 rounded-lg hover:bg-lime-600"
                        >
                        Update Password
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            )}
        </main>

      </div>
    </div>
  );
};

export default AccountPage;
