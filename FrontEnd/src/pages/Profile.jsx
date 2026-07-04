import { useEffect, useState, useCallback } from "react";
import { getProfile, updateProfile } from "../services/profileService";
import toast from "react-hot-toast";
import Loading from "../components/common/Loading";
import FormInput from "../components/common/FormInput";

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

  const fetchProfile = useCallback(async () => {
    if (!token) return;

    try {
      setFetching(true);

      const data = await getProfile();

      setUser({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await updateProfile(user);
      await fetchProfile();

      const authUser = JSON.parse(localStorage.getItem("user"));

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...authUser,
          ...data,
        })
      );

      window.dispatchEvent(new Event("userUpdated"));
      setEditMode(false);

      toast.success("Profile updated successfully");
    } catch (err) {
      console.log("Update error:", err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen px-4 py-5 bg-gray-50">
      <div className="max-w-2xl mx-auto overflow-hidden bg-white border border-gray-100 shadow-lg rounded-2xl">
        {/* Header */}
        <div className="p-5 text-center bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 text-3xl font-bold text-white rounded-full bg-white/20">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <h2 className="text-2xl font-bold text-white">{user.name || "User"}</h2>

          <p className="mt-1 text-blue-100">{user.email}</p>
        </div>

        <div className="p-8">
          {!editMode ? (
            <>
              <div className="grid gap-5">
                <FormInput label="Name" value={user.name || "-"} />
                <FormInput label="Email" value={user.email || "-"} />
                <FormInput label="Phone Number" value={user.phone || "-"} />
                <FormInput label="Address" value={user.address || "-"} />
              </div>

              <button
                onClick={() => setEditMode(true)}
                className="w-full py-3 mt-8 font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-5">
              <FormInput
                label="Name"
                value={user.name}
                onChange={handleChange}
                name="name"
                placeholder="Enter your name"
              />

              <FormInput
                label="Email"
                name="email"
                value={user.email}
                disabled
                className="bg-gray-100 cursor-not-allowed"
              />

              <FormInput
                label="Phone Number"
                value={user.phone}
                onChange={handleChange}
                name="phone"
                placeholder="Enter your phone number"
              />

              <FormInput
                label="Address"
                name="address"
                value={user.address}
                onChange={handleChange}
                placeholder="Enter address"
                textarea
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="flex-1 py-3 font-medium text-gray-700 transition border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
