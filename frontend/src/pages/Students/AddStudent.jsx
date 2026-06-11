import { useState } from "react";

function AddStudent({ onAdd }) {

  const [formData, setFormData] = useState({
    school_id: 1,
    full_name: "",
    roll_number: "",
    class_name: "",
    section: "",
    gender: "MALE",
    dob: "",
    father_name: "",
    mother_name: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(
      "Submitting Student:",
      formData
    );

    onAdd(formData);

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm"
    >

      <h2 className="text-xl font-semibold mb-6">
        Add New Student
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="full_name"
          placeholder="Student Name"
          className="border p-3 rounded-lg"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="roll_number"
          placeholder="Roll Number"
          className="border p-3 rounded-lg"
          value={formData.roll_number}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="class_name"
          placeholder="Class"
          className="border p-3 rounded-lg"
          value={formData.class_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="section"
          placeholder="Section"
          className="border p-3 rounded-lg"
          value={formData.section}
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          className="border p-3 rounded-lg"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="MALE">
            Male
          </option>

          <option value="FEMALE">
            Female
          </option>

          <option value="OTHER">
            Other
          </option>
        </select>

        <input
          type="date"
          name="dob"
          className="border p-3 rounded-lg"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="father_name"
          placeholder="Father Name"
          className="border p-3 rounded-lg"
          value={formData.father_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="mother_name"
          placeholder="Mother Name"
          className="border p-3 rounded-lg"
          value={formData.mother_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="border p-3 rounded-lg"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          className="border p-3 rounded-lg"
          value={formData.address}
          onChange={handleChange}
          required
        />

      </div>

      <button
        type="submit"
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        Save Student
      </button>

    </form>

  );

}

export default AddStudent;