import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { RiMapPinLine, RiCalendarLine } from "react-icons/ri";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      return null;
    }
  })();

  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(res.data);
      
      console.debug("[Dashboard] events:", res.data);
      console.debug("[Dashboard] local user:", user);
    });
  }, []);

  const rsvp = (id) => {
    api.post(`/rsvp/${id}`).then(() => alert("You joined the event"));
  };

  const deleteEvent = async (id) => {
    if (window.confirm("Delete this event?")) {
      await api.delete(`/events/${id}`);
      setEvents(events.filter((e) => e._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 md:px-12 py-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Upcoming Events
        </h2>
        <Link to="/create" className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium shadow-md hover:bg-indigo-700 transition">
          + New Event
        </Link>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((e) => (
          <div key={e._id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
            <div className="relative">
              <img
                src={e.image || "https://via.placeholder.com/400x200?text=Event"}
                alt={e.title}
                className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-600">
                {e.capacity} Spots
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-2">{e.title}</h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                {e.description}
              </p>

              <div className="flex items-center text-slate-400 text-sm mb-6">
                <span className="mr-4 flex items-center gap-2"><RiMapPinLine className="text-lg" /> {e.location}</span>
                <span className="flex items-center gap-2"><RiCalendarLine className="text-lg" /> {new Date(e.date).toLocaleDateString()}</span>
              </div>

              <button
                onClick={() => rsvp(e._id)}
                className="w-full bg-slate-700 text-white py-3 rounded-xl font-semibold hover:bg-slate-900 transition-colors shadow-lg shadow-slate-200"
              >
                Join Event
              </button>

              
              {(() => {
                const isOwner = (event) => {
                  if (!user) return false;
                  const userId = user._id || user.id || user?.userId || null;
                  const createdBy = event?.createdBy?._id || event?.createdBy?.id || event?.createdBy || null;
                  return String(userId) === String(createdBy);
                };

                return isOwner(e) ? (
                  <div className="flex gap-4 mt-5 pt-4 border-t border-slate-50 justify-center">
                    <Link to={`/edit/${e._id}`} className="text-sm font-medium text-indigo-500 hover:text-indigo-700">Edit Details</Link>
                    <button onClick={() => deleteEvent(e._id)} className="text-sm font-medium text-red-400 hover:text-red-600">Delete</button>
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}