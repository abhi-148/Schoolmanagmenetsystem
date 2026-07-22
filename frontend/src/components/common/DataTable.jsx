import React from "react";

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No Data Found",
  renderActions,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b"
              >
                {column.label}
              </th>
            ))}

            {renderActions && (
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
                      {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={row.id || index}
                className="hover:bg-slate-50 border-b"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-3 text-sm text-gray-700"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}

                {renderActions && (
                  <td className="px-4 py-3 text-center">
                    {renderActions(row)}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={
                  renderActions
                    ? columns.length + 1
                    : columns.length
                }
                className="text-center py-8 text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
       