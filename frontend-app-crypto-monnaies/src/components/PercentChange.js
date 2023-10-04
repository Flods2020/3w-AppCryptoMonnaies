import React, { useEffect, useState } from "react";
import colors from "../styles/_settings.scss";

const PercentChange = ({ percent }) => {
  const [color, setColor] = useState();

  useEffect(() => {
    percent
      ? percent < 0
        ? setColor(colors.percent1)
        : setColor(colors.percent2)
      : setColor(colors.percent3);
  }, [percent]);

  return (
    <p className="percent-change-container" style={{ color }}>
      {percent ? percent.toFixed(2) + "%" : "-"}
    </p>
  );
};

export default PercentChange;
