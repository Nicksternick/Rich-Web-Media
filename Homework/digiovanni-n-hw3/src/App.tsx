// ===== | Imports | =====
import * as kanjiAPI from './KanjiAPI.ts';

function App() {
  return (
    <>
      <p>Hello World!</p>
      <div>
        <input id='input' type="text" />
        <button onClick={() => {
          let input = document.querySelector('#input') as HTMLInputElement
          kanjiAPI.loadNewKanji(input.value, '#container');
        }}>Get Kanji</button>
      </div>
      <div>
        <button>Random Kanji</button>
      </div>
      <div id='container'></div>
    </>
  )
}

export default App
