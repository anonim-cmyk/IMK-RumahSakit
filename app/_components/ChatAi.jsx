"use client";
import React, { createContext, useState } from "react";
import ChatBot from "react-chatbotify";

function ChatAi() {
  const helpOptions = ["Tentang Kamar", "Jadwal Dokter", "Prosedure"];
  const flow = {
    start: {
      message: "Halo Ada yang bisa saya bantu?",
      transition: { duration: 1000 },
      path: "show_options",
    },
    show_options: {
      message:
        "Berikut beberapa pilihan yang dapat saya berikan untuk membantu anda:",
      options: helpOptions,
      path: "proses_options",
    },
    prompt_again: {
      message: "Mau Minta tolong apalagi?",
      options: helpOptions,
      path: "proses_options",
    },
    unknown_input: {
      message: "Maaf saya tidak bisa mengerti apa yang anda maksud",
    },
    proses_options: {
      transition: { duration: 0 },
      chatDisable: true,
      path: async (params) => {
        let chat = "";
        switch (params.userInput) {
          case "Tentang Kamar":
            chat = await params.injectMessage(
              "Tipe kamar yang tersedia (VIP, Kelas 1, Kelas 2, dan Kelas 3)."
            );
            break;
          case "Jadwal Dokter":
            chat = await params.injectMessage(
              "Jadwal dokter dapat diakses di situs kami atau dengan menghubungi layanan rumah sakit. Silakan sebutkan dokter spesialis yang Anda cari."
            );
            break;
          case "Prosedure":
            chat = await params.injectMessage(
              "Untuk pendaftaran rawat inap, Anda perlu membawa KTP, kartu asuransi (jika ada), dan dokumen rujukan dari dokter."
            );
            break;
          default:
            return "unknown_input";
        }
        return "repeat";
      },
    },
    repeat: {
      transition: { duration: 3000 },
      path: "prompt_again",
    },
  };
  return <ChatBot flow={flow} />;
}

export default ChatAi;
