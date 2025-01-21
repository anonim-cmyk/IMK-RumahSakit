import React from "react";

function Profile() {
  const styles = {
    container: {
      textAlign: "center",
      padding: "50px",
      fontFamily: "Arial, sans-serif",
      color: "#333",
      backgroundColor: "#f9f9f9",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "20px",
    },
    message: {
      fontSize: "1.2rem",
      marginBottom: "30px",
    },
    image: {
      maxWidth: "300px",
      marginBottom: "20px",
    },
    footer: {
      fontSize: "1rem",
      color: "#777",
    },
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Kami Sedang Melakukan Pemeliharaan</h1>
      <p style={styles.message}>
        Mohon maaf atas ketidaknyamanan ini. Kami sedang bekerja keras untuk
        meningkatkan layanan kami. Silakan kembali lagi nanti!
      </p>
      <img
        src="/img/menten.png" // Ganti dengan path gambar yang sesuai
        alt="Maintenance"
        style={styles.image}
      />
      <p style={styles.footer}>Terima kasih atas pengertian Anda.</p>
    </div>
  );
}

export default Profile;
