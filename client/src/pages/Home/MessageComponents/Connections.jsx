import SearchedUsers from "./SearchedUsers"

export default function Connections({searchResult, searchTerm}) {
  return (
    <div id="Connections">
      {searchTerm !== "" && 
        (<>
          <h6>Connections</h6>  
          {searchResult.connections.length != 0 ? 
            searchResult.connections.map((user) => {
              return <SearchedUsers user={user} key={user._id} />
            })
            : "No User Found"
          } 
       
          <h6>Strangers</h6>  
          {searchResult.strangers.length != 0 ? 
            searchResult.strangers.map((user) => {
              return <SearchedUsers user={user} key={user._id} />
            })
            : "No User Found"
          } 
        </>)
      }
    </div>
  )
}
