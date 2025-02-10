export default function TableUsers({ headers = [], data = [] }) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2 border text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {Array.isArray(row) ? (
                  row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-2 border">
                      {cell}
                    </td>
                  ))
                ) : (
                  <td colSpan={headers.length} className="px-4 py-2 border">
                    {row}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length || 1}
                className="px-4 py-2 text-center"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
