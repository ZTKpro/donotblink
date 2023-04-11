const words = require("./words.json");

export default function handler(req, res) {
  if (req.method === "GET") {
    const response = {
      words: words,
    };

    res.status(200).json(response);
  } else {
    res.status(405).json({ message: "Metoda HTTP nieobsługiwana" });
  }
}
