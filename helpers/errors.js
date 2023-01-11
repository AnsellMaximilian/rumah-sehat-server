exports.makeError = (error, msg) => {
  if (typeof error === "string") return error;
  if (error.errors && Array.isArray(error.errors)) {
    console.log(error.errors);
    return error.errors.reduce(
      (msg, err) => `${err.message}. ${msg}`.trim(),
      ""
    );
  }
  return msg || "ERROR";
};
