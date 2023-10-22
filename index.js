// Importa il modulo 'express' per la creazione di un server web e 'axios' per le richieste HTTP.
import express from "express";
import axios from "axios";

// Inizializza l'app Express e specifica la porta.
const app = express();
const port = 3000;

// Definisce l'URL di base dell'API remota.
const API_URL = "https://secrets-api.appbrewery.com";

// TODO: Sostituisci i valori seguenti con le tue credenziali prima di eseguire il file.
const yourUsername = ""; // Inserisci il tuo nome utente: fedev
const yourPassword = ""; // Inserisci la tua password: fedeveloper2023
const yourAPIKey = ""; // Inserisci la tua chiave API: ccdb4d99-8121-4410-9c44-f7a987099476
const yourBearerToken = ""; // Inserisci il tuo token Bearer: d4be4d58-d037-4860-a073-55c79569701a


// Gestisce la richiesta principale.
app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

// Gestisce la richiesta senza autenticazione.
app.get("/noAuth", async (req, res) => {
  try {
    // Effettua una richiesta GET a un endpoint casuale dell'API.
    const result = await axios.get(API_URL + "/random");

    // Visualizza la risposta come stringa JSON nella pagina.
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    // Se c'è un errore, restituisci un messaggio di errore 404.
    res.status(404).send(error.message);
  }
});

// Gestisce la richiesta con autenticazione di base.
app.get("/basicAuth", async (req, res) => {
  try {
    // Effettua una richiesta GET a una pagina specifica dell'API con autenticazione di base.
    const result = await axios.get(
      API_URL + "/all?page=2",
      {},
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      }
    );

    // Visualizza la risposta come stringa JSON nella pagina.
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    // Se c'è un errore, restituisci un messaggio di errore 404.
    res.status(404).send(error.message);
  }
});

// Gestisce la richiesta con chiave API.
app.get("/apiKey", async (req, res) => {
  try {
    // Effettua una richiesta GET a una pagina specifica dell'API con una chiave API.
    const result = await axios.get(API_URL + "/filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });

    // Visualizza la risposta come stringa JSON nella pagina.
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    // Se c'è un errore, restituisci un messaggio di errore 404.
    res.status(404).send(error.message);
  }
});

// Configura l'header per l'autenticazione con token Bearer.
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

// Gestisce la richiesta con token Bearer.
app.get("/bearerToken", async (req, res) => {
  try {
    // Effettua una richiesta GET a un endpoint specifico dell'API con token Bearer.
    const result = await axios.get(API_URL + "/secrets/2", config);

    // Visualizza la risposta come stringa JSON nella pagina.
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    // Se c'è un errore, restituisci un messaggio di errore 404.
    res.status(404).send(error.message);
  }
});

// Avvia il server sulla porta specificata.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
