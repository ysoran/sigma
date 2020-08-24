import React, { useState, useReducer } from 'react';
import './App.css';
import FileUploader from './components/file-uploader/file-uploader';
import JsonParser from './components/json-parser/json-parser';
import { reducer, initialState, JsonContext } from './components/context/context';


function App() {
  const [jsonFile, setJsonFile] = useState();
  const [jsonGlobal, dispatch] = useReducer(reducer, initialState);
  return (
    <JsonContext.Provider value={{ jsonGlobal, dispatch }}>
      <div className="App">
        <h1>
          Sigma json parser with JsonPath
        </h1>
        {!jsonFile && <FileUploader setJsonFile={setJsonFile} />}
        {jsonFile && <JsonParser file={jsonFile} />}
      </div >
    </JsonContext.Provider>
  );
}

export default App;
