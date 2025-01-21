"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

const InpatientPage = () => {
  const [bookingData, setBookingData] = useState({
    nama: "",
    nik: "",
    tanggalMasuk: "",
    tanggalKeluar: "",
    tipeKamar: "",
    keluhan: "",
  });

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Menggunakan state untuk tipe kamar agar bisa diupdate
  const [tipeKamar, setTipeKamar] = useState([
    { id: 1, nama: "Kelas 1", harga: 1000000, tersedia: 5 },
    { id: 2, nama: "Kelas 2", harga: 750000, tersedia: 8 },
    { id: 3, nama: "VIP", harga: 2000000, tersedia: 3 },
  ]);

  const statusOptions = [
    "Menunggu Konfirmasi",
    "Dikonfirmasi",
    "Check In",
    "Check Out",
    "Dibatalkan",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cari kamar yang dibooking
    const kamarDipilih = tipeKamar.find(
      (kamar) => kamar.nama === bookingData.tipeKamar
    );

    // Cek ketersediaan kamar
    if (!kamarDipilih || kamarDipilih.tersedia <= 0) {
      alert("Maaf, kamar tidak tersedia");
      return;
    }

    // Update stok kamar
    setTipeKamar((prev) =>
      prev.map((kamar) =>
        kamar.nama === bookingData.tipeKamar
          ? { ...kamar, tersedia: kamar.tersedia - 1 }
          : kamar
      )
    );

    const newBooking = {
      ...bookingData,
      id: Date.now(),
      status: "Menunggu Konfirmasi",
      createdAt: new Date().toISOString(),
      kamarId: kamarDipilih.id,
    };

    setBookings((prev) => [...prev, newBooking]);
    setBookingData({
      nama: "",
      nik: "",
      tanggalMasuk: "",
      tanggalKeluar: "",
      tipeKamar: "",
      keluhan: "",
    });
  };

  const handleStatusChange = (bookingId, newStatus) => {
    const booking = bookings.find((b) => b.id === bookingId);
    const oldStatus = booking.status;

    // Jika status berubah menjadi "Dibatalkan" dan status sebelumnya bukan "Dibatalkan"
    if (newStatus === "Dibatalkan" && oldStatus !== "Dibatalkan") {
      // Kembalikan stok kamar
      setTipeKamar((prev) =>
        prev.map((kamar) =>
          kamar.nama === booking.tipeKamar
            ? { ...kamar, tersedia: kamar.tersedia + 1 }
            : kamar
        )
      );
    }
    // Jika status berubah dari "Dibatalkan" ke status lain
    else if (oldStatus === "Dibatalkan" && newStatus !== "Dibatalkan") {
      // Kurangi stok kamar lagi
      setTipeKamar((prev) =>
        prev.map((kamar) =>
          kamar.nama === booking.tipeKamar
            ? { ...kamar, tersedia: kamar.tersedia - 1 }
            : kamar
        )
      );
    }

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );

    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleViewDetail = (booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Booking */}
        <Card>
          <CardHeader>
            <CardTitle>Form Booking Rawat Inap</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input
                  id="nama"
                  name="nama"
                  value={bookingData.nama}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="nik">NIK</Label>
                <Input
                  id="nik"
                  name="nik"
                  value={bookingData.nik}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="tanggalMasuk">Tanggal Masuk</Label>
                <div className="relative">
                  <Input
                    id="tanggalMasuk"
                    name="tanggalMasuk"
                    type="date"
                    value={bookingData.tanggalMasuk}
                    onChange={handleInputChange}
                    required
                  />
                  <Calendar className="absolute right-2 top-2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <Label htmlFor="tanggalKeluar">Tanggal Keluar</Label>
                <div className="relative">
                  <Input
                    id="tanggalKeluar"
                    name="tanggalKeluar"
                    type="date"
                    value={bookingData.tanggalKeluar}
                    onChange={handleInputChange}
                    required
                  />
                  <Calendar className="absolute right-2 top-2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <Label htmlFor="tipeKamar">Tipe Kamar</Label>
                <select
                  id="tipeKamar"
                  name="tipeKamar"
                  value={bookingData.tipeKamar}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Pilih Tipe Kamar</option>
                  {tipeKamar.map((kamar) => (
                    <option
                      key={kamar.id}
                      value={kamar.nama}
                      disabled={kamar.tersedia <= 0}
                    >
                      {kamar.nama} - Rp {kamar.harga.toLocaleString()} /hari
                      (Tersedia: {kamar.tersedia})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="keluhan">Keluhan</Label>
                <textarea
                  id="keluhan"
                  name="keluhan"
                  value={bookingData.keluhan}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Booking Sekarang
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Daftar Booking */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Booking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{booking.nama}</h3>
                      <p className="text-sm text-gray-600">
                        NIK: {booking.nik}
                      </p>
                      <p className="text-sm text-gray-600">
                        Kamar: {booking.tipeKamar}
                      </p>
                      <div className="mt-2">
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            handleStatusChange(booking.id, e.target.value)
                          }
                          className="text-sm p-1 border rounded"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleViewDetail(booking)}
                      variant="outline"
                      size="sm"
                    >
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Detail Booking */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Detail Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Nama:</strong> {selectedBooking.nama}
                </p>
                <p>
                  <strong>NIK:</strong> {selectedBooking.nik}
                </p>
                <p>
                  <strong>Tanggal Masuk:</strong> {selectedBooking.tanggalMasuk}
                </p>
                <p>
                  <strong>Tanggal Keluar:</strong>{" "}
                  {selectedBooking.tanggalKeluar}
                </p>
                <p>
                  <strong>Tipe Kamar:</strong> {selectedBooking.tipeKamar}
                </p>
                <p>
                  <strong>Keluhan:</strong> {selectedBooking.keluhan}
                </p>
                <div className="flex items-center gap-2">
                  <strong>Status:</strong>
                  <select
                    value={selectedBooking.status}
                    onChange={(e) =>
                      handleStatusChange(selectedBooking.id, e.target.value)
                    }
                    className="p-1 border rounded"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <p>
                  <strong>Dibuat pada:</strong>{" "}
                  {new Date(selectedBooking.createdAt).toLocaleString()}
                </p>
              </div>
              <Button
                onClick={() => setSelectedBooking(null)}
                className="mt-4 w-full"
              >
                Tutup
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InpatientPage;
