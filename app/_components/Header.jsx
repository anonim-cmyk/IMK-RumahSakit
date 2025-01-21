"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const pathname = usePathname();
  const menuBar = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },

    {
      id: 2,
      name: "Profile",
      path: "/profile",
    },

    {
      id: 3,
      name: "Fasilitas & Layanan",
      path: "/fasilitas",
    },

    {
      id: 4,
      name: "Jadwal Praktik",
      path: "/jadwal-praktik",
    },

    {
      id: 5,
      name: "Layanan Unggulan",
      path: "/layanan-unggulan",
    },

    {
      id: 6,
      name: "Promo & Paket Layanan",
      path: "/promo",
    },
    {
      id: 7,
      name: "Informasi Lainnya",
      path: "/informasi",
    },
  ];
  return (
    <div className="flex items-center justify-center p-6 shadow-sm sticky top-0 z-10 bg-white">
      <div className="flex items-center gap-10">
        <Image src="logo.svg" height={80} width={100} alt="Logo" />
        <ul className="flex gap-10">
          {menuBar.map((item, index) => (
            <Link href={item.path} key={item.id}>
              <li
                className={`cursor-pointer hover:text-purple-400 ${
                  pathname === item.path
                    ? "text-purple-400 border-b-2 border-purple-400"
                    : ""
                }`}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
