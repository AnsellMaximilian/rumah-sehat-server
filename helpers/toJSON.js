function toJSON(obj) {
  // Base case: If the object is null or not an object, return it as is
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Check if the object has a toJSON method
  if (typeof obj.toJSON === "function") {
    // Call the toJSON method and assign its result to a new variable
    const result = obj.toJSON();

    // Recursively call toJSON on the result
    return toJSON(result);
  }

  // If the object doesn't have a toJSON method, recursively process its properties
  const processedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Recursively call toJSON on each property
      processedObj[key] = toJSON(obj[key]);
    }
  }

  return processedObj;
}

module.exports = toJSON;
