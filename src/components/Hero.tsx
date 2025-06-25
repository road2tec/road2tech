"use client";

import { IconBrandWhatsapp } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Hero() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    district: "",
    degree: "",
    field: "",
    passoutYear: "",
    experience: "",
  });
  const [numbers, setNumbers] = useState({
    technicalNumber: "",
    nonTechnicalNumber: "",
    medicalMobileNumber: "",
  });

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await axios.get("/api/number");
        setNumbers(response.data);
      } catch (error) {
        console.error("Failed to fetch numbers:", error);
        setNumbers({
          technicalNumber: "",
          nonTechnicalNumber: "",
          medicalMobileNumber: "",
        });
      }
    };
    fetchNumbers();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (form: {
    name: string;
    email: string;
    phone: string;
    district: string;
    degree: string;
    field?: string;
    passoutYear: string;
    experience: string;
  }) => {
    const trimmedForm = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [key, value.trim?.() ?? value])
    );

    if (
      !trimmedForm.name ||
      !trimmedForm.email ||
      !trimmedForm.phone ||
      !trimmedForm.degree ||
      !trimmedForm.district ||
      (trimmedForm.degree === "B.Tech" && !trimmedForm.field) ||
      !trimmedForm.passoutYear ||
      !trimmedForm.experience
    ) {
      return "Please fill all required fields.";
    }

    if (!/^\d{10}$/.test(trimmedForm.phone)) {
      return "Please enter a valid 10-digit mobile number.";
    }

    const currentYear = new Date().getFullYear();
    if (
      !/^\d{4}$/.test(trimmedForm.passoutYear) ||
      +trimmedForm.passoutYear < 1950 ||
      +trimmedForm.passoutYear > currentYear + 4 // Allowing up to 4 years in the future for students
    ) {
      return `Please enter a valid passout year (1950-${currentYear}).`;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedForm.email)) {
      return "Please enter a valid email address.";
    }

    const hasInvalidChars = /[<>;]/.test(trimmedForm.name);
    if (hasInvalidChars) {
      return "Please avoid special characters in the name.";
    }
    return null;
  };

  const identifyPhoneNumber = (degree: string) => {
    if (
      !numbers.technicalNumber ||
      !numbers.nonTechnicalNumber ||
      !numbers.medicalMobileNumber
    ) {
      console.warn("Phone numbers are not loaded yet.");
      return "";
    }
    switch (degree) {
      case "B.Tech":
      case "M.Tech":
      case "BCA":
      case "MCA":
      case "B.Sc":
      case "M.Sc":
        return numbers.technicalNumber;
      case "MBBS":
      case "BDS":
      case "BAMS":
      case "BPT":
        return numbers.medicalMobileNumber;
      default:
        return numbers.nonTechnicalNumber;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const errorMessage = validateForm(form);
    const phoneNumber = identifyPhoneNumber(form.degree);
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    const res = axios.post("/api/submission/register", { form });

    toast.promise(res, {
      loading: "Submitting...",
      success: () => {
        const query = new URLSearchParams({
          text: `After saving the above number under the name 'Road2JOB', your service will be activated immediately.\n\n`,
        });

        setForm({
          name: "",
          email: "",
          phone: "",
          district: "",
          degree: "",
          field: "",
          passoutYear: "",
          experience: "",
        });

        window.open(
          `https://wa.me/${phoneNumber}?${query.toString()}`,
          "_blank"
        );
        return "Registration successful!";
      },
      error: "Registration failed. Please try again.",
    });
  };

  return (
    <section className="bg-base-300 min-h-[calc(100vh-80px)] py-12 px-4 text-center flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500" />

      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-base-content">
        Kickstart Your Career, Now on{" "}
        <span className="inline-flex items-center gap-1 text-green-600">
          <IconBrandWhatsapp size={28} /> WhatsApp
        </span>
      </h1>
      <p className="text-base text-base-content/60 mb-6">
        Join the Road2Tech WhatsApp Group and get the latest job openings,
        internships, and career opportunities right on your phone — absolutely
        free!
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-base-200 p-6 rounded-2xl shadow-lg w-full px-10 flex flex-wrap gap-4 justify-center items-center"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="input input-bordered input-primary w-full sm:w-auto"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="input input-bordered input-primary w-full sm:w-auto"
        />
        <input
          type="tel"
          name="phone"
          placeholder="10-digit Mobile Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="input input-bordered input-primary w-full sm:w-auto"
        />

        <select
          name="degree"
          value={form.degree}
          onChange={handleChange}
          required
          className="select select-bordered select-primary w-full sm:w-auto"
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

        {form.degree === "B.Tech" && (
          <select
            name="field"
            value={form.field}
            onChange={handleChange}
            required
            className="select select-bordered select-primary w-full sm:w-auto"
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="Other">Other</option>
          </select>
        )}

        <input
          type="text"
          name="passoutYear"
          placeholder="Passout Year (e.g. 2024)"
          value={form.passoutYear}
          onChange={handleChange}
          className="input input-bordered input-primary w-full sm:w-auto"
        />

        <select
          name="district"
          value={form.district}
          onChange={handleChange}
          required
          className="select select-bordered select-primary w-full sm:w-auto"
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

        <select
          name="experience"
          value={form.experience}
          onChange={handleChange}
          required
          className="select select-bordered select-primary w-full sm:w-auto"
        >
          <option value="">Select Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="0-1 Year">0-1 Year</option>
          <option value="1-2 Years">1-2 Years</option>
          <option value="2-3 Years">2-3 Years </option>
          <option value="3+ Years">3+ Years</option>
          <option value="5+ Years">5+ Years</option>
        </select>

        <button
          type="submit"
          className="btn btn-success font-semibold tracking-wide"
        >
          🚀 Submit
        </button>
      </form>

      <p className="mt-8 text-sm text-base-content/50">
        © Road2Tech, All Rights Reserved
      </p>
    </section>
  );
}
