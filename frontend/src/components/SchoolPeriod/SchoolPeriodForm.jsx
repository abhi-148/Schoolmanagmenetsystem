import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getSchools
} from "../../services/schoolService";

import {
  getSchoolBranches
} from "../../services/schoolBranchService";

function SchoolPeriodForm({

  initialData = {},

  onSubmit,

  loading = false,

}) {

  const navigate = useNavigate();

  const [schools, setSchools] =
    useState([]);

  const [branches, setBranches] =
    useState([]);

  const [formData, setFormData] =
    useState({

      school_id:
        initialData.school_id || "",

      branch_id:
        initialData.branch_id || "",

      period_number:
        initialData.period_number || "",

      start_time:
        initialData.start_time || "",

      end_time:
        initialData.end_time || "",

      slot_duration:
        initialData.slot_duration || "",

      status:
        initialData.status || "active",

    });

  // ==========================
  // Fetch Schools
  // ==========================

  useEffect(() => {

    fetchSchools();

  }, []);

  const fetchSchools =
    async () => {

      try {

        const response =
          await getSchools();

        setSchools(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  // ==========================
  // Fetch Branches
  // ==========================

  useEffect(() => {

    fetchBranches();

  }, []);

  const fetchBranches =
    async () => {

      try {

        const response =
          await getSchoolBranches();

        setBranches(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  // ==========================
  // Auto Duration
  // ==========================

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

      const duration =
        Math.floor(
          (end - start) / 60000
        );

      setFormData((prev) => ({

        ...prev,

        slot_duration:
          duration > 0
            ? duration
            : "",

      }));

    }

  }, [

    formData.start_time,

    formData.end_time

  ]);

  // ==========================
  // Handle Change
  // ==========================

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };
      // ==========================
  // Submit
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    await onSubmit(formData);

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        rounded-xl
        shadow-md
        p-8
        space-y-6
      "
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* School */}

        <div>

          <label className="block mb-2 font-medium text-slate-700">

            School

          </label>

          <select

            name="school_id"

            value={formData.school_id}

            onChange={handleChange}

            required

            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              focus:ring-2
              focus:ring-blue-500
              outline-none
            "

          >

            <option value="">

              Select School

            </option>

            {

              schools.map((school) => (

                <option

                  key={school.id}

                  value={school.id}

                >

                  {school.school_name}

                </option>

              ))

            }

          </select>

        </div>

        {/* Branch */}

        <div>

          <label className="block mb-2 font-medium text-slate-700">

            Branch

          </label>

          <select

            name="branch_id"

            value={formData.branch_id}

            onChange={handleChange}

            required

            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              focus:ring-2
              focus:ring-blue-500
              outline-none
            "

          >

            <option value="">

              Select Branch

            </option>

            {

              branches.map((branch) => (

                <option

                  key={branch.id}

                  value={branch.id}

                >

                  {branch.branch_name}

                </option>

              ))

            }

          </select>

        </div>

        {/* Period Number */}

        <div>

          <label className="block mb-2 font-medium text-slate-700">

            Period Number

          </label>

          <input

            type="number"

            name="period_number"

            value={formData.period_number}

            onChange={handleChange}

            min="1"

            required

            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              focus:ring-2
              focus:ring-blue-500
              outline-none
            "

          />

        </div>

        {/* Status */}

        <div>

          <label className="block mb-2 font-medium text-slate-700">

            Status

          </label>

          <select

            name="status"

            value={formData.status}

            onChange={handleChange}

            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              focus:ring-2
              focus:ring-blue-500
              outline-none
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

        {/* Start Time */}

        <div>

          <label className="block mb-2 font-medium text-slate-700">

            Start Time

          </label>

          <input

            type="time"

            name="start_time"

            value={formData.start_time}

            onChange={handleChange}

            required

            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              focus:ring-2
              focus:ring-blue-500
              outline-none
            "

          />

        </div>

        {/* End Time */}

        <div>

          <label className="block mb-2 font-medium text-slate-700">

            End Time

          </label>

          <input

            type="time"

            name="end_time"

            value={formData.end_time}

            onChange={handleChange}

            required

            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              focus:ring-2
              focus:ring-blue-500
              outline-none
            "

          />

        </div>

        {/* Duration */}

        <div>

          <label className="block mb-2 font-medium text-slate-700">

            Slot Duration (Minutes)

          </label>

          <input

            type="number"

            value={formData.slot_duration}

            readOnly

            className="
              w-full
              bg-slate-100
              border
              rounded-xl
              px-4
              py-3
              cursor-not-allowed
            "

          />

        </div>

      </div>

      {/* Buttons */}

      <div
        className="
          flex
          justify-end
          gap-4
          pt-4
        "
      >

        <button

          type="button"

          onClick={() =>
            navigate("/school-periods")
          }

          className="
            px-6
            py-3
            rounded-xl
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
            px-6
            py-3
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            transition
          "

        >

          {

            loading

              ? "Saving..."

              : "Save School Period"

          }

        </button>

      </div>

    </form>

  );

}

export default SchoolPeriodForm;