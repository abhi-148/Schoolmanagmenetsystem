import { Search, RotateCcw } from "lucide-react";

function BatchFilters({
  search,
  setSearch,
  status,
  setStatus,
  onReset,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Search */}

        <div>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Search Batch
          </label>

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="Batch Code / Teacher / Class"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                border
                border-slate-300
                rounded-lg
                pl-10
                pr-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                transition
              "
            />

          </div>

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
              outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              transition
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
            onClick={onReset}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              bg-slate-700
              hover:bg-slate-800
              text-white
              py-3
              rounded-lg
              transition
              duration-300
            "
          >

            <RotateCcw size={18} />

            Reset Filters

          </button>

        </div>

      </div>

    </div>
  );
}

export default BatchFilters;