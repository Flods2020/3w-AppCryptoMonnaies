import React from "react";

const Ressources = () => {
  return (
    <div className="acm-home-container">
      <h2>Ressources</h2>
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/Wsnbvpf5u9M?si=HZ9fPYSUysUeKlma"
          title="YouTube video player"
          frameborder="1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default Ressources;
