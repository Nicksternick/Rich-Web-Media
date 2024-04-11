import { useEffect, useState } from "react";
import './App.css'
import { loadXHR } from "./ajax";
import { readFromLocalStorage, writeToLocalStorage } from "./storage";
import Footer from "./Footer";

// app "globals" and utils
const baseurl = "https://www.amiiboapi.com/api/amiibo/?name=";

const searchAmiibo = (name, callback) => {
    loadXHR(`${baseurl}${name}`, callback);
};

const App = () => {
    const savedTerm = readFromLocalStorage("term") || "";
    const [term, setTerm] = useState(savedTerm);
    const [results, setResults] = useState([]);

    useEffect(() => {
        writeToLocalStorage("term", term);
    });

    const parseAmiiboResult = xhr => {
        // get the `.responseText` string
        const string = xhr.responseText;

        // declare a json variable
        let json;

        // try to parse the string into a json object
        json = JSON.parse(string)

        // log out number of results (length of `json.amiibo`)
        console.log(`Number of results=${json.amiibo.length}`);

        // loop through `json.amiibo` and log out the character name
        for (let name of json.amiibo) {
            console.log(name.character);
        }

        setResults(json.amiibo);
    };

    return <>
        <header>
            <h1>Amiibo Finder</h1>
        </header>
        <hr />
        <main>
            <button onClick={() => searchAmiibo(term, parseAmiiboResult)}>Search</button>
            <label>
                Name:
                <input value={term} onChange={e => setTerm(e.target.value.trim())} />
            </label>
        </main>
        {results.map(amiibo => (
            <span key={amiibo.head + amiibo.tail} style={{ color: "green" }}>
                <h4>{amiibo.name}</h4>
                <img
                    width="100"
                    alt={amiibo.character}
                    src={amiibo.image}
                />
            </span>
        ))}
        <hr />
        <Footer
            name="Nicholas DiGiovanni"
            year={new Date().getFullYear()}
        />
    </>;
};

export default App;