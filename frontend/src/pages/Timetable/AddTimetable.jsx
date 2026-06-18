import { useState, useEffect } from "react";

function AddTimetable({
  onAdd,
  onUpdate,
  editData,
  isEditing
}) {

  const [formData, setFormData] = useState({
    school_class_id: "",
    section_id: "",
    subject_id: "",
    staff_id: "",
    day_name: "",
    start_time: "",
    end_time: ""
  });

  useEffect(() => {

    if (editData) {

      setFormData({
        school_class_id:
          editData.school_class_id || "",
        section_id:
          editData.section_id || "",
        subject_id:
          editData.subject_id || "",
        staff_id:
          editData.staff_id || "",
        day_name:
          editData.day_name || "",
        start_time:
          editData.start_time || "",
        end_time:
          editData.end_time || ""
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
      school_class_id: "",
      section_id: "",
      subject_id: "",
      staff_id: "",
      day_name: "",
      start_time: "",
      end_time: ""
    });

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-8"
    >

      <h2 className="text-xl font-semibold mb-4">

        {isEditing
          ? "Update Timetable"
          : "Add Timetable"}

      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <input
          type="number"
          name="school_class_id"
          placeholder="Class ID"
          value={formData.school_class_id}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="section_id"
          placeholder="Section ID"
          value={formData.section_id}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="subject_id"
          placeholder="Subject ID"
          value={formData.subject_id}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="staff_id"
          placeholder="Teacher ID"
          value={formData.staff_id}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="day_name"
          placeholder="Monday"
          value={formData.day_name}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="time"
          name="end_time"
          value={formData.end_time}
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
          ? "Update Timetable"
          : "Save Timetable"}

      </button>

    </form>

  );

}

export default AddTimetable;