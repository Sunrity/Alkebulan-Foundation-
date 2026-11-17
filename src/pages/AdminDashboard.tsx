import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, BookPlus, Users, Trash2 } from "lucide-react";
import api from "../lib/axios";
import "./admin.css";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
}

interface Enrollment {
  id: string;
  status: string;
  enrolledAt?: string;
  course: {
    id: string;
    title: string;
    category?: string;
  };
}

interface Student {
  id: string;
  fullName: string;
  email: string;
  age?: number;
  sex?: string;
  createdAt?: string;
  enrollments: Enrollment[];
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Form state for creating a new course
  const [newCourse, setNewCourse] = useState({
    title: "",
    category: "Software Engineering",
    duration: "12 Weeks",
    description: "",
  });
  const [creatingCourse, setCreatingCourse] = useState(false);

  // LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Fetch both students and active courses
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [studentsRes, coursesRes] = await Promise.all([
        api.get("/api/admin/students"),
        api.get("/api/student/courses"),
      ]);
      setStudents(studentsRes.data);
      setCourses(coursesRes.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to load admin dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- COURSE MANAGEMENT HANDLERS ---

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title.trim()) return;

    setCreatingCourse(true);
    try {
      const res = await api.post("/api/admin/courses", newCourse);
      alert("Course created successfully!");
      setCourses((prev) => [...prev, res.data.course || res.data]);
      setNewCourse({
        title: "",
        category: "Software Engineering",
        duration: "12 Weeks",
        description: "",
      });
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create course.");
    } finally {
      setCreatingCourse(false);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }

    try {
      await api.delete(`/api/admin/courses/${id}`);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete course.");
    }
  };

  // --- STUDENT MANAGEMENT HANDLERS ---

  const deleteStudent = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this student record?")) {
      return;
    }

    try {
      await api.delete(`/api/admin/students/${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete student record.");
    }
  };

  const updateStatus = async (enrollmentId: string, newStatus: string) => {
    try {
      await api.patch(`/api/admin/enrollments/${enrollmentId}/status`, {
        status: newStatus,
      });

      setStudents((prev) =>
        prev.map((student) => ({
          ...student,
          enrollments: student.enrollments.map((e) =>
            e.id === enrollmentId ? { ...e, status: newStatus } : e
          ),
        }))
      );
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard pt-24 sm:pt-28 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard pt-20 sm:pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-10 mb-12">
      {/* Header Section with Logout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Manage courses, review student enrollments, and update progress statuses.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* ================= COURSE CREATION SECTION ================= */}
      <section className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <BookPlus className="w-5 h-5 text-indigo-600 shrink-0" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Create New Course Track</h2>
        </div>

        <form onSubmit={handleCreateCourse} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
              Course Title *
            </label>
            <input
              type="text"
              placeholder="e.g. AI & Machine Learning"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              required
              className="w-full text-sm border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
              Category *
            </label>
            <input
              type="text"
              placeholder="e.g. Data Science"
              value={newCourse.category}
              onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
              required
              className="w-full text-sm border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
              Duration *
            </label>
            <input
              type="text"
              placeholder="e.g. 10 Weeks"
              value={newCourse.duration}
              onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
              required
              className="w-full text-sm border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="Brief course summary"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              className="w-full text-sm border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="sm:col-span-2 pt-2">
            <button
              type="submit"
              disabled={creatingCourse}
              className="w-full sm:w-auto px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-lg shadow transition-colors disabled:opacity-50"
            >
              {creatingCourse ? "Creating..." : "+ Add Course Track"}
            </button>
          </div>
        </form>

        {/* Existing Courses List */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-3">
            Active Dynamic Courses ({courses.length})
          </h3>
          {courses.length === 0 ? (
            <p className="text-xs sm:text-sm text-gray-500">No courses created yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                      {course.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {course.category} • {course.duration}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-xs font-bold text-red-600 hover:text-red-800 p-1.5 flex items-center gap-1 shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= STUDENT ENROLLMENTS TABLE / CARD VIEW ================= */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600 shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Student Enrollments</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Total Enrolled Students: <b className="text-gray-900">{students.length}</b>
          </p>
        </div>

        {/* Mobile View: Cards */}
        <div className="block md:hidden space-y-3">
          {students.length === 0 ? (
            <div className="bg-white p-6 text-center text-gray-500 rounded-xl border border-gray-200 text-sm">
              No student registrations found
            </div>
          ) : (
            students.map((student) => {
              const activeEnrollment = student.enrollments?.[0];

              return (
                <div
                  key={student.id}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{student.fullName}</h3>
                      <p className="text-xs text-gray-500">{student.email}</p>
                    </div>
                    <button
                      type="button"
                      className="px-2.5 py-1 bg-red-100 text-red-700 hover:bg-red-200 text-xs font-semibold rounded transition-colors"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-gray-500">Age:</span>{" "}
                      <span className="font-medium text-gray-800">{student.age ?? "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Sex:</span>{" "}
                      <span className="font-medium text-gray-800">
                        {student.sex
                          ? student.sex.charAt(0).toUpperCase() + student.sex.slice(1)
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs space-y-1">
                    <span className="text-gray-500 block">Course Track:</span>
                    <span className="font-medium text-gray-800 block">
                      {activeEnrollment?.course?.title || "No Course Selected"}
                    </span>
                  </div>

                  <div className="text-xs space-y-1 pt-1">
                    <span className="text-gray-500 block">Status:</span>
                    {activeEnrollment ? (
                      <select
                        value={activeEnrollment.status}
                        onChange={(e) => updateStatus(activeEnrollment.id, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-xs"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop View: Full Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Age</th>
                <th className="p-3">Sex</th>
                <th className="p-3">Course Track</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-6 text-gray-500">
                    No student registrations found
                  </td>
                </tr>
              ) : (
                students.map((student) => {
                  const activeEnrollment = student.enrollments?.[0];

                  return (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-900">{student.fullName}</td>
                      <td className="p-3 text-gray-600">{student.email}</td>
                      <td className="p-3">{student.age ?? "N/A"}</td>
                      <td className="p-3">
                        {student.sex
                          ? student.sex.charAt(0).toUpperCase() + student.sex.slice(1)
                          : "N/A"}
                      </td>
                      <td className="p-3 font-medium text-gray-800">
                        {activeEnrollment?.course?.title || "No Course Selected"}
                      </td>
                      <td className="p-3">
                        {activeEnrollment ? (
                          <select
                            value={activeEnrollment.status}
                            onChange={(e) =>
                              updateStatus(activeEnrollment.id, e.target.value)
                            }
                            className="p-1.5 border border-gray-300 rounded bg-white text-xs outline-none focus:ring-1 focus:ring-indigo-500"
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="COMPLETED">COMPLETED</option>
                          </select>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="p-3">
                        <button
                          type="button"
                          className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 text-xs font-semibold rounded transition-colors"
                          onClick={() => deleteStudent(student.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;