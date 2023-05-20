import { DateTime } from 'luxon';

const CalculateEpochDate = async date => {
  const matchDate = DateTime.fromSeconds(date, { zone: 'utc' }).toFormat(
    'dd MMM yyyy',
    {
      setZone: true,
    }
  );

  return matchDate;
};

const CalculateEpochTime = async date => {
  const matchTime = DateTime.fromSeconds(date, { zone: 'utc' }).toFormat(
    'HH:mm',
    {
      setZone: true,
    }
  );

  return matchTime;
};

export { CalculateEpochDate, CalculateEpochTime };
