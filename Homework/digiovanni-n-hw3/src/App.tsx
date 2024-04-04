// ===== | Imports | =====
import { useRef } from 'react';
import * as kanjiAPI from './KanjiAPI.ts';

function App() {
  let kanjiConainter = useRef<HTMLDivElement>(null);
  kanjiAPI.initKanjiAPI(kanjiConainter.current as HTMLDivElement)
  
  return (
    <>
      <p>Hello World!</p>
      <div>
        <input id='input' type="text" />
        <button onClick={() => {
          let input = document.querySelector('#input') as HTMLInputElement
          kanjiAPI.loadNewKanji(input.value);
        }}>Get Kanji</button>
      </div>
      <div>
        <button>Random Kanji</button>
      </div>
      <div ref={kanjiConainter} id='container'></div>
    </>
  )
}

export default App
