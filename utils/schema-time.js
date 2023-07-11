const makeSchemaData = async match => {
  let schemaData = {
    schemaVenue: '',
    schemaCity: '',
    schemaCountry: '',
    schemaStartDate: ``,
    schemaEndDate: ``,
  };
  const originalTmp = match.startTimestamp;
  const endTmp = originalTmp + 8200;

  const theDateStarts = new Date(originalTmp * 1000);
  const theDateEnds = new Date(endTmp * 1000);
  schemaData.schemaStartDate = theDateStarts.toISOString();
  schemaData.schemaEndDate = theDateEnds.toISOString();

  if (typeof match.venue !== 'undefined') {
    if (typeof match.venue.city !== 'undefined') {
      schemaData.schemaCity = match.venue.city.name;
    } else {
      schemaData.schemaCity = 'not available';
    }

    if (typeof match.venue.stadium !== 'undefined') {
      schemaData.schemaVenue = match.venue.stadium.name;
    } else {
      schemaData.schemaVenue = 'not available';
    }

    if (typeof match.venue.country !== 'undefined') {
      schemaData.schemaCountry = match.venue.country.name;
    } else {
      schemaData.schemaCountry = 'not available';
    }
  }

  return schemaData;
};

export { makeSchemaData };
