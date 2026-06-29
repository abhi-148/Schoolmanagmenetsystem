import {
  useEffect,
  useState
} from "react";

import {
  getBatches
} from "../../services/batchService";

import {
  getSchoolPeriods
} from "../../services/schoolPeriodService";

import {
  getSubjects
} from "../../services/subjectService";

import {
  getStaff
} from "../../services/staffService";

function TimetableForm({

  initialData = null,

  onSubmit,

  loading = false

}) {

  // ==========================================
  // Dropdown Data
  // ==========================================

  const [

    batches,

    setBatches

  ] = useState([]);

  const [

    periods,

    setPeriods

  ] = useState([]);

  const [

    subjects,

    setSubjects

  ] = useState([]);

  const [

    teachers,

    setTeachers

  ] = useState([]);

  // ==========================================
  // Form State
  // ==========================================

  const [

    formData,

    setFormData

  ] = useState({

    batch_id: "",

    period_id: "",

    school_subject_id: "",

    teacher_id: "",

    day_of_week: "",

    duration_minutes: "",

    room_number: "",

    status: "active"

  });

  // ==========================================
  // Fetch Dropdown Data
  // ==========================================

  useEffect(() => {

    fetchDropdownData();

  }, []);

  const fetchDropdownData = async () => {

    try {

      const [

        batchRes,

        periodRes,

        subjectRes,

        teacherRes

      ] = await Promise.all([

        getBatches(),

        getSchoolPeriods(),

        getSubjects(),

        getStaff()

      ]);

      setBatches(

        batchRes.data || []

      );

      setPeriods(

        periodRes.data || []

      );

      setSubjects(

        subjectRes.data || []

      );

      setTeachers(

        teacherRes.data || []

      );

    }

    catch (error) {

      console.log(error);

    }

  };

  // ==========================================
  // Edit Mode
  // ==========================================

  useEffect(() => {

    if (!initialData) return;

    setFormData({

      batch_id:
        initialData.batch_id || "",

      period_id:
        initialData.period_id || "",

      school_subject_id:
        initialData.school_subject_id || "",

      teacher_id:
        initialData.teacher_id || "",

      day_of_week:
        initialData.day_of_week || "",

      duration_minutes:
        initialData.duration_minutes || "",

      room_number:
        initialData.room_number || "",

      status:
        initialData.status || "active"

    });

  }, [

    initialData

  ]);

  // ==========================================
  // Input Change
  // ==========================================

  const handleChange = (

    e

  ) => {

    const {

      name,

      value

    } = e.target;

    setFormData({

      ...formData,

      [name]: value

    });

  };

    // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !formData.batch_id ||
      !formData.period_id ||
      !formData.school_subject_id ||
      !formData.teacher_id ||
      !formData.day_of_week
    ) {

      alert("Please fill all required fields.");

      return;

    }

    onSubmit(formData);

  };

  // ==========================================
  // UI
  // ==========================================

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-8"
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Batch */}

        <div>

          <label className="block mb-2 font-medium">

            Batch

          </label>

          <select

            name="batch_id"

            value={formData.batch_id}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="">

              Select Batch

            </option>

            {

              batches.map((batch) => (

                <option
                  key={batch.batch_id}
                  value={batch.batch_id}
                >

                  {batch.batch_code}

                </option>

              ))

            }

          </select>

        </div>

        {/* Period */}

        <div>

          <label className="block mb-2 font-medium">

            Period

          </label>

          <select

            name="period_id"

            value={formData.period_id}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="">

              Select Period

            </option>

            {

              periods.map((period) => (

                <option
                  key={period.period_id}
                  value={period.period_id}
                >

                  Period {period.period_number}

                </option>

              ))

            }

          </select>

        </div>

        {/* Subject */}

        <div>

          <label className="block mb-2 font-medium">

            Subject

          </label>

          <select

            name="school_subject_id"

            value={formData.school_subject_id}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="">

              Select Subject

            </option>

            {

              subjects.map((subject) => (

                <option
                  key={subject.id}
                  value={subject.id}
                >

                  {subject.subject_name}

                </option>

              ))

            }

          </select>

        </div>

        {/* Teacher */}

        <div>

          <label className="block mb-2 font-medium">

            Teacher

          </label>

          <select

            name="teacher_id"

            value={formData.teacher_id}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="">

              Select Teacher

            </option>

            {

              teachers.map((teacher) => (

                <option
                  key={teacher.id}
                  value={teacher.id}
                >

                  {teacher.full_name}

                </option>

              ))

            }

          </select>

        </div>

        {/* Day */}

        <div>

          <label className="block mb-2 font-medium">

            Day

          </label>

          <select

            name="day_of_week"

            value={formData.day_of_week}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="">

              Select Day

            </option>

            <option value="Monday">Monday</option>

            <option value="Tuesday">Tuesday</option>

            <option value="Wednesday">Wednesday</option>

            <option value="Thursday">Thursday</option>

            <option value="Friday">Friday</option>

            <option value="Saturday">Saturday</option>

          </select>

        </div>

        {/* Room */}

        <div>

          <label className="block mb-2 font-medium">

            Room Number

          </label>

          <input

            type="text"

            name="room_number"

            value={formData.room_number}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

            placeholder="Room No"

          />

        </div>

        {/* Duration */}

        <div>

          <label className="block mb-2 font-medium">

            Duration (Minutes)

          </label>

          <input

            type="number"

            name="duration_minutes"

            value={formData.duration_minutes}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

            placeholder="40"

          />

        </div>

        {/* Status */}

        <div>

          <label className="block mb-2 font-medium">

            Status

          </label>

          <select

            name="status"

            value={formData.status}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="active">

              Active

            </option>

            <option value="inactive">

              Inactive

            </option>

          </select>

        </div>

      </div>

            {/* Buttons */}

      <div className="md:col-span-2 flex justify-end gap-4 mt-8">

        <button

          type="button"

          onClick={() => window.history.back()}

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
            font-semibold
            transition
            disabled:opacity-50
          "

        >

          {

            loading

              ? "Saving..."

              : initialData

              ? "Update Timetable"

              : "Create Timetable"

          }

        </button>

      </div>

    </form>

  );

}

export default TimetableForm;