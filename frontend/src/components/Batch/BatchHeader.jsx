import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BatchHeader() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Batch Management
          </h1>

          <p className="text-slate-500 mt-2">
            Create, manage and organize school batches.
          </p>
        </div>

        <button
          onClick={() => navigate("/batches/add")}
          className="
            flex
            items-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-3
            rounded-lg
            shadow
            transition-all
            duration-300
          "
        >
          <Plus size={20} />
          Add Batch
        </button>

      </div>
    </div>
  );
}

export default BatchHeader;