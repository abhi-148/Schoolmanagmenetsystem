import { useEffect, useState } from "react";
import {
  getMasterMediums
} from "../../services/masterMediumApi";

function AddSchoolMediumModal({
  onAdd,
  editingMedium,
  cancelEdit
}) {

  const [masterMediums,
    setMasterMediums] =
    useState([]);

  const [formData,
    setFormData] =
    useState({
      school_id: 1,
      master_medium_id: "",
      custom_medium_name: ""
    });

  useEffect(() => {

    fetchMasterMediums();

  }, []);

  useEffect(() => {

    if (editingMedium) {

      setFormData({
        school_id:
          editingMedium.school_id || 1,

        master_medium_id:
          editingMedium.master_medium_id || "",

        custom_medium_name:
          editingMedium.custom_medium_name || ""
      });

    }

  }, [editingMedium]);

  const fetchMasterMediums =
    async () => {

      try {

        const response =
          await getMasterMediums();

        setMasterMediums(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      await onAdd(formData);

      setFormData({
        school_id: 1,
        master_medium_id: "",
        custom_medium_name: ""
      });

    };

  return (

    <div className="bg-white p-6 rounded-xl shadow mb-6">

      <h2 className="text-xl font-semibold mb-4">

        {
          editingMedium
            ? "Edit School Medium"
            : "Add School Medium"
        }

      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4"
      >

        <select
          value={
            formData.master_medium_id
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              master_medium_id:
                e.target.value
            })
          }
          className="border p-3 rounded-lg"
        >

          <option value="">
            Select Medium
          </option>

          {masterMediums.map(
            (item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.medium_name}
              </option>

            )
          )}

        </select>

        <input
          type="text"
          placeholder="Custom Medium"
          value={
            formData.custom_medium_name
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              custom_medium_name:
                e.target.value
            })
          }
          className="border p-3 rounded-lg"
        />

        <div className="flex gap-2">

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >

            {
              editingMedium
                ? "Update Medium"
                : "Add School Medium"
            }

          </button>

          {
            editingMedium && (

              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-5 py-3 rounded-lg"
              >
                Cancel
              </button>

            )
          }

        </div>

      </form>

    </div>

  );

}

export default AddSchoolMediumModal;