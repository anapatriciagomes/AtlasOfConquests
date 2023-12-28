const PopulationConverter = ({ number }) => {
  const formatNumber = num => {
    if (num < 1000) {
      return num.toString();
    } else if (num < 1000000) {
      const formatted = num.toLocaleString();
      return formatted;
    } else if (num < 1000000000) {
      const formatted = (num / 1000000).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
      return `${formatted}M`;
    } else {
      const formatted = (num / 1000000000).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
      return `${formatted}B`;
    }
  };

  return <span>{formatNumber(number)}</span>;
};

export default PopulationConverter;
