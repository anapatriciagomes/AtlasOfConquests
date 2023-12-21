const PopulationConverter = ({ number }) => {
  const formatNumber = num => {
    if (num < 1000) {
      return num.toString();
    } else if (num < 1000000) {
      return `${(num / 1000).toFixed(2)} thousand`;
    } else {
      return `${(num / 1000000).toFixed(2)} million`;
    }
  };

  const formattedNumber = formatNumber(number);

  return <>{formattedNumber}</>;
};

export default PopulationConverter;
