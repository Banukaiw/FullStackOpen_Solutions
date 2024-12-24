import ReactDOM from 'react-dom/client'

import App from './App'

const persons = [{ name: 'Arto Hellas', number: "0789642771" }]
ReactDOM.createRoot(document.getElementById('root')).render(
  <App persons={persons} />
)