import { useState } from 'react'
import ChatbotPage from './components/chatbot'
import DataVisualizationPage from './components/datavisualization';
import KnowledgeGraphPage from './components/knowledgegraph';
import PortalPage from './components/portal';
import SatelliteTrackerPage from './components/satellitetracker';

import './App.css'

function App() {
  
  const [count, setCount] = useState(0)

  return (
    <>  <PortalPage />
      < ChatbotPage/>
       <DataVisualizationPage />
        <KnowledgeGraphPage />
        
         <SatelliteTrackerPage />
     

    </>
  )
}

export default App
