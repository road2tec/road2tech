"use client";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/submission");
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setData([]);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id: string) => {
    const res = confirm("Are you sure you want to delete this submission?");
    if (!res) return;
    try {
      const res = axios.delete(`/api/submission/delete?id=${id}`);
      toast.promise(res, {
        loading: "Deleting submission...",
        success: () => {
          setData((prevData) =>
            prevData.filter((item: any) => item._id !== id)
          );
          return "Submission deleted successfully";
        },
        error: "Failed to delete submission",
      });
    } catch (error) {
      console.error("Error deleting submission:", error);
      toast.error("Failed to delete submission");
    }
  };
  return (
    <div className="flex flex-col items-center h-[calc(100vh-64px)] bg-base-200 py-6">
      <h1 className="text-4xl font-bold mb-4 uppercase">Admin Dashboard</h1>
      <div className="overflow-x-auto w-full max-w-6xl bg-base-300">
        <table className="table table-zebra w-full">
          <thead className="bg-base-100">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Degree</th>
              <th>Field</th>
              <th>Passout Year</th>
              <th>Experience</th>
              <th>Actions </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item: any, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.degree}</td>
                  <td>{item.field}</td>
                  <td>{item.passoutYear}</td>
                  <td>{item.experience} years</td>
                  <td>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete <IconTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center">
                  No submissions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
