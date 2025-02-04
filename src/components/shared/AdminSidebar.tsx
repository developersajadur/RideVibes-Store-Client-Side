import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto relative">
          {/* Close Button for Mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white sm:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              ></path>
            </svg>
          </button>

          <ul className="space-y-2 font-medium">
            {[
              { name: "Dashboard", icon: "M16.975 11H10V4.025a1 1..." },
              { name: "Kanban", icon: "M6.143 0H1.857A1.857 1.857..." },
              { name: "Inbox", icon: "M17.418 3.623-.018-.008a6.713..." },
              { name: "Users", icon: "M14 2a3.963 3.963 0 0 0-1.4..." },
              { name: "Products", icon: "M17 5.923A1 1 0 0 0 16 5h..." },
              { name: "Sign In", icon: "M1 8h11m0 0L8 4m4 4-4 4m..." },
              { name: "Settings", icon: "M5 5V.13a2.96 2.96 0 0 0-1.293..." },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to='/admin'
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d={item.icon} />
                  </svg>
                  <span className="ms-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default AdminSidebar;