export default function SearchForm(){
 return(
    <form className="search-wrapper cf">
    <input
        id="#search-input"
        type="text"
        name="searchString"
        placeholder="Търсене..."
        required
    />
    <button type="submit">Search</button>
    </form> 
 )

}