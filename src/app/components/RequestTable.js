export default function RequestTable({
  history,
  isAdmin,
  deleteRequest,
  resolveRequest,
  makeHighPriority,
}) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">
        Requests
      </h2>

      {history.length === 0 && (
        <p>No requests yet.</p>
      )}

      <div className="space-y-3">
        {history.map((item, index) => (
          <div
            key={index}
            className="bg-slate-700 p-4 rounded-xl"
          >
            <p><b>Area:</b> {item.area}</p>
            <p><b>Need:</b> {item.need}</p>

            <p>
              <b>Priority:</b>{" "}
              {item.priority || "low"}
            </p>

            <p>
              <b>Status:</b>{" "}
              {item.status || "Pending"}
            </p>

            {isAdmin && (
              <div className="flex gap-2 mt-4 flex-wrap">

                <button
                  onClick={() =>
                    deleteRequest(index)
                  }
                  className="px-3 py-2 bg-red-500 rounded"
                >
                  Delete
                </button>

                <button
                  onClick={() =>
                    resolveRequest(index)
                  }
                  className="px-3 py-2 bg-green-500 rounded"
                >
                  Resolve
                </button>

                <button
                  onClick={() =>
                    makeHighPriority(index)
                  }
                  className="px-3 py-2 bg-yellow-500 rounded text-black"
                >
                  High Priority
                </button>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}