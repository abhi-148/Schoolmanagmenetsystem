import {
  useEffect,
  useState
} from "react";

import AdminLayout
from "../../layouts/AdminLayout";

import {
  getProfile,
  updateProfile
} from "../../services/profileService";

function Profile() {

  const [loading,
    setLoading] =
    useState(true);

  const [editing,
    setEditing] =
    useState(false);

  const [profile,
    setProfile] =
    useState({
      full_name: "",
      email: "",
      status: ""
    });

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

      try {

       const response =
  await getProfile();

setProfile({
  full_name:
    response.admin_name,

  email:
    response.admin_email,

  status:
    response.status
});
      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  const handleChange =
    (e) => {

      setProfile({
        ...profile,
        [e.target.name]:
        e.target.value
      });

    };

  const handleSave =
    async () => {

      try {

        await updateProfile({
          full_name:
            profile.full_name,
          email:
            profile.email
        });

        alert(
          "Profile Updated Successfully"
        );

        setEditing(false);

      } catch (error) {

        console.log(error);

        alert(
          "Update Failed"
        );

      }

    };

  if (loading) {

    return (
      <AdminLayout>
        <div className="p-10">
          Loading...
        </div>
      </AdminLayout>
    );

  }

  return (

    <AdminLayout>

      <div className="min-h-screen bg-slate-100 p-8">

        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <div className="bg-white rounded-xl shadow-sm p-8 max-w-4xl">

          <div className="flex items-center gap-6 mb-8">

            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">

              {
                profile.full_name
                ?.charAt(0)
              }

            </div>

            <div>

              <h2 className="text-2xl font-bold">

                {
                  profile.full_name
                }

              </h2>

              <p className="text-gray-500">
                SUPER_ADMIN
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="font-semibold">
                Full Name
              </label>

              <input
                type="text"
                name="full_name"
                value={
                  profile.full_name
                }
                onChange={
                  handleChange
                }
                disabled={!editing}
                className="w-full border p-3 rounded-lg mt-2"
              />

            </div>

            <div>

              <label className="font-semibold">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={
                  profile.email
                }
                onChange={
                  handleChange
                }
                disabled={!editing}
                className="w-full border p-3 rounded-lg mt-2"
              />

            </div>

            <div>

              <label className="font-semibold">
                Status
              </label>

              <input
               value={profile.status || "ACTIVE"}
                disabled
                className="w-full border p-3 rounded-lg mt-2"
              />

            </div>

          </div>

          {!editing ? (

            <button
              onClick={() =>
                setEditing(
                  true
                )
              }
              className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Edit Profile
            </button>

          ) : (

            <button
              onClick={
                handleSave
              }
              className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg"
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