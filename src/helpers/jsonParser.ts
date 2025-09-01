function jsonParser(jsonString: string) {
  if (jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (err) {
      console.error("Invalid JSON in localStorage:", err);
    }
  }
}

export default jsonParser;
