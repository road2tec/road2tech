"use client";
import { IconTrash, IconSearch, IconFilter } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [degreeFilter, setDegreeFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [passoutYearFilter, setPassoutYearFilter] = useState("");

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

  const filteredData = data.filter((item: any) => {
    const searchText = `${item.name} ${item.email} ${item.degree}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const degreeMatch = degreeFilter
      ? item.degree.toLowerCase().includes(degreeFilter.toLowerCase())
      : true;
    const experienceMatch = experienceFilter
      ? item.experience.toLowerCase().includes(experienceFilter.toLowerCase())
      : true;
    const passoutYearMatch = passoutYearFilter
      ? item.passoutYear.toString().includes(passoutYearFilter)
      : true;

    return searchText && degreeMatch && experienceMatch && passoutYearMatch;
  });

  return (
    <div className="flex flex-col items-center h-[calc(100vh-80px)] bg-base-200 py-6">
      <h1 className="text-4xl font-bold mb-4 uppercase">Admin Dashboard</h1>

      <div className="flex gap-4 mb-5 max-w-5xl w-full">
        <label className="input input-bordered input-primary w-full">
          <IconSearch size={24} className="text-base-content/50" />
          <input
            type="search"
            required
            placeholder="Search"
            className=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <label className="select select-bordered select-primary w-full">
          <select
            value={degreeFilter}
            onChange={(e) => setDegreeFilter(e.target.value)}
          >
            <option value="">Select Degree</option>
            <option value="B.Tech">B.Tech</option>
            <option value="BCA">BCA</option>
            <option value="BCS">BCS</option>
            <option value="BBA">BBA</option>
            <option value="B.Com">B.Com</option>
            <option value="BA">BA</option>
            <option value="B.Sc">B.Sc</option>
            <option value="B.Arch">B.Arch</option>
            <option value="B.Ed">B.Ed</option>
            <option value="BHM">BHM</option>
            <option value="BDS">BDS</option>
            <option value="MBBS">MBBS</option>
            <option value="BAMS">BAMS</option>
            <option value="BPT">BPT</option>
            <option value="B.Voc">B.Voc</option>
            <option value="BPharm">BPharm</option>
            <option value="M.Tech">M.Tech</option>
            <option value="MCA">MCA</option>
            <option value="M.Sc">M.Sc</option>
            <option value="MBA">MBA</option>
            <option value="M.Com">M.Com</option>
            <option value="MA">MA</option>
            <option value="M.Arch">M.Arch</option>
            <option value="M.Ed">M.Ed</option>
            <option value="MPT">MPT</option>
            <option value="MSW">MSW</option>
            <option value="PhD">PhD</option>
          </select>
        </label>

        <label className="select select-bordered select-primary w-full">
          <select
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
          >
            <option value="">Select Experience</option>
            <option value="Fresher">Fresher</option>
            <option value="0-1 Year">0-1 Year</option>
            <option value="1-2 Years">1-2 Years</option>
            <option value="2+ Years">2+ Years</option>
          </select>
        </label>

        <label className="select select-bordered select-primary w-full">
          <select
            className="select select-bordered w-full"
            value={passoutYearFilter}
            onChange={(e) => setPassoutYearFilter(e.target.value)}
          >
            <option value="">Filter by Passout Year</option>
            {Array.from(new Array(10), (_, index) => (
              <option key={index} value={2023 - index}>
                {2023 - index}
              </option>
            ))}
          </select>
        </label>

        <button
          className="btn btn-primary"
          onClick={() => {
            setSearch("");
            setDegreeFilter("");
            setExperienceFilter("");
            setPassoutYearFilter("");
          }}
        >
          <IconFilter size={16} />
          Clear Filters
        </button>
      </div>
      <div className="overflow-x-auto w-full max-w-6xl bg-base-300 rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-100">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Degree</th>
              <th>Field</th>
              <th>Passout Year</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item: any, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.degree}</td>
                  <td>{item.field || "-"}</td>
                  <td>{item.passoutYear}</td>
                  <td>{item.experience}</td>
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
                <td colSpan={9} className="text-center">
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
