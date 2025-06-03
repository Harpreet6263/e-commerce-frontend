"use client";
import React, { useState } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  ClipboardDocumentIcon,
  DocumentDuplicateIcon,
  RectangleGroupIcon,
  HomeIcon,
  MicrophoneIcon,
  TagIcon,
  UserGroupIcon,
  VideoCameraIcon,
  Cog6ToothIcon,
  XMarkIcon,
  NewspaperIcon,
  PhotoIcon,
  SignalIcon,
  CursorArrowRaysIcon,
  Square2StackIcon,
  Bars3CenterLeftIcon
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "@/redux/action/auth";
import Cookies from "js-cookie";

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarLinks = [
    { href: "dashboard", label: "Dashboard", icon: <HomeIcon className="w-6 h-6" /> },
    { href: "users", label: "Manage Users", icon: <UserGroupIcon className="w-6 h-6" /> },
    { href: "corusel", label: "Manage Corusel", icon: <RectangleGroupIcon className="w-6 h-6" /> },

    { href: "settings", label: "Settings", icon: <Cog6ToothIcon className="w-6 h-6" /> },
  ];

  const logOut = async () => {
    try {
      const res = await dispatch(handleLogout());
      if (res.payload) {
        router.prefetch(`/`);
        router.push(`/`);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 opacity-50 md:hidden" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static left-0 top-0 h-[100dvh] overflow-y-scroll w-[280px] bg-gray-100  z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Mobile Close Button */}
        <button className="absolute top-4 right-4 md:hidden text-black" onClick={toggleSidebar}>
          <XMarkIcon className="w-6 h-6" />
        </button>

        <ul className="p-5 space-y-2 mt-10 md:mt-4">
          {sidebarLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={`/admin/${link.href}`}
                className={`flex items-center p-2 rounded-lg font-medium ${pathname.includes(link.href)
                    ? "bg-[#36736F] text-white font-bold"
                    : "text-black hover:bg-gray-200"
                  }`}
                onClick={toggleSidebar} // Close on mobile
              >
                {link.icon}
                <span className="ml-3">{link.label}</span>
              </Link>
            </li>
          ))}
          <li>
            <button
              className="flex items-center p-2 w-full rounded-lg font-medium text-black hover:bg-gray-200 cursor-pointer"
              onClick={logOut}
            >
              <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
              <span className="ml-3">Logout</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Hamburger Button */}
      <button className="md:hidden fixed top-4 left-4 text-black" onClick={toggleSidebar}>
        <Bars3CenterLeftIcon className="w-6 h-6" />
      </button>
    </>
  );
};

export default Sidebar;
