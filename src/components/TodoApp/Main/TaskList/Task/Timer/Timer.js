import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

const Timer = ({ creationDate, deleted }) => {
  const [timeToNow, setTimeToNow] = useState(
    formatDistanceToNow(creationDate, { includeSeconds: true })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeToNow(formatDistanceToNow(creationDate, { includeSeconds: true }));
    }, 1000);

    if (deleted) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [creationDate, deleted]);

  return <span>{timeToNow}</span>;
};

Timer.defaultProps = {
  includeSeconds: true,
};

Timer.propTypes = {
  includeSeconds: PropTypes.bool,
};

export default Timer;
