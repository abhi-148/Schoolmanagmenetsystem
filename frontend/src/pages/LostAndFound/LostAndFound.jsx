import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {

  getAllLostAndFound,

  searchLostAndFound,

  updateLostAndFoundStatus

} from "../../services/lostAndFoundService";

function LostAndFound() {

  const navigate =
    useNavigate();

  const [items, setItems] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    fetchItems();

  }, []);

  const fetchItems =
    async () => {

      try {

        setLoading(true);

        const response =
          await getAllLostAndFound();

        setItems(
          response.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  const handleSearch =
    async () => {

      try {

        if (!search) {

          fetchItems();

          return;

        }

        const response =
          await searchLostAndFound(
            search
          );

        setItems(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleStatus =
    async (
      id,
      status
    ) => {

      try {

        await updateLostAndFoundStatus(

          id,

          status === "ACTIVE"
            ? "INACTIVE"
            : "ACTIVE"

        );

        fetchItems();

      } catch (error) {

        console.log(error);

      }

    };

      return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Lost And Found
          </h1>

          <button
            onClick={() =>
              navigate("/lost-and-found/add")
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            + Add Item
          </button>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Search Item..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border rounded-lg p-3 flex-1"
            />

            <button
              onClick={handleSearch}
              className="bg-green-600 text-white px-6 rounded-lg"
            >
              Search
            </button>

            <button
              onClick={fetchItems}
              className="bg-gray-600 text-white px-6 rounded-lg"
            >
              Refresh
            </button>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Item
                </th>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Branch
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Record Status
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {
                loading ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center p-8"
                    >
                      Loading...
                    </td>

                  </tr>

                ) :

                                  items.length > 0 ? (

                    items.map((item) => (

                      <tr
                        key={item.item_id}
                        className="border-t hover:bg-slate-50"
                      >

                        <td className="p-4">
                          {item.item_id}
                        </td>

                        <td className="p-4">
                          {item.item_name}
                        </td>

                        <td className="p-4">
                          {item.category}
                        </td>

                        <td className="p-4">
                          {item.branch_name}
                        </td>

                        <td className="p-4">
                          {item.status}
                        </td>

                        <td className="p-4">
                          {item.record_status}
                        </td>

                        <td className="p-4">

                          <div className="flex gap-2 justify-center">

                            <button
                              onClick={() =>
                                navigate(
                                  `/lost-and-found/view/${item.item_id}`
                                )
                              }
                              className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                            >
                              View
                            </button>

                            <button
                              onClick={() =>
                                navigate(
                                  `/lost-and-found/edit/${item.item_id}`
                                )
                              }
                              className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleStatus(
                                  item.item_id,
                                  item.record_status
                                )
                              }
                              className={`px-3 py-2 rounded-lg text-white ${
                                item.record_status ===
                                "ACTIVE"
                                  ? "bg-red-600"
                                  : "bg-green-600"
                              }`}
                            >
                              {item.record_status ===
                              "ACTIVE"
                                ? "Deactivate"
                                : "Activate"}
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center p-8"
                      >
                        No Data Found
                      </td>

                    </tr>

                  )

              }

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default LostAndFound;