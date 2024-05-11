import { createContext, render } from 'preact'
import { App } from './app.jsx'
import './index.css'

const shincodeInfo = {
    name: 'shicode',
    age: 24,
};

export const shincodeContext = createContext(shincodeInfo)


render(
    <shincodeContext.Provider value={shincodeInfo}>
        <App />, 
    </shincodeContext.Provider>,document.getElementById('app'));

