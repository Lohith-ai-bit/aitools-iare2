import React, { useState } from 'react';

export default function ToolIcon({ icon, name, iconBg }) {
  const [imgError, setImgError] = useState(false);
  const getInitials = (name) => name.slice(0, 2).toUpperCase();

  return (
    <div
      className="w-14 h-14 rounded-2xl mb-3 flex items-center justify-center overflow-hidden shadow-lg"
      style={{ background: iconBg || '#1a1a2e' }}
    >
      {!imgError ? (
        <img
          src={icon}
          alt={name}
          className="w-10 h-10 object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-white font-display font-bold text-lg">{getInitials(name)}</span>
      )}
    </div>
  );
}
