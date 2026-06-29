import { useEffect, useState } from "react";

import {
  getSchoolClasses,
} from "../../services/schoolClassService";

import {
  getAcademicYears,
} from "../../services/academicYearService";

import {
  getSections,
} from "../../services/sectionService";

import {
  getStaff,
} from "../../services/staffService";

import {
  getSchoolMediums,
} from "../../services/schoolMediumApi";

function BatchForm({

  initialData = {},

  mode = "create",

  loading = false,

  onSubmit,

  onCancel

}) {

  // ===============================
  // DROPDOWN STATES
  // ===============================

  const [schoolClasses, setSchoolClasses] =
    useState([]);

  const [academicYears, setAcademicYears] =
    useState([]);

  const [sections, setSections] =
    useState([]);

  const [teachers, setTeachers] =
    useState([]);

  const [mediums, setMediums] =
    useState([]);

  // ===============================
  // FORM STATE
  // ===============================

  const [formData, setFormData] =
    useState({

      batch_code:
        initialData.batch_code || "",

      school_class_id:
        initialData.school_class_id || "",

      academic_year_id:
        initialData.academic_year_id || "",

      section_id:
        initialData.section_id || "",

      teacher_id:
        initialData.teacher_id || "",

      school_medium_id:
        initialData.school_medium_id || "",

      start_time:
        initialData.start_time || "",

      end_time:
        initialData.end_time || "",

      duration_minutes:
        initialData.duration_minutes || ""

    });

  // ===============================
  // ERROR STATE
  // ===============================

  const [errors, setErrors] =
    useState({});

  // ===============================
  // LOAD DROPDOWNS
  // ===============================

  useEffect(() => {

    loadDropdowns();

  }, []);

  const loadDropdowns =
    async () => {

      try {

        const [

          classRes,

          yearRes,

          sectionRes,

          teacherRes,

          mediumRes

        ] = await Promise.all([

          getSchoolClasses(),

          getAcademicYears(),

          getSections(),

          getStaff(),

          getSchoolMediums()

        ]);

        setSchoolClasses(
          classRes.data || []
        );

        setAcademicYears(
          yearRes.data || []
        );

        setSections(
          sectionRes.data || []
        );

        setTeachers(
          teacherRes.data || []
        );

        setMediums(
          mediumRes.data || []
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  // ===============================
  // HANDLE CHANGE
  // ===============================

  const handleChange = (e) => {

    const {

      name,

      value

    } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value

    }));

    setErrors((prev) => ({

      ...prev,

      [name]: ""

    }));

  };
    // ===============================
  // AUTO CALCULATE DURATION
  // ===============================

  useEffect(() => {

    if (
      formData.start_time &&
      formData.end_time
    ) {

      const start =
        new Date(
          `1970-01-01T${formData.start_time}`
        );

      const end =
        new Date(
          `1970-01-01T${formData.end_time}`
        );

      const diff =
        (end - start) / 60000;

      if (diff > 0) {

        setFormData((prev) => ({

          ...prev,

          duration_minutes: diff

        }));

      }

    }

  }, [

    formData.start_time,

    formData.end_time

  ]);

  // ===============================
  // VALIDATION
  // ===============================

  const validate = () => {

    const validationErrors = {};

    if (!formData.batch_code.trim()) {

      validationErrors.batch_code =
        "Batch Code is required.";

    }

    if (!formData.school_class_id) {

      validationErrors.school_class_id =
        "Please select School Class.";

    }

    if (!formData.academic_year_id) {

      validationErrors.academic_year_id =
        "Please select Academic Year.";

    }

    if (!formData.section_id) {

      validationErrors.section_id =
        "Please select Section.";

    }

    if (!formData.teacher_id) {

      validationErrors.teacher_id =
        "Please select Teacher.";

    }

    if (!formData.school_medium_id) {

      validationErrors.school_medium_id =
        "Please select School Medium.";

    }

    if (!formData.start_time) {

      validationErrors.start_time =
        "Start Time is required.";

    }

    if (!formData.end_time) {

      validationErrors.end_time =
        "End Time is required.";

    }

    if (
      formData.start_time &&
      formData.end_time &&
      formData.start_time >= formData.end_time
    ) {

      validationErrors.end_time =
        "End Time should be greater than Start Time.";

    }

    setErrors(validationErrors);

    return (
      Object.keys(validationErrors)
        .length === 0
    );

  };

  // ===============================
  // SUBMIT
  // ===============================

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validate()) {

      return;

    }

    const payload = {

      ...formData,

      duration_minutes:
        Number(
          formData.duration_minutes
        )

    };

    onSubmit(payload);

  };

  // ===============================
  // INPUT CLASS
  // ===============================

  const inputClass =

    "w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition";

  const labelClass =

    "block mb-2 font-medium text-slate-700";

  const errorClass =

    "text-red-500 text-sm mt-1";
      return (

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-8"
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Batch Code */}

        <div>

          <label className={labelClass}>
            Batch Code
          </label>

          <input
            type="text"
            name="batch_code"
            value={formData.batch_code}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter Batch Code"
          />

          {errors.batch_code && (
            <p className={errorClass}>
              {errors.batch_code}
            </p>
          )}

        </div>

        {/* School Class */}

        <div>

          <label className={labelClass}>
            School Class
          </label>

          <select
            name="school_class_id"
            value={formData.school_class_id}
            onChange={handleChange}
            className={inputClass}
          >

            <option value="">
              Select School Class
            </option>

            {schoolClasses.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.class_name}
              </option>

            ))}

          </select>

          {errors.school_class_id && (

            <p className={errorClass}>
              {errors.school_class_id}
            </p>

          )}

        </div>

        {/* Academic Year */}

        <div>

          <label className={labelClass}>
            Academic Year
          </label>

          <select
            name="academic_year_id"
            value={formData.academic_year_id}
            onChange={handleChange}
            className={inputClass}
          >

            <option value="">
              Select Academic Year
            </option>

            {academicYears.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.academic_year_name}
              </option>

            ))}

          </select>

          {errors.academic_year_id && (

            <p className={errorClass}>
              {errors.academic_year_id}
            </p>

          )}

        </div>

        {/* Section */}

        <div>

          <label className={labelClass}>
            Section
          </label>

          <select
            name="section_id"
            value={formData.section_id}
            onChange={handleChange}
            className={inputClass}
          >

            <option value="">
              Select Section
            </option>

            {sections.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.section_name}
              </option>

            ))}

          </select>

          {errors.section_id && (

            <p className={errorClass}>
              {errors.section_id}
            </p>

          )}

        </div>

        {/* Teacher */}

        <div>

          <label className={labelClass}>
            Class Teacher
          </label>

          <select
            name="teacher_id"
            value={formData.teacher_id}
            onChange={handleChange}
            className={inputClass}
          >

            <option value="">
              Select Teacher
            </option>

            {teachers.map((teacher) => (

              <option
                key={teacher.id}
                value={teacher.id}
              >
                {teacher.full_name}
              </option>

            ))}

          </select>

          {errors.teacher_id && (

            <p className={errorClass}>
              {errors.teacher_id}
            </p>

          )}

        </div>

        {/* Medium */}

        <div>

          <label className={labelClass}>
            School Medium
          </label>

          <select
            name="school_medium_id"
            value={formData.school_medium_id}
            onChange={handleChange}
            className={inputClass}
          >

            <option value="">
              Select Medium
            </option>

            {mediums.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.medium_name ||
                 item.custom_medium_name}
              </option>

            ))}

          </select>

          {errors.school_medium_id && (

            <p className={errorClass}>
              {errors.school_medium_id}
            </p>

          )}

        </div>

        {/* Start Time */}

        <div>

          <label className={labelClass}>
            Start Time
          </label>

          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            className={inputClass}
          />

          {errors.start_time && (

            <p className={errorClass}>
              {errors.start_time}
            </p>

          )}

        </div>

        {/* End Time */}

        <div>

          <label className={labelClass}>
            End Time
          </label>

          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            className={inputClass}
          />

          {errors.end_time && (

            <p className={errorClass}>
              {errors.end_time}
            </p>

          )}

        </div>

        {/* Duration */}

        <div className="md:col-span-2">

          <label className={labelClass}>
            Duration (Minutes)
          </label>

          <input
            type="number"
            value={formData.duration_minutes}
            readOnly
            className={`${inputClass} bg-slate-100 cursor-not-allowed`}
          />

        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4 mt-8">

        <button
          type="button"
          onClick={onCancel}
          className="
            px-6
            py-3
            rounded-lg
            border
            border-slate-300
            hover:bg-slate-100
            transition
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="
            px-8
            py-3
            rounded-lg
            bg-blue-600
            hover:bg-blue-700
            text-white
            transition
            disabled:opacity-50
          "
        >

          {
            loading
              ? "Saving..."
              : mode === "create"
              ? "Create Batch"
              : "Update Batch"
          }

        </button>

      </div>

    </form>

  );

}

export default BatchForm;