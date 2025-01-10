import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { databases } from "../appwriteConfig";

const Editor = ({ match }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  const databaseId = process.env.REACT_APP_APPWRITE_DATABASE_ID;
  const collectionId = process.env.REACT_APP_APPWRITE_COLLECTION_ID;

  // Fetch all documents
  const fetchDocuments = async () => {
    try {
      const response = await databases.listDocuments(databaseId, collectionId);
      setDocuments(response.documents);
    } catch (err) {
      console.error("Failed to fetch documents", err);
    }
  };

  // Save or Update a document
  const handleSave = async () => {
    try {
      if (isEditing && selectedDocId) {
        await databases.updateDocument(databaseId, collectionId, selectedDocId, {
          title,
          content,
        });
        console.log("Document updated");
      } else {
        await databases.createDocument(databaseId, collectionId, "unique()", {
          title,
          content,
        });
        console.log("Document created");
      }
      setTitle("");
      setContent("");
      setIsEditing(false);
      setSelectedDocId(null);
      fetchDocuments();
    } catch (err) {
      console.error("Failed to save document", err);
    }
  };

  // Edit a document
  const handleEdit = (doc) => {
    setTitle(doc.title);
    setContent(doc.content);
    setSelectedDocId(doc.$id);
    setIsEditing(true);
  };

  // Delete a document
  const handleDelete = async (id) => {
    try {
      await databases.deleteDocument(databaseId, collectionId, id);
      console.log("Document deleted");
      fetchDocuments();
    } catch (err) {
      console.error("Failed to delete document", err);
    }
  };

  // Filter documents by search query
  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Define custom toolbar options for Quill editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title"
          className="w-full p-2 border rounded mb-2"
        />
      </div>

      <div className="mb-4">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.$id}
            className="p-4 bg-gray-100 rounded mb-2 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{doc.title}</h3>
              <p className="text-sm text-gray-600">{doc.content.substring(0, 100)}...</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(doc)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(doc.$id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border rounded bg-white">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Document Title"
          className="w-full mb-2 p-2 border rounded"
        />
        <button
          onClick={() => setIsPreview(!isPreview)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {isPreview ? "Edit Mode" : "Preview Mode"}
        </button>
        {isPreview ? (
          <div dangerouslySetInnerHTML={{ __html: content }} className="border p-4" />
        ) : (
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
          />
        )}
        <button
          onClick={handleSave}
          className="w-full bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          {isEditing ? "Update Document" : "Save Document"}
        </button>
      </div>
    </div>
  );
};

export default Editor;
