import { layanan } from "@/lib/dummyLayanan";
import Image from "next/image";
import React from "react";

function LayananUnggulan() {
  const listLayanan = layanan;
  return (
    <div className="grid grid-cols-3">
      <h2 className="col-span-3 text-4xl font-bold mb-10 text-center mt-10">
        LAYANAN <span className="text-purple-400">UNGGULAN RS UNGGUL</span>
      </h2>
      {listLayanan.map((item, index) => (
        <a href="#" className="" key={item.id}>
          <div className="p-4 text-center">
            <Image
              src={item.img}
              className="h-64 w-full object-cover sm:h-80 lg:h-96"
              alt=""
              width={70}
              height={180}
            />
            <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
              {item.title}
            </h3>
            <p className="mt-2 max-w-sm text-gray-500">{item.deskripsi}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default LayananUnggulan;
