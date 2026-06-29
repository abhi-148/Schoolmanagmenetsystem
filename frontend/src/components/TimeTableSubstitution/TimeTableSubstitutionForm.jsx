import {
  useEffect,
  useState
} from "react";

import {
  getTimeTables
} from "../../services/timetableService";

import {
  getStaff
} from "../../services/staffService";

function TimeTableSubstitutionForm({

  initialData = null,

  onSubmit,

  loading = false

}) {

  // ===========================
  // Dropdown Data
  // ===========================

  const [
    timetables,
    setTimetables
  ] = useState([]);

  const [
    teachers,
    setTeachers
  ] = useState([]);

  // ===========================
  // Form State
  // ===========================

  const [
    formData,
    setFormData
  ] = useState({

    time_table_id: "",

    original_teacher_id: "",

    substitute_teacher_id: "",

    substitution_date: "",

    reason: "",

    remark: "",

    status: "active"

  });

  // ===========================
  // Load Dropdowns
  // ===========================

  useEffect(() => {

    fetchDropdowns();

  }, []);

  const fetchDropdowns =
  async () => {

    try {

      const [

        timetableRes,

        teacherRes

      ] = await Promise.all([

        getTimeTables(),

        getStaff()

      ]);

      setTimetables(

        timetableRes.data || []

      );

      setTeachers(

        teacherRes.data || []

      );

    }

    catch (error) {

      console.log(error);

    }

  };

  // ===========================
  // Edit Mode
  // ===========================

  useEffect(() => {

    if (!initialData) return;

    setFormData({

      time_table_id:
        initialData.time_table_id || "",

      original_teacher_id:
        initialData.original_teacher_id || "",

      substitute_teacher_id:
        initialData.substitute_teacher_id || "",

      substitution_date:
        initialData.substitution_date || "",

      reason:
        initialData.reason || "",

      remark:
        initialData.remark || "",

      status:
        initialData.status || "active"

    });

  }, [

    initialData

  ]);

  // ===========================
  // Handle Change
  // ===========================

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

  // ===========================
  // Submit
  // ===========================

  const handleSubmit = (

    e

  ) => {

    e.preventDefault();

    onSubmit(formData);

  };

    return (

    <form

      onSubmit={handleSubmit}

      className="bg-white rounded-xl shadow-md p-8"

    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Timetable */}

        <div>

          <label className="block mb-2 font-medium">

            Timetable

          </label>

          <select

            name="time_table_id"

            value={formData.time_table_id}

            onChange={handleChange}

            required

            className="
              w-full
              border
              rounded-lg
              px-4
              py-3
            "

          >

            <option value="">

              Select Timetable

            </option>

            {

              timetables.map(

                (item) => (

                  <option

                    key={item.time_table_id}

                    value={item.time_table_id}

                  >

                    {

                      item.batch_code

                    }

                    {" | "}

                    {

                      item.subject_name

                    }

                    {" | "}

                    {

                      item.day_of_week

                    }

                  </option>

                )

              )

            }

          </select>

        </div>

        {/* Original Teacher */}

        <div>

          <label className="block mb-2 font-medium">

            Original Teacher

          </label>

          <select

            name="original_teacher_id"

            value={formData.original_teacher_id}

            onChange={handleChange}

            required

            className="
              w-full
              border
              rounded-lg
              px-4
              py-3
            "

          >

            <option value="">

              Select Teacher

            </option>

            {

              teachers.map(

                (teacher) => (

                  <option

                    key={teacher.id}

                    value={teacher.id}

                  >

                    {

                      teacher.full_name

                    }

                  </option>

                )

              )

            }

          </select>

        </div>

        {/* Substitute Teacher */}

        <div>

          <label className="block mb-2 font-medium">

            Substitute Teacher

          </label>

          <select

            name="substitute_teacher_id"

            value={formData.substitute_teacher_id}

            onChange={handleChange}

            required

            className="
              w-full
              border
              rounded-lg
              px-4
              py-3
            "

          >

            <option value="">

              Select Teacher

            </option>

            {

              teachers.map(

                (teacher) => (

                  <option

                    key={teacher.id}

                    value={teacher.id}

                  >

                    {

                      teacher.full_name

                    }

                  </option>

                )

              )

            }

          </select>

        </div>

        {/* Date */}

        <div>

          <label className="block mb-2 font-medium">

            Substitution Date

          </label>

          <input

            type="date"

            name="substitution_date"

            value={formData.substitution_date}

            onChange={handleChange}

            required

            className="
              w-full
              border
              rounded-lg
              px-4
              py-3
            "

          />

        </div>

        {/* Reason */}

        <div className="md:col-span-2">

          <label className="block mb-2 font-medium">

            Reason

          </label>

          <input

            type="text"

            name="reason"

            value={formData.reason}

            onChange={handleChange}

            placeholder="Reason"

            className="
              w-full
              border
              rounded-lg
              px-4
              py-3
            "

          />

        </div>

        {/* Remark */}

        <div className="md:col-span-2">

          <label className="block mb-2 font-medium">

            Remark

          </label>

          <textarea

            rows="4"

            name="remark"

            value={formData.remark}

            onChange={handleChange}

            className="
              w-full
              border
              rounded-lg
              px-4
              py-3
            "

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

            className="
              w-full
              border
              rounded-lg
              px-4
              py-3
            "

          >

            <option value="active">

              Active

            </option>

            <option value="inactive">

              Inactive

            </option>

          </select>

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

                ? "Update Substitution"

                : "Create Substitution"

            }

          </button>

        </div>

      </div>

    </form>

  );

}

export default TimeTableSubstitutionForm;
      