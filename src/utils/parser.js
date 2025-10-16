const parserJSON = (response) => {
  try {
    const data = JSON.parse(response);
    if (!Array.isArray(data)) {
      throw new Error('Parsing error');
    }

  } catch(error) {
    error.isParseError = true;
    throw error;
  }

};

export default parserJSON;
