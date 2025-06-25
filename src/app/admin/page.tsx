"use client";
import { IconTrash, IconSearch, IconFilter } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState({
    technicalNumber: "",
    nonTechnicalNumber: "",
    medicalMobileNumber: "",
  });
  const [search, setSearch] = useState("");
  const [degreeFilter, setDegreeFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [passoutYearFilter, setPassoutYearFilter] = useState("");

  const handleNumberChange = (e: any) => {
    const { name, value } = e.target;
    setNumber((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/submission");
        const data = await axios.get("/api/number");
        setNumber(data.data);
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
    const districtMatch = districtFilter
      ? item.district.toLowerCase().includes(districtFilter.toLowerCase())
      : true;

    return (
      searchText &&
      degreeMatch &&
      experienceMatch &&
      passoutYearMatch &&
      districtMatch
    );
  });

  const handleUpdate = async () => {
    try {
      const res = axios.post("/api/number/update-numbers", number);
      toast.promise(res, {
        loading: "Updating numbers...",
        success: "Numbers updated successfully!",
        error: "Failed to update numbers.",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error updating numbers");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] bg-base-200 py-6">
      <h1 className="text-4xl font-bold mb-4 uppercase">Admin Dashboard</h1>

      <div className="flex flex-col items-center mb-6 max-w-6xl w-full">
        <h2 className="text-2xl font-semibold mb-4">
          Contact Numbers (WhatsApp)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="card bg-base-100 shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Technical</h3>
            <input
              type="text"
              name="technicalNumber"
              className="input input-bordered input-primary w-full"
              value={number.technicalNumber}
              onChange={handleNumberChange}
              placeholder="e.g. +91XXXXXXXXXX"
            />
          </div>
          <div className="card bg-base-100 shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Non-Technical</h3>
            <input
              type="text"
              name="nonTechnicalNumber"
              className="input input-bordered input-primary w-full"
              value={number.nonTechnicalNumber}
              onChange={handleNumberChange}
              placeholder="e.g. +91XXXXXXXXXX"
            />
          </div>
          <div className="card bg-base-100 shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Medical</h3>
            <input
              type="text"
              name="medicalMobileNumber"
              className="input input-bordered input-primary w-full"
              value={number.medicalMobileNumber}
              onChange={handleNumberChange}
              placeholder="e.g. +91XXXXXXXXXX"
            />
          </div>
        </div>
        <button onClick={handleUpdate} className="mt-6 btn btn-primary px-8">
          Update Numbers
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-5 max-w-6xl w-full justify-center">
        <label className="input input-bordered input-primary w-full max-w-xs">
          <IconSearch size={24} className="text-base-content/50" />
          <input
            type="search"
            required
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <select
          value={degreeFilter}
          onChange={(e) => setDegreeFilter(e.target.value)}
          className="select select-bordered select-primary w-full max-w-xs"
        >
          <option value="">Select Degree</option>
          <optgroup label="Technical">
            <option value="B.Tech">B.Tech</option>
            <option value="BCA">BCA</option>
            <option value="BCS">BCS</option>
            <option value="B.Arch">B.Arch</option>
            <option value="B.Sc">B.Sc</option>
            <option value="B.Voc">B.Voc</option>
            <option value="BPharm">BPharm</option>
            <option value="M.Tech">M.Tech</option>
            <option value="MCA">MCA</option>
            <option value="M.Sc">M.Sc</option>
            <option value="M.Arch">M.Arch</option>
          </optgroup>
          <optgroup label="Medical">
            <option value="MBBS">MBBS</option>
            <option value="BDS">BDS</option>
            <option value="BAMS">BAMS</option>
            <option value="BPT">BPT</option>
            <option value="MPT">MPT</option>
          </optgroup>
          <optgroup label="Non-Technical">
            <option value="BBA">BBA</option>
            <option value="B.Com">B.Com</option>
            <option value="BA">BA</option>
            <option value="B.Ed">B.Ed</option>
            <option value="BHM">BHM</option>
            <option value="MBA">MBA</option>
            <option value="M.Com">M.Com</option>
            <option value="MA">MA</option>
            <option value="M.Ed">M.Ed</option>
            <option value="MSW">MSW</option>
            <option value="PhD">PhD</option>
          </optgroup>
        </select>

        <select
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value)}
          className="select select-bordered select-primary w-full max-w-xs"
        >
          <option value="">Select Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="0-1 Year">0-1 Year</option>
          <option value="1-2 Years">1-2 Years</option>
          <option value="2+ Years">2+ Years</option>
        </select>

        <select
          value={passoutYearFilter}
          onChange={(e) => setPassoutYearFilter(e.target.value)}
          className="select select-bordered select-primary w-full max-w-xs"
        >
          <option value="">Filter by Passout Year</option>
          {Array.from(new Array(10), (_, index) => (
            <option key={index} value={2023 - index}>
              {2023 - index}
            </option>
          ))}
        </select>

        <select
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
          className="select select-bordered select-primary w-full max-w-xs"
        >
          <option value="">Select District</option>
          <option value="Ahmednagar">Ahmednagar</option>
          <option value="Akola">Akola</option>
          <option value="Amravati">Amravati</option>
          <option value="Aurangabad">Aurangabad</option>
          <option value="Beed">Beed</option>
          <option value="Bhandara">Bhandara</option>
          <option value="Buldhana">Buldhana</option>
          <option value="Chandrapur">Chandrapur</option>
          <option value="Dhule">Dhule</option>
          <option value="Gadchiroli">Gadchiroli</option>
          <option value="Galbarga">Galbarga</option>
          <option value="Gondia">Gondia</option>
          <option value="Hingoli">Hingoli</option>
          <option value="Jalgaon">Jalgaon</option>
          <option value="Jalna">Jalna</option>
          <option value="Kolhapur">Kolhapur</option>
          <option value="Latur">Latur</option>
          <option value="Mumbai City">Mumbai City</option>
          <option value="Mumbai Suburban">Mumbai Suburban</option>
          <option value="Nagpur">Nagpur</option>
          <option value="Nanded">Nanded</option>
          <option value="Nandurbar">Nandurbar</option>
          <option value="Nashik">Nashik</option>
          <option value="Osmanabad">Osmanabad</option>
          <option value="Palghar">Palghar</option>
          <option value="Parbhani">Parbhani</option>
          <option value="Pune">Pune</option>
          <option value="Raigad">Raigad</option>
          <option value="Ratnagiri">Ratnagiri</option>
          <option value="Sakri">Sakri</option>
          <option value="Sangli">Sangli</option>
          <option value="Satara">Satara</option>
          <option value="Sindhudurg">Sindhudurg</option>
          <option value="Solapur">Solapur</option>
          <option value="Thane">Thane</option>
          <option value="Wardha">Wardha</option>
          <option value="Washim">Washim</option>
          <option value="Yavatmal">Yavatmal</option>
          <option value="Other">Other</option>
        </select>

        <button
          className="btn btn-primary max-w-xs"
          onClick={() => {
            setSearch("");
            setDegreeFilter("");
            setExperienceFilter("");
            setPassoutYearFilter("");
            setDistrictFilter("");
          }}
        >
          <IconFilter size={16} />
          Clear Filters
        </button>
      </div>

      {/* Desktop Table */}
      <div className="md:block overflow-x-auto w-full max-w-6xl bg-base-300 rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-100">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>District</th>
              <th>Degree</th>
              <th>Field</th>
              <th>Passout Year</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item: any, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.district}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
