"use client";
import { Client, Databases, ID } from "appwrite";
import { useEffect, useState } from "react";
const client = new Client();

client
  .setEndpoint("https://fifartapp.eu/v1")
  .setProject("65f450c61b0228a4f66f");

const database = new Databases(client);

export default function Home() {
  const [gifts, setGifts] = useState([]);
  const [gift, setGift] = useState([]);
  const [disable, setDisable] = useState(false);
  const [hidden, setHidden] = useState("invisible");

  const buttons = [
    {
      num: 1,
      title: "LONGCHAMP LE PLIAGE GREEN",
      url: "https://www.atticadps.gr/gunaikeia-moda/tsantes/sakidia-platis/longchamp-gynaikeio-sakidio-platis-le-pliage-green-00000096321/?Color=%CE%9C%CE%B1%CF%8D%CF%81%CE%BF&campaignid=20516728234&gad_source=1&gclid=CjwKCAjw48-vBhBbEiwAzqrZVAeEUCiVxOntQgOyYMY4NfRxotPgLMiQOvgYSKo4BYCPep0cP7Zf-RoCOUYQAvD_BwE",
    },
    {
      num: 2,
      title: "Louis Vouitton Néonoé BB",
      url: "https://en.louisvuitton.com/eng-nl/products/neonoe-bb-monogram-nvprod4280082v/M46581",
    },
    {
      num: 3,
      title: "Ταξίδι στη Ρώμη (Ανοιχτή ημερομηνία)",
      url: "https://www.tripadvisor.com.gr/Tourism-g187791-Rome_Lazio-Vacations.html",
    },
  ];

  const pressButton = async (numb) => {
    await database.createDocument(
      "65f4514ae761f2656e2d",
      "65f456036ce1cd18daa8",
      ID.unique(),
      { title: `ΔΩΡΟ Νο ${numb}` }
    );
    setDisable(true);
    setHidden("");
    getGiftOption();
  };

  const getGiftOption = async () => {
    const data = await database.listDocuments(
      "65f4514ae761f2656e2d",
      "65f456036ce1cd18daa8"
    );
    setGift(data.documents[0]);
  };

  useEffect(() => {
    getGiftOption();
  }, []);
  console.log(gift?.title);
  return (
    <main className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="text-center flex flex-col p-5">
        <h1 className="text-4xl font-bold mb-4">Κατερίνα Βασιλοπούλου</h1>
        <h3 className="text-lg text-gray-700 mb-2">
          Αισίως πλησίασες ένα χρόνο πιο κοντά στα 100, αλλά μην ανησυχείς γιατί
          όλα έχουν να κάνουν με την οπτική...
        </h3>
        <h4 className="text-md text-gray-600 mb-4">
          Μέσα από αυτή την μικρή εφαρμογή μπορείς να διαλέξεις το 🎁 δώρο σου!
        </h4>
        <p className="text-gray-800 mb-4">
          Μόλις κάνεις την επιλογή σου η οποία και θα είναι μία και μοναδική, θα
          σου αποκαλυφθούν, οι άλλες 2 επιλογές που έχασες!
        </p>
        <h1 className="text-2xl font-bold mb-4">Καλή σου τύχη!</h1>
      </div>
      <div className="text-center ml-8">
        <ul>
          {buttons.map((b) => {
            return (
              <li key={b.num} className="mb-4">
                <button
                  onClick={() => {
                    pressButton(b.num);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none disabled:opacity-25"
                  disabled={disable}
                >
                  Δώρο {b.num}
                </button>
                <br />
                <p className={`text-sm ${hidden}`}>
                  🔗{" "}
                  <a href={b.url} className="text-blue-500">
                    {b.title}
                  </a>
                </p>
              </li>
            );
          })}
        </ul>
        <h1 className={hidden}>Το Δώρο που επέλεξες είναι: {gift?.title}</h1>
        <p className="text-sm italic text-gray-600 mt-4">
          Στη περίπτωση που προσπαθήσεις να ξανατρέξεις την εφαρμογή... σε
          ενημερώνω πως την επιλογή σου την έχω ήδη καταγράψει! 🙂
        </p>
      </div>
    </main>
  );
}
