import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getLostAndFoundById
} from "../../services/lostAndFoundService";

function ViewLostAndFound() {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [item, setItem] =
    useState(null);

  useEffect(() => {

    fetchItem();

  }, [id]);

  const fetchItem =
    async () => {

      try {

        const response =
          await getLostAndFoundById(id);

        setItem(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  if (!item) {

    return (

      <AdminLayout>

        <div className="p-8">

          Loading...

        </div>

      </AdminLayout>

    );

  }

    return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            View Lost And Found
          </h1>

          <button
            onClick={() =>
              navigate("/lost-and-found")
            }
            className="bg-gray-600 text-white px-5 py-3 rounded-lg"
          >
            Back
          </button>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <p className="text-gray-500">
                Item ID
              </p>

              <h3 className="font-semibold">
                {item.item_id}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                School
              </p>

              <h3 className="font-semibold">
                {item.school_name}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Branch
              </p>

              <h3 className="font-semibold">
                {item.branch_name}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Item Name
              </p>

              <h3 className="font-semibold">
                {item.item_name}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Category
              </p>

              <h3 className="font-semibold">
                {item.category}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Location Found
              </p>

              <h3 className="font-semibold">
                {item.location_found}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Found Date
              </p>

              <h3 className="font-semibold">
                {item.found_datetime?.slice(
                  0,
                  10
                )}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Found By Staff
              </p>

              <h3 className="font-semibold">
           {item.found_by_staff_name}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Found By Student
              </p>

              <h3 className="font-semibold">
               {item.found_by_student_name}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Status
              </p>

              <h3 className="font-semibold">
                {item.status}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Record Status
              </p>

              <h3 className="font-semibold">
                {item.record_status}
              </h3>

            </div>

            <div className="md:col-span-2">

              <p className="text-gray-500">
                Description
              </p>

              <h3 className="font-semibold">
                {item.description}
              </h3>

            </div>

            {item.image_path && (

  <div className="md:col-span-2">

    <p className="text-gray-500 mb-2">
      Item Image
    </p>

    <img
      src={`http://localhost:5000${item.image_path}`}
      alt="Lost Item"
      className="w-72 h-72 object-cover rounded-lg border shadow"
    />

  </div>

)}

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

export default ViewLostAndFound;