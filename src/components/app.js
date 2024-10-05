import React, { useState, useEffect } from "react";

import 'rsuite/dist/rsuite.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/style.css';
import { Routes, Route } from "react-router-dom"

import { Button } from 'rsuite';
import { Layout } from "./pures/layout";



const App = () => {

  const [activeSearchValue, setActiveSearch] = useState({

      value: '' ,  // the value of the search
      status: false // means the search is active
  })

return (<div className="w-100 h-100">
  <Routes>
    <Route path="/" element={<Layout searchObject={{asv:activeSearchValue , sas:setActiveSearch}}/>} />
  </Routes>
</div>)

}


export default App;