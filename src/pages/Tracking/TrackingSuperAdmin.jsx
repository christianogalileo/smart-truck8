import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API_URL from "../../config/api";

const TrackingSuperAdmin = () => {
  const [activeTab, setActiveTab] = useState("onprogress");
  const [trucks, setTrucks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `${API_URL}/api/trucks?status=${activeTab}`;

        if (selectedDate) {
          url += `&date=${selectedDate}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch trucks");

        const data = await res.json();
        setTrucks(data);
      } catch (err) {
        console.error("Failed to fetch trucks:", err);
        setTrucks([]);
      }
    };

    fetchData();
  }, [activeTab, selectedDate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-purple-800 text-white w-64 p-6 flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center mb-6">
            <img
              src="https://via.placeholder.com/50"
              alt="Super Admin"
              className="rounded-full mb-2"
            />
            <h2 className="font-semibold text-lg">Super Admin</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-purple-700 rounded-lg p-3 text-center">
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className="bg-purple-700 rounded-lg p-3 text-center">
              <Link to="/tracking-superadmin">Tracking</Link>
            </div>
            <div className="bg-purple-700 rounded-lg p-3 text-center">
              <Link to="/users-management">Kelola Users</Link>
            </div>
          </div>
        </div>

        <div className="space-y-6 mt-6">
          <div className="bg-purple-700 rounded-lg p-3 text-center">
            <Link to="/settings">Settings</Link>
          </div>
          <div className="bg-purple-700 rounded-lg p-3 text-center">
            <Link to="/logout">Logout</Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Tracking Kendaraan</h1>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab("onprogress")}
              className={`px-3 py-2 rounded ${
                activeTab === "onprogress"
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              On Progress
            </button>

            <button
              onClick={() => setActiveTab("finished")}
              className={`px-3 py-2 rounded ${
                activeTab === "finished"
                  ? "bg-green-600 text-white"
                  : "bg-white border"
              }`}
            >
              Finished
            </button>

            <button
              onClick={() => setActiveTab("trouble")}
              className={`px-3 py-2 rounded ${
                activeTab === "trouble"
                  ? "bg-red-600 text-white"
                  : "bg-white border"
              }`}
            >
              Trouble
            </button>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4">
          {trucks.length === 0 ? (
            <p className="text-gray-600 text-center">
              Tidak ada data kendaraan
            </p>
          ) : (
            trucks.map((truck, index) => (
              <div
                key={truck.truckId || index}
                className="bg-white p-4 rounded shadow"
              >
                <div className="flex gap-4">
                  <img
                    src={
                      truck.image_url ||
                      "https://via.placeholder.com/150"
                    }
                    alt="truck"
                    className="w-32 h-32 object-cover rounded"
                  />

                  <div>
                    <p className="font-bold">
                      Truck ID: {truck.truckId}
                    </p>

                    <p>Type: {truck.truckType}</p>
                    <p>Driver: {truck.driver}</p>
                    <p>Status: {truck.status}</p>
                    <p>
                      Date:{" "}
                      {truck.date
                        ? truck.date.split("T")[0]
                        : "-"}
                    </p>

                    <div className="mt-3">
                      <img
                        src="/images/map-placeholder.png"
                        alt="map"
                        className="rounded border"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingSuperAdmin;