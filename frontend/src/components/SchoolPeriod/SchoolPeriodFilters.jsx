import {
  Search,
  RotateCcw,
} from "lucide-react";

function SchoolPeriodFilters({

  search,
  setSearch,

  status,
  setStatus,

  onReset,

}) {

  return (

    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        p-5
        mb-6
      "
    >

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-5
        "
      >

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input

            type="text"

            placeholder="
              Search School,
              Branch,
              Period...
            "

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            className="
              w-full
              border
              rounded-xl
              pl-11
              pr-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "

          />

        </div>

        {/* Status */}

        <select

          value={status}

          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }

          className="
            border
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
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

            bg-slate-700
            hover:bg-slate-800

            text-white

            rounded-xl

            py-3

            transition
          "

        >

          <RotateCcw size={18} />

          Reset Filters

        </button>

      </div>

    </div>

  );

}

export default SchoolPeriodFilters;