"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { useNavigate } from "react-router-dom";

function RawatInap() {
  const router = useRouter();
  const HandleClick = () => {
    router.push("/booking-rooms");
  };
  const rooms = [
    {
      id: 1,
      name: "Kamar VIP",
      description: "Kamar mewah dengan fasilitas premium dan privasi tinggi.",
      image: "/img/RumahSakitVip.jpeg",
    },
    {
      id: 2,
      name: "Kamar Kelas 1",
      description: "Kamar nyaman untuk pasien dengan fasilitas lengkap.",
      image: "/img/RumahSakitKelas1.jpg",
    },
    {
      id: 3,
      name: "Kamar Kelas 2",
      description: "Pilihan kamar ekonomis dengan fasilitas standar.",
      image: "/img/RumahSakitKelas2.jpg",
    },
    {
      id: 4,
      name: "Kamar Kelas 3",
      description: "Kamar bersama dengan biaya terjangkau untuk semua pasien.",
      image: "/img/RumahSakitKelas3.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Layanan Rawat Inap</h1>
          <p className="mt-2 text-lg">
            Fasilitas rawat inap kami menyediakan kenyamanan dan perawatan
            terbaik untuk setiap pasien.
          </p>
        </div>
      </header>

      {/* Deskripsi Layanan */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Tentang Rawat Inap
        </h2>
        <p className="text-gray-700 leading-relaxed m-1">
          Layanan rawat inap di RS Unggul dirancang untuk memberikan kenyamanan
          dan keamanan bagi setiap pasien. Dengan berbagai pilihan kamar dan
          dukungan penuh dari tim medis profesional, kami berkomitmen untuk
          mendukung proses pemulihan Anda dengan fasilitas terbaik.
        </p>
      </section>

      {/* Daftar Kamar */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Fasilitas Kamar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-100 hover:scale-105"
            >
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{room.name}</h3>
                <p className="text-gray-600 mt-2">{room.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={HandleClick} className="bg-purple-400 mt-4">
          Booking Sekarang
        </Button>
      </section>
    </div>
  );
}

export default RawatInap;
