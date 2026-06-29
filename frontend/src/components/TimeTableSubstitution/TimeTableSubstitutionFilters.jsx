import {
  Search,
  RotateCcw
} from "lucide-react";

function TimeTableSubstitutionFilters({

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

        <div className="relative">

          <Search
            size={18}
            className="
              absolute
              left-3
              top-3.5
              text-slate-400
            "
          />

          <input

            type="text"

            placeholder="Search Teacher / Reason..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

            className="
              w-full
              border
              rounded-lg
              pl-10
              pr-4
              py-3
              focus:ring-2
              focus:ring-blue-500
              outline-none
            "

          />

        </div>

        {/* Status */}

        <select

          value={status}

          onChange={(e) =>
            setStatus(e.target.value)
          }

          className="
            border
            rounded-lg
            p-3
            focus:ring-2
            focus:ring-blue-500
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

        {/* Reset */}

        <button

          onClick={onReset}

          className="
            flex
            items-center
            justify-center
            gap-2
            bg-slate-200
            hover:bg-slate-300
            rounded-lg
            p-3
            transition
          "

        >

          <RotateCcw size={18} />

          Reset

        </button>

      </div>

    </div>

  );

}

export default TimeTableSubstitutionFilters;