import {
  useState,
  useEffect
} from "react";

function AddSchoolClass({
  onAdd,
  onUpdate,
  editData,
  isEditing,
  schools,
  branches,
  classes
}) {

  const [formData, setFormData] =
    useState({
      school_id: "",
      class_id: "",
      branch_id: "",
      location: "",
      student_capacity: ""
    });

  useEffect(() => {

    if (editData) {

      setFormData({
        school_id:
          editData.school_id || "",
        class_id:
          editData.class_id || "",
        branch_id:
          editData.branch_id || "",
        location:
          editData.location || "",
        student_capacity:
          editData.student_capacity || ""
      });

    }

  }, [editData]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (isEditing) {

      onUpdate(
        editData.id,
        formData
      );

    } else {

      onAdd(formData);

    }

    setFormData({
      school_id: "",
      class_id: "",
      branch_id: "",
      location: "",
      student_capacity: ""
    });

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-8"
    >

      <h2 className="text-xl font-semibold mb-4">

        {isEditing
          ? "Update School Class"
          : "Add School Class"}

      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {/* School Dropdown */}

        <select
          name="school_id"
          value={formData.school_id}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        >

          <option value="">
            Select School
          </option>

          {schools?.map((school) => (

            <option
              key={school.id}
              value={school.id}
            >
              {school.school_name}
            </option>

          ))}

        </select>

        {/* Class Dropdown */}

        <select
          name="class_id"
          value={formData.class_id}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        >

          <option value="">
            Select Class
          </option>

          {classes?.map((item) => (

            <option
              key={item.id}
              value={item.id}
            >
              {item.class_name}
            </option>

          ))}

        </select>

        {/* Branch Dropdown */}

        <select
          name="branch_id"
          value={formData.branch_id}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        >

          <option value="">
            Select Branch
          </option>

          {branches?.map((branch) => (

            <option
              key={branch.id}
              value={branch.id}
            >
              {branch.branch_name}
            </option>

          ))}

        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="student_capacity"
          placeholder="Student Capacity"
          value={
            formData.student_capacity
          }
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

      </div>

      <button
        type="submit"
        className={`mt-4 text-white px-6 py-3 rounded-lg ${
          isEditing
            ? "bg-blue-600"
            : "bg-green-600"
        }`}
      >
        {isEditing
          ? "Update"
          : "Save"}
      </button>

    </form>

  );

}

export default AddSchoolClass;9