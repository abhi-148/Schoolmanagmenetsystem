import { useState, useEffect } from "react";

function AddExam({
  onAdd,
  onUpdate,
  editData,
  isEditing
}) {

  const [formData, setFormData] = useState({
    school_id: 1,
    exam_name: "",
    exam_type: "",
    start_date: "",
    end_date: ""
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        school_id: editData.school_id || 1,
        exam_name: editData.exam_name || "",
        exam_type: editData.exam_type || "",
        start_date: editData.start_date?.split("T")[0] || "",
        end_date: editData.end_date?.split("T")[0] || ""
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      onUpdate(editData.id, formData);
    } else {
      onAdd(formData);
    }

    setFormData({
      school_id: 1,
      exam_name: "",
      exam_type: "",
      start_date: "",
      end_date: ""
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-8"
    >
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? "Update Exam" : "Add Exam"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="exam_name"
          value={formData.exam_name}
          placeholder="Exam Name"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="text"
          name="exam_type"
          value={formData.exam_type}
          placeholder="Exam Type"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          className="border p-3 rounded-lg"
          onChange={handleChange}
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
        {isEditing ? "Update Exam" : "Save Exam"}
      </button>
    </form>
  );
}

export default AddExam;