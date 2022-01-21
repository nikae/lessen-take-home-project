import { useState, useEffect } from 'react';
import { DisplayEntries } from './DisplayEntries';
import { EntryForm } from './EntryForm';


const LOCAL_STORAGE_KEY = 'takeHomeProject.phoneBook'

export function App() {

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedEntries) setEntries(storedEntries)
      }, [])
  useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries))
  }, [entries])
  
  const addEntryToPhoneBook = (entry) => {
    if (entry.firstName === "" || entry.lastName === "" || entry.phoneNumber === "")
      return;
    setEntries([...entries, entry].sort((a,b) => a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1))
  }

  return (<div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    flexDirection: "column"
  }}
  >
    <EntryForm addEntryToPhoneBook={addEntryToPhoneBook}/>
    <DisplayEntries entries={entries}/>
  </div>
  );
}

export default App;
