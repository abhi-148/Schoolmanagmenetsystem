import { useState, useEffect } from "react";

import {
  LayoutDashboard,
  School,
  Users,
  UserCheck,
  CreditCard,
  Bot,
  User,
  LogOut,
  ClipboardCheck,
  Building2,
  Menu,
  X,
  Moon,
  Sun,
  BookOpen,
  CalendarDays,
  FileText,
  Clock3
} from "lucide-react";

import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

function Sidebar() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const role =
    localStorage.getItem("role");

  const [isOpen, setIsOpen] =
    useState(false);

  const [darkMode, setDarkMode] =
  useState(
    localStorage.getItem("theme") ===
      "dark"
  );

 useEffect(() => {

  const html =
    document.documentElement;

  if (darkMode) {

    html.classList.add("dark");

  } else {

    html.classList.remove("dark");

  }

  localStorage.setItem(
    "theme",
    darkMode ? "dark" : "light"
  );

}, [darkMode]);

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");

  };

  const linkClass = (path) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "hover:bg-slate-800"
    }`;

  return (
    <>
      {/* Mobile Header */}

      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 text-white shadow-lg">

        <button
          onClick={() =>
            setIsOpen(!isOpen)
          }
        >
          {isOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>

        <h2 className="font-bold text-lg">
          🎓 SchoolMS
        </h2>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {darkMode ? (
            <Sun size={22} />
          ) : (
            <Moon size={22} />
          )}
        </button>

      </div>

      {/* Overlay */}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() =>
            setIsOpen(false)
          }
        />
      )}

     {/* Sidebar */}

<div
  className={`
    fixed
    md:fixed
    top-0
    left-0
    z-50
    w-64
    h-screen
    overflow-y-auto
    flex
    flex-col
          bg-slate-900
          text-white
          shadow-xl
          transform
          transition-transform
          duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* Logo */}

        <div className="p-6 border-b border-slate-700">

          <h2 className="text-2xl font-bold text-center">
            🎓 SchoolMS
          </h2>

          <p className="text-xs text-gray-400 text-center mt-2">
            {role || "SUPER_ADMIN"}
          </p>

          <div className="flex justify-center mt-4">

            <button
              onClick={() =>
                setDarkMode(
                  !darkMode
                )
              }
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600"
            >
              {darkMode ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

          </div>

        </div>

        <nav className="p-4">

          <ul className="space-y-2">

            <li>
              <Link
                to="/dashboard"
                className={linkClass(
                  "/dashboard"
                )}
                onClick={() =>
                  setIsOpen(false)
                }
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
            </li>

            {role ===
              "SUPER_ADMIN" && (
              <li>
                <Link
                  to="/schools"
                  className={linkClass(
                    "/schools"
                  )}
                  onClick={() =>
                    setIsOpen(false)
                  }
                >
                  <School size={20} />
                  Schools
                </Link>
              </li>
            )}

            <li>
  <Link
    to="/school-branches"
    className={linkClass("/school-branches")}
  >
    <School size={20} />
    School Branches
  </Link>
</li>

<li>
  <Link
    to="/school-classes"
    className={linkClass("/school-classes")}
  >
    <BookOpen size={20} />
    School Classes
  </Link>
</li>

            <li>
              <Link
                to="/staff"
                className={linkClass(
                  "/staff"
                )}
                onClick={() =>
                  setIsOpen(false)
                }
              >
                <Users size={20} />
                Staff
              </Link>
            </li>

            {role ===
              "SUPER_ADMIN" && (
              <li>
                <Link
                  to="/staff-types"
                  className={linkClass(
                    "/staff-types"
                  )}
                  onClick={() =>
                    setIsOpen(false)
                  }
                >
                  <Users size={20} />
                  Staff Types
                </Link>
              </li>
            )}

            {role ===
              "SUPER_ADMIN" && (
              <li>
                <Link
                  to="/departments"
                  className={linkClass(
                    "/departments"
                  )}
                  onClick={() =>
                    setIsOpen(false)
                  }
                >
                  <Building2 size={20} />
                  Departments
                </Link>
              </li>
            )}

            <li>
              <Link
                to="/students"
                className={linkClass(
                  "/students"
                )}
                onClick={() =>
                  setIsOpen(false)
                }
              >
                <UserCheck size={20} />
                Students
              </Link>
            </li>

            <li>
              <Link
                to="/attendance"
                className={linkClass(
                  "/attendance"
                )}
                onClick={() =>
                  setIsOpen(false)
                }
              >
                <ClipboardCheck size={20} />
                Attendance
              </Link>
            </li>

            <li>
              <Link
                to="/fees"
                className={linkClass(
                  "/fees"
                )}
                onClick={() =>
                  setIsOpen(false)
                }
              >
                <CreditCard size={20} />
                Fees
              </Link>
            </li>

            <li>
  <Link
    to="/fee-structure"
    className={linkClass(
      "/fee-structure"
    )}
    onClick={() =>
      setIsOpen(false)
    }
  >
    <CreditCard size={20} />
    Fee Structure
  </Link>
</li>

<li>
  <Link
    to="/student-fees"
    className={linkClass(
      "/student-fees"
    )}
    onClick={() =>
      setIsOpen(false)
    }
  >
    <CreditCard size={20} />
    Fee Collection
  </Link>
</li>
<li>
  <Link
    to="/classes"
    className={linkClass(
      "/classes"
    )}
    onClick={() =>
      setIsOpen(false)
    }
  >
    <BookOpen size={20} />
    Classes
  </Link>
</li>
<li>
  <Link
    to="/exams"
    className={linkClass(
      "/exams"
    )}
    onClick={() =>
      setIsOpen(false)
    }
  >
    <BookOpen size={20} />
    Exams
  </Link>
</li>

<li>
  <Link
    to="/student-marks"
    className={linkClass(
      "/student-marks"
    )}
    onClick={() =>
      setIsOpen(false)
    }
  >
    <FileText size={20} />
    Student Marks
  </Link>
</li>

<li>
  <Link
    to="/report-card"
    className={linkClass(
      "/report-card"
    )}
    onClick={() =>
      setIsOpen(false)
    }
  >
    <FileText size={20} />
    Report Card
  </Link>
</li>

<li>
  <Link
    to="/timetable"
    className={linkClass(
      "/timetable"
    )}
    onClick={() =>
      setIsOpen(false)
    }
  >
    <Clock3 size={20} />
    Timetable
  </Link>
</li>

            <li>
              <Link
                to="/ai"
                className={linkClass(
                  "/ai"
                )}
                onClick={() =>
                  setIsOpen(false)
                }
              >
                <Bot size={20} />
                AI Assistant
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                className={linkClass(
                  "/profile"
                )}
                onClick={() =>
                  setIsOpen(false)
                }
              >
                <User size={20} />
                Profile
              </Link>
            </li>

            <li className="pt-4">

              <button
                onClick={
                  handleLogout
                }
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 w-full text-left transition-all duration-200"
              >
                <LogOut size={20} />
                Logout
              </button>

            </li>

          </ul>

        </nav>

      </div>
    </>
  );

}

export default Sidebar;