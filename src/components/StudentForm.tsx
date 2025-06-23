"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function StudentForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    degree: "",
    field: "",
    passoutYear: "",
    experience: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = axios.post("/api/submission/register", { form });
    toast.promise(res, {
      loading: "Submitting...",
      success: () => {
        setForm({
          name: "",
          email: "",
          degree: "",
          field: "",
          passoutYear: "",
          experience: "",
        });
        const query = new URLSearchParams({
          text: `New Road2Tech Submission 🚀\n\nName: ${form.name}\nEmail: ${
            form.email
          }\nDegree: ${form.degree}\nField: ${form.field || "-"}\nPassout: ${
            form.passoutYear || "-"
          }\nExperience: ${form.experience}`,
        });
        window.open(`https://wa.me/917559412440?${query.toString()}`, "_blank");
        return "Details submitted successfully!";
      },
      error: "Failed to submit details. Please try again.",
    });
  };

  return (
    <section
      id="register"
      className="p-10 bg-gradient-to-br from-base-100 via-base-200 to-base-300 min-h-screen flex flex-col items-center justify-center"
    >
      <div className="max-w-3xl w-full bg-base-100 shadow-xl rounded-2xl p-8 border border-base-300 glass">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary uppercase tracking-wide">
          Submit Your Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Name */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold text-base">
              Name
            </legend>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              required
              className="input input-bordered input-primary w-full"
            />
          </fieldset>

          {/* Email */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold text-base">
              Email
            </legend>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              required
              className="input input-bordered input-primary w-full"
            />
          </fieldset>

          {/* Degree */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold text-base">
              Degree
            </legend>
            <select
              name="degree"
              value={form.degree}
              onChange={handleChange}
              required
              className="select select-bordered select-primary w-full"
            >
              <option value="">Select Degree</option>
              <option value="B.Tech">B.Tech</option>
              <option value="BCA">BCA</option>
              <option value="BCS">BCS</option>
              <option value="Non-Tech">Non-Tech</option>
            </select>
          </fieldset>

          {/* Field (Only for B.Tech) */}
          {form.degree === "B.Tech" && (
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold text-base">
                Field of Study
              </legend>
              <select
                name="field"
                value={form.field}
                onChange={handleChange}
                required
                className="select select-bordered select-primary w-full"
              >
                <option value="">Select Field</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="Other">Other</option>
              </select>
            </fieldset>
          )}

          {/* Passout Year */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold text-base">
              Passout Year
            </legend>
            <input
              type="text"
              name="passoutYear"
              placeholder="e.g., 2024"
              value={form.passoutYear}
              onChange={handleChange}
              className="input input-bordered input-primary w-full"
            />
          </fieldset>

          {/* Experience */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold text-base">
              Experience Level
            </legend>
            <select
              name="experience"
              value={form.experience}
              onChange={handleChange}
              required
              className="select select-bordered select-primary w-full"
            >
              <option value="">Select Experience</option>
              <option value="Fresher">Fresher</option>
              <option value="0-1 Year">0-1 Year</option>
              <option value="1-2 Years">1-2 Years</option>
              <option value="2+ Years">2+ Years</option>
            </select>
          </fieldset>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="btn btn-primary w-full font-semibold tracking-wide"
            >
              🚀 Submit Application
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
