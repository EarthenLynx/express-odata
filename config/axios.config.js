module.exports = {
  headers: {
    Authorization:
      "Basic " +
      Buffer.from("user" + ":" + "passwort").toString("base64"),
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 20000,
};
