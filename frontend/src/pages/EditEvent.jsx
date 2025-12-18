import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  useEffect(() => {
    api.get("/events").then((res) => {
      const event = res.data.find((e) => e._id === id);
      setForm(event || {});
    });
  }, [id]);

  const update = async () => {
    await api.put(`/events/${id}`, form);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Edit Event</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title || ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <textarea
            rows="4"
            placeholder="Description"
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Location"
              value={form.location || ""}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <input
              type="number"
              placeholder="Capacity"
              value={form.capacity || ""}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate("/dashboard")} className="flex-1 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition">
              Cancel
            </button>
            <button onClick={update} className="flex-1 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Update Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
