// ===== | Imports | =====
import * as kanjiAPI from './KanjiAPI.ts';

function App() {
  kanjiAPI.fetch();
  
  // fetchJson("https://kanjiapi.dev/v1/kanji/金").then((jsonData) => {
  //   console.log('Received JSON data:', jsonData);
  //   // Handle the data as needed (e.g., update UI, process data, etc.)
  // })
  // .catch((error) => {
  //   console.error('Error fetching data:', error);
  //   // Handle the error (e.g., show an error message to the user)
  // })

  return (
    <>
      <p>Hello World!</p>
    </>
  )
}

export default App
