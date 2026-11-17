import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  Clock, 
  Tag, 
  User, 
  ChevronDown,
  LogOut
} from "lucide-react";
import api from "../lib/axios";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
}

export const CourseSelectionPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    sex: "male",
    courseId: "",
  });

  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Fetch dynamic courses safely
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/api/student/courses");
        const courseList = Array.isArray(response.data)
          ? response.data
          : response.data?.courses || response.data?.data || [];

        setCourses(courseList);
      } catch (err) {
        console.error("Failed to load courses", err);
        setMessage({
          text: "Unable to load courses. Please check your connection.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Update selected course details preview when courseId changes
  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setFormData((prev) => ({ ...prev, courseId: id }));
    
    const found = courses.find((c) => c.id === id);
    setSelectedCourse(found || null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.age || !formData.courseId) {
      setMessage({ text: "Please complete all required fields.", type: "error" });
      return;
    }

    setEnrolling(true);
    setMessage(null);

    try {
      await api.post("/api/student/enroll", {
        fullName: formData.fullName,
        age: Number(formData.age),
        sex: formData.sex,
        courseId: formData.courseId,
      });

      setMessage({ text: "Enrollment request submitted successfully!", type: "success" });
      setFormData({ fullName: "", age: "", sex: "male", courseId: "" });
      setSelectedCourse(null);
    } catch (err: any) {
      setMessage({
        text: err.response?.data?.message || "Failed to submit enrollment request.",
        type: "error",
      });
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-indigo-50/20 pt-16 sm:pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full space-y-4">
        {/* Top Bar with Logout Option */}
        <div className="flex justify-end items-center">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 font-medium px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm border border-gray-200 shadow-sm transition-all active:scale-95"
          >
            <LogOut className="w-4 h-4 text-red-600" />
            <span>Logout</span>
          </button>
        </div>

        {/* Animated Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 overflow-hidden"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 px-5 sm:px-8 py-8 sm:py-10 text-white text-center relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 sm:w-40 h-32 sm:h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-8 -bottom-8 w-32 sm:w-40 h-32 sm:h-40 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-indigo-100 mb-3 border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                Join Our Next Cohort
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Student Enrollment Form
              </h1>
              <p className="mt-2 text-indigo-100 text-xs sm:text-base max-w-lg">
                Fill out your personal details and pick your preferred learning track to start your journey.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-10 space-y-6">
            {/* Alert Message Banner */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm font-medium ${
                    message.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-rose-50 text-rose-800 border-rose-200"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <span>{message.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Wandama James"
                    required
                    className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-xs sm:text-sm text-gray-900 transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Age & Sex Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Age <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    min="10"
                    max="100"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="20"
                    required
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-xs sm:text-sm text-gray-900 transition-all placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Sex <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="sex"
                      value={formData.sex}
                      onChange={handleChange}
                      className="w-full appearance-none px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-xs sm:text-sm text-gray-900 bg-white transition-all cursor-pointer"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Course Track Select */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Select Course Track <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                  <select
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleCourseChange}
                    required
                    disabled={loading}
                    className="w-full appearance-none pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-xs sm:text-sm text-gray-900 bg-white transition-all cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled>
                      {loading ? "Loading available courses..." : "-- Choose a course --"}
                    </option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title} ({course.category})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Dynamic Course Preview Card */}
              <AnimatePresence>
                {selectedCourse && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100/80 space-y-2.5 sm:space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-indigo-950">
                        {selectedCourse.title}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium bg-white px-2.5 py-1 rounded-full border border-indigo-200/60 text-indigo-700">
                          <Tag className="w-3 h-3" />
                          {selectedCourse.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium bg-white px-2.5 py-1 rounded-full border border-indigo-200/60 text-indigo-700">
                          <Clock className="w-3 h-3" />
                          {selectedCourse.duration}
                        </span>
                      </div>
                    </div>
                    {selectedCourse.description && (
                      <p className="text-xs sm:text-sm text-indigo-900/80 leading-relaxed">
                        {selectedCourse.description}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={enrolling || loading}
                className="w-full py-3.5 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-base font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {enrolling ? (
                  <>
                    <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <span>Submit Enrollment Request</span>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseSelectionPage;