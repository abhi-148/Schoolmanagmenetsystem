import { useState, useEffect } from "react";

function EditStudentModal({
  student,
  onClose,
  onUpdate
}) {

  const [formData, setFormData] =
    useState({
      full_name: "",
      roll_number: "",
      class_name: "",
      section: "",
      phone: "",
      address: ""
    });

  useEffect(() => {

    if (student) {

      setFormData({
        full_name:
          student.full_name || "",
        roll_number:
          student.roll_number || "",
        class_name:
          student.class_name || "",
        section:
          student.section || "",
        phone:
          student.phone || "",
        address:
          student.address || ""
      });

    }

  }, [student]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onUpdate(
      student.id,
      formData
    );

  };

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-xl rounded-xl p-6">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            Edit Student
          </h2>

          <button
            onClick={onClose}
            className="text-red-500 font-bold"
          >
            X
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Student Name"
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="roll_number"
            value={formData.roll_number}
            onChange={handleChange}
            placeholder="Roll Number"
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="class_name"
            value={formData.class_name}
            onChange={handleChange}
            placeholder="Class"
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            placeholder="Section"
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-lg md:col-span-2"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>

  );

}

export default EditStudentModal;