import React from "react";

const MapEmbed = ({ address }) => {
  const query = address ? `${address.streetAddress}, ${address.city} ${address.pincode}` : "India";
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  return (
    <div className="w-full h-full overflow-hidden rounded-xl" style={{ minHeight: 340 }}>
      <iframe
        width="100%"
        height="100%"
        style={{ minHeight: 340, border: 0, display: "block" }}
        loading="lazy"
        allowFullScreen
        src={src}
      />
    </div>
  );
};

export default MapEmbed;
