import { useEffect, useState } from "react";

import {
  getExams,
} from "../../services/examService";

import {
  getSubjects,
} from "../../services/subjectService";

import {
  getBatches,
} from "../../services/batchService";

import {
  getSchools,
} from "../../services/schoolService";

import {
  getStaff,
} from "../../services/staffService";

function ExamTimetableForm({

  initialData = {},

  mode = "create",

  loading = false,

  onSubmit,

  onCancel

}) {

  // ===============================
  // DROPDOWN STATES
  // ===============================

  const [exams, setExams] =
    useState([]);

  const [subjects, setSubjects] =
    useState([]);

  const [batches, setBatches] =
    useState([]);

  const [schools, setSchools] =
    useState([]);

  const [staff, setStaff] =
    useState([]);

  // ===============================
  // FORM STATE
  // ===============================

  const [formData, setFormData] =
    useState({

      exam_id:
        initialData.exam_id || "",

      subject_id:
        initialData.subject_id || "",

      batch_id:
        initialData.batch_id || "",

      school_id:
        initialData.school_id || "",

      exam_date:
        initialData.exam_date || "",

      start_time:
        initialData.start_time || "",

      end_time:
        initialData.end_time || "",

      room_number:
        initialData.room_number || "",

      supervisor_id:
        initialData.supervisor_id || ""

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

          examRes,

          subjectRes,

          batchRes,

          schoolRes,

          staffRes

        ] = await Promise.all([

          getExams(),

          getSubjects(),

          getBatches(),

          getSchools(),

          getStaff()

        ]);

        setExams(
          examRes.data || []
        );

        setSubjects(
          subjectRes.data || []
        );

        setBatches(
          batchRes.data || []
        );

        setSchools(
          schoolRes.data || []
        );

        setStaff(
          staffRes.data || []
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
  // VALIDATION
  // ===============================

  const validate = () => {

    const validationErrors = {};

    if (!formData.exam_id) {

      validationErrors.exam_id =
        "Please select Exam.";

    }

    if (!formData.subject_id) {

      validationErrors.subject_id =
        "Please select Subject.";

    }

    if (!formData.batch_id) {

      validationErrors.batch_id =
        "Please select Batch.";

    }

    if (!formData.school_id) {

      validationErrors.school_id =
        "Please select School.";

    }

    if (!formData.exam_date) {

      validationErrors.exam_date =
        "Exam Date is required.";

    }

    if (!formData.start_time) {

      validationErrors.start_time =
        "Start Time is required.";

    }

    if (!formData.end_time) {

      validationErrors.end_time =
        "End Time is required.";

    }

    if (!formData.room_number.trim()) {

      validationErrors.room_number =
        "Room Number is required.";

    }

    if (!formData.supervisor_id) {

      validationErrors.supervisor_id =
        "Please select Supervisor.";

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

    onSubmit(formData);

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

        {/* Exam */}

        <div>

          <label className={labelClass}>

            Exam

          </label>

          <select
            name="exam_id"
            value={formData.exam_id}
            onChange={handleChange}
            className={inputClass}
          >

            <option value="">

              Select Exam

            </option>

            {

              exams.map((item) => (

                <option
                  key={item.id}
                  value={item.id}
                >

                  {item.exam_name}

                </option>

              ))

            }

          </select>

          {

            errors.exam_id && (

              <p className={errorClass}>

                {errors.exam_id}

              </p>

            )

          }

        </div>

        {/* Subject */}

        <div>

          <label className={labelClass}>

            Subject

          </label>

          <select
            name="subject_id"
            value={formData.subject_id}
            onChange={handleChange}
            className={inputClass}
          >

            <option value="">

              Select Subject

            </option>

            {

              subjects.map((item) => (

                <option
                  key={item.id}
                  value={item.id}
                >

                  {item.subject_name}

                </option>

              ))

            }

          </select>

          {

            errors.subject_id && (

              <p className={errorClass}>

                {errors.subject_id}

              </p>

            )

          }

        </div>

        {/* Batch */}

        <div>

          <label className={labelClass}>

            Batch

          </label>

          <select
            name="batch_id"
            value={formData.batch_id}
            onChange={handleChange}
            className={inputClass}
          >

            <option value="">

              Select Batch

            </option>

            {

              batches.map((item) => (

                <option
                  key={item.batch_id}
                  value={item.batch_id}
                >

                  {item.batch_code}

                </option>

              ))

            }

          </select>

          {

            errors.batch_id && (

              <p className={errorClass}>

                {errors.batch_id}

              </p>

            )

          }

        </div>

        {/* School */}

        <div>

          <label className={labelClass}>

            School

          </label>

          <select
            name="school_id"
            value={formData.school_id}
            onChange={handleChange}
            className={inputClass}
          >

            <option value="">

              Select School

            </option>

            {

              schools.map((item) => (

                <option
                  key={item.id}
                  value={item.id}
                >

                  {item.school_name}

                </option>

              ))

            }

          </select>

          {

            errors.school_id && (

              <p className={errorClass}>

                {errors.school_id}

              </p>

            )

          }

        </div>

        {/* Exam Date */}

        <div>

          <label className={labelClass}>

            Exam Date

          </label>

          <input
            type="date"
            name="exam_date"
            value={formData.exam_date}
            onChange={handleChange}
            className={inputClass}
          />

          {

            errors.exam_date && (

              <p className={errorClass}>

                {errors.exam_date}

              </p>

            )

          }

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

        {/* Room Number */}

        <div>

          <label className={labelClass}>

            Room Number

          </label>

          <input
            type="text"
            name="room_number"
            value={formData.room_number}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter Room Number"
          />

          {errors.room_number && (

            <p className={errorClass}>
              {errors.room_number}
            </p>

          )}

        </div>

        {/* Supervisor */}

        <div>

          <label className={labelClass}>

            Supervisor

          </label>

          <select
            name="supervisor_id"
            value={formData.supervisor_id}
            onChange={handleChange}
            className={inputClass}
          >

            <option value="">

              Select Supervisor

            </option>

            {

              staff.map((item) => (

                <option
                  key={item.id}
                  value={item.id}
                >

                  {item.full_name}

                </option>

              ))

            }

          </select>

          {errors.supervisor_id && (

            <p className={errorClass}>
              {errors.supervisor_id}
            </p>

          )}

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

              ? "Create Exam Timetable"

              : "Update Exam Timetable"

          }

        </button>

      </div>

    </form>

  );

}

export default ExamTimetableForm;