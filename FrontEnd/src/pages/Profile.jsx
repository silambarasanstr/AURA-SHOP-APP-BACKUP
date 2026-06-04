import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users/profile";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const token = localStorage.getItem("token");

  // GET PROFILE
  const fetchProfile = useCallback(async () => {
    if (!token) return;

    try {
      setFetching(true);

      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        address: res.data.address || "",
      });
    } catch (err) {
      console.log("Fetch profile error:", err);
    } finally {
      setFetching(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE PROFILE
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(API_URL, user, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser((prev) => ({ ...prev, ...res.data }));
      setEditMode(false);

      alert("Profile updated successfully");
    } catch (err) {
      console.log("Update error:", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-center">My Profile</h2>

      {/* VIEW MODE */}
      {!editMode ? (
        <div className="space-y-3">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone || "Not added"}</p>
          <p><b>Address:</b> {user.address || "Not added"}</p>

          <button
            onClick={() => setEditMode(true)}
            className="w-full p-2 mt-4 text-white bg-green-600 rounded"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        /* EDIT MODE */
        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Name"
          />

          <input
            name="email"
            value={user.email}
            disabled
            className="w-full p-2 bg-gray-100 border rounded cursor-not-allowed"
          />

          <input
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Phone"
          />

          <input
            name="address"
            value={user.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Address"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 text-white bg-blue-600 rounded"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => setEditMode(false)}
            className="w-full p-2 text-gray-700 border rounded"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;