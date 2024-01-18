
import { createContext, useState } from "react"

export const DataContext = createContext(null);


// a component
const DataProvider = ({ children }) => {

    const [account, setAccount] = useState({ username: '', name: ''});

    return (
        <DataContext.Provider value={{   // in value pass that which needs to be exported
            account,                     // now we wrap those components in which we need to use these states with data provider 
            setAccount
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;