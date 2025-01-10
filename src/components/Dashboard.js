import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const documents = [
    { id: "1", title: "Document 1" },
    { id: "2", title: "Document 2" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Your Documents</h1>
      <Link
        to="/editor/new"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 inline-block"
      >
        Create New Document
      </Link>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id} className="mb-2">
            <Link
              to={`/editor/${doc.id}`}
              className="text-blue-500 hover:underline"
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;