function ExamTimetableFilters({

  search,

  setSearch,

  status,

  setStatus,

  onReset

}) {

  return (

    <div className="bg-white rounded-xl shadow-md p-6 mb-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Search */}

        <div>

          <label className="block text-sm font-medium text-slate-700 mb-2">

            Search

          </label>

          <input
            type="text"
            placeholder="Search Exam, Subject, Room..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              border
              border-slate-300
              rounded-lg
              px-4
              py-3
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              outline-none
            "
          />

        </div>

        {/* Status */}

        <div>

          <label className="block text-sm font-medium text-slate-700 mb-2">

            Status

          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="
              w-full
              border
              border-slate-300
              rounded-lg
              px-4
              py-3
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              outline-none
            "
          >

            <option value="">
              All Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

          </select>

        </div>

        {/* Reset */}

        <div className="flex items-end">

          <button

            type="button"

            onClick={onReset}

            className="
              w-full
              bg-slate-600
              hover:bg-slate-700
              text-white
              px-6
              py-3
              rounded-lg
              transition
            "

          >

            Reset Filters

          </button>

        </div>

      </div>

    </div>

  );

}

export default ExamTimetableFilters;