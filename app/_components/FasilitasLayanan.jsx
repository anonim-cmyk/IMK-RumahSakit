import { fasilitas } from "@/lib/dummyFasilitas";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function FasilitasLayanan() {
  const listFasilitas = fasilitas;
  return (
    <div className="px-4 py-8">
      <h2 className="text-4xl text-center font-bold mb-8">
        FASILITAS DAN <span className="text-purple-400">LAYANAN RS UNGGUL</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {listFasilitas.map((item, index) => (
          <Link
            key={item.id}
            href={item.path}
            className="flex flex-col items-center justify-center text-center bg-gray-100 p-4 rounded-lg shadow-md transform transition duration-300 ease-out hover:scale-105 hover:shadow-xl hover:bg-purple-100"
          >
            <Image
              src={item.logo}
              width={170}
              height={80}
              alt={item.title}
              className="mb-4"
            />
            <p className="text-lg font-medium text-gray-800 hover:text-purple-500 transition-colors duration-300 ease-out">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FasilitasLayanan;
