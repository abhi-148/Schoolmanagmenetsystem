import { useState, useEffect } from "react";

function AddStudentMark({
  onAdd,
  onUpdate,
  editData,
  isEditing
}) {

  const [formData, setFormData] = useState({
    exam_id: "",
    student_id: "",
    subject_id: "",
    max_marks: "",
    obtained_marks: "",
    remarks: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        exam_id: editData.exam_id || "",
        student_id: editData.student_id || "",
        subject_id: editData.subject_id || "",
        max_marks: editData.max_marks || "",
        obtained_marks: editData.obtained_marks || "",
        remarks: editData.remarks || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      onUpdate(editData.id, formData);
    } else {
      onAdd(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-8"
    >
      <h2 className="text-xl font-semibold mb-4">
        {isEditing
          ? "Update Student Marks"
          : "Add Student Marks"}
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <select
          name="exam_id"
          value={formData.exam_id}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="">Select Exam</option>
          <option value="1">Unit Test 1</option>
          <option value="2">Unit Test 2</option>
        </select>

        <select
          name="student_id"
          value={formData.student_id}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="">Select Student</option>
          <option value="1">Rahul Kumar</option>
          <option value="2">Abhishek Kumar</option>
          <option value="4">Abhishek Kumar</option>
          <option value="5">Rahul Kumar</option>
        </select>

        <select
          name="subject_id"
          value={formData.subject_id}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="">Select Subject</option>
          <option value="1">Mathematics</option>
          <option value="2">English</option>
          <option value="3">Science</option>
        </select>

        <input
          type="number"
          name="max_marks"
          placeholder="Max Marks"
          value={formData.max_marks}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="obtained_marks"
          placeholder="Obtained Marks"
          value={formData.obtained_marks}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="remarks"
          placeholder="Remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="border p-3 rounded-lg"
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
          ? "Update Marks"
          : "Save Marks"}
      </button>
    </form>
  );
}

export default AddStudentMark;