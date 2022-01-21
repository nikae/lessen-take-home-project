


const Search = ({ searchQuery, setSearchQuery }) => {
    return <div style={{
        paddingTop: '20px',
        boxSizing: 'content-box',
    }}>
        <SearchBar searchQuery={searchQuery}
            setSearchQuery={setSearchQuery} />
    </div>;
}

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form action="/" method="get">
        <label htmlFor="header-search">
        </label>
        <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search contacts"
            name="s"
        />
        <button type="submit">Search</button>
    </form>
);


export default Search;