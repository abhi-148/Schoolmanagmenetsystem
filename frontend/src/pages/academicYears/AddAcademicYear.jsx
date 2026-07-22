import { useEffect, useState } from "react";

function AddAcademicYear({
  onAdd,
  editingAcademicYear,
  cancelEdit
}) {

  const [formData, setFormData] =
    useState({

      school_id: "",

      branch_id: "",

      academic_year_name: "",

      semester: "",

      start_date: "",

      end_date: "",

      is_current: false,

      status: "ACTIVE"

    });

  useEffect(() => {

    if (editingAcademicYear) {

      setFormData({

        school_id:
          editingAcademicYear.school_id || "",

        branch_id:
          editingAcademicYear.branch_id || "",

        academic_year_name:
          editingAcademicYear.academic_year_name || "",

        semester:
          editingAcademicYear.semester || "",

        start_date:
          editingAcademicYear.start_date
            ?.split("T")[0] || "",

        end_date:
          editingAcademicYear.end_date
            ?.split("T")[0] || "",

        is_current:
          editingAcademicYear.is_current || false,

        status:
          editingAcademicYear.status || "ACTIVE"

      });

    }

  }, [editingAcademicYear]);

  const handleChange = (e) => {

    const { name, value, type, checked } =
      e.target;

    setFormData({

      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onAdd(formData);

    if (!editingAcademicYear) {

      setFormData({

        school_id: "",

        branch_id: "",

        academic_year_name: "",

        semester: "",

        start_date: "",

        end_date: "",

        is_current: false,

        status: "ACTIVE"

      });

    }

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-8"
    >

      <h2 className="text-2xl font-semibold mb-6">

        {editingAcademicYear
          ? "Update Academic Year"
          : "Add Academic Year"}

      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="number"
          name="school_id"
          placeholder="School ID"
          className="border p-3 rounded-lg"
          value={formData.school_id}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="branch_id"
          placeholder="Branch ID"
          className="border p-3 rounded-lg"
          value={formData.branch_id}
          onChange={handleChange}
        />

        <input
          type="text"
          name="academic_year_name"
          placeholder="Academic Year (2025-2026)"
          className="border p-3 rounded-lg"
          value={formData.academic_year_name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="semester"
          placeholder="Semester"
          className="border p-3 rounded-lg"
          value={formData.semester}
          onChange={handleChange}
          required
        />

        <div>

          <label className="text-sm text-gray-600">

            Start Date

          </label>

          <input
            type="date"
            name="start_date"
            className="border p-3 rounded-lg w-full"
            value={formData.start_date}
            onChange={handleChange}
            required
          />

        </div>

        <div>

          <label className="text-sm text-gray-600">

            End Date

          </label>

          <input
            type="date"
            name="end_date"
            className="border p-3 rounded-lg w-full"
            value={formData.end_date}
            onChange={handleChange}
            required
          />

        </div>

        <select
          name="status"
          className="border p-3 rounded-lg"
          value={formData.status}
          onChange={handleChange}
        >

          <option value="ACTIVE">

            ACTIVE

          </option>

          <option value="INACTIVE">

            INACTIVE

          </option>

        </select>

        <div className="flex items-center gap-3">

          <input
            type="checkbox"
            name="is_current"
            checked={formData.is_current}
            onChange={handleChange}
          />

          <label>

            Current Academic Year

          </label>

        </div>

      </div>

      <div className="flex gap-3 mt-6">

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >

          {editingAcademicYear
            ? "Update Academic Year"
            : "Save Academic Year"}

        </button>

        {editingAcademicYear && (

          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg"
          >

            Cancel

          </button>

        )}

      </div>

    </form>

  );

}

export default AddAcademicYear;