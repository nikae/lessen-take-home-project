import { useState, useEffect } from 'react';
import { DisplayEntries } from './DisplayEntries';
import { EntryForm } from './EntryForm';
import Search from './search';

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
    setEntries([...entries, entry].sort((a, b) => a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1))
  }

  const filterEntrys = (entries, query) => {
    if (!query) {
      return entries;
    }
    return entries.filter((entry) => {
      const firstName = entry.firstName.toLowerCase();
      const lastName = entry.lastName.toLowerCase();
      const phoneNumber = entry.phoneNumber.toLowerCase();

      return firstName.includes(query) || lastName.includes(query) || phoneNumber.includes(query);
    });
  };

  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');
  const filteredEntrys = filterEntrys(entries, query);

  return (<div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    flexDirection: "column"
  }}
  >
    <EntryForm addEntryToPhoneBook={addEntryToPhoneBook} />
    <DisplayEntries entries={entries} />
    <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    <DisplayEntries entries={filteredEntrys} />
  </div>
  );
}

export default App;
