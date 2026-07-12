import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    school_name: "",
    school_code: "",
    status: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      const role = localStorage.getItem("role");

      if (
        role === "SUPER_ADMIN" ||
        role === "SCHOOL_ADMIN"
      ) {
        setProfile({
          full_name: response.data.admin_name || "",
          email: response.data.admin_email || "",
          phone: response.data.phone || "",
          address: response.data.address || "",
          school_name: response.data.school_name || "",
          school_code: response.data.school_code || "",
          status: response.data.status || "ACTIVE",
        });
      } else {
        setProfile({
          full_name: response.data.full_name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          address: response.data.address || "",
          school_name: response.data.school_name || "",
          school_code: response.data.school_code || "",
          status: response.data.status || "ACTIVE",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const role = localStorage.getItem("role");

      if (
        role === "SUPER_ADMIN" ||
        role === "SCHOOL_ADMIN"
      ) {
        await updateProfile({
          full_name: profile.full_name,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
        });
      } else {
        await updateProfile({
          full_name: profile.full_name,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
        });
      }

      alert("Profile Updated Successfully");
      setEditing(false);
      fetchProfile();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-10 text-lg font-semibold">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-100 p-8">
        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <div className="bg-white rounded-xl shadow-md p-8 max-w-5xl">

          {/* Header */}

          <div className="flex items-center gap-6 mb-10">

            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
              {profile.full_name?.charAt(0)}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {profile.full_name}
              </h2>

              <p className="text-gray-500 mt-1">
                {localStorage.getItem("role")}
              </p>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Full Name */}

            <div>
              <label className="font-semibold">
                Full Name
              </label>

              <input
                type="text"
                name="full_name"
                value={profile.full_name}
                onChange={handleChange}
                disabled={!editing}
                className="w-full border p-3 rounded-lg mt-2"
              />
            </div>

            {/* Email */}

            <div>
              <label className="font-semibold">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editing}
                className="w-full border p-3 rounded-lg mt-2"
              />
            </div>

            {/* School Name */}

            <div>
              <label className="font-semibold">
                School Name
              </label>

              <input
                value={profile.school_name}
                disabled
                className="w-full border p-3 rounded-lg mt-2 bg-gray-100"
              />
            </div>

            {/* School Code */}

            <div>
              <label className="font-semibold">
                School Code
              </label>

              <input
                value={profile.school_code}
                disabled
                className="w-full border p-3 rounded-lg mt-2 bg-gray-100"
              />
            </div>

            {/* Phone */}

            <div>
              <label className="font-semibold">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!editing}
                className="w-full border p-3 rounded-lg mt-2"
              />
            </div>

            {/* Address */}

            <div>
              <label className="font-semibold">
                Address
              </label>

              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                disabled={!editing}
                className="w-full border p-3 rounded-lg mt-2"
              />
            </div>

            {/* Status */}

            <div>
              <label className="font-semibold">
                Status
              </label>

              <input
                value={profile.status || "ACTIVE"}
                disabled
                className="w-full border p-3 rounded-lg mt-2 bg-gray-100"
              />
            </div>

          </div>

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Profile;