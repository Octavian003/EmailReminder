import React, { useState, useContext, useMemo } from "react";

const SearchContext = React.createContext()
// const ShowSearchContext = React.createContext()

export function useSearchContext() {
  return useContext(SearchContext)
}

// export function useShowSearchContext() {
//   return useContext(ShowSearchContext)
// }

export function SearchProvider({ children }){
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  // const searchValue = useMemo(() => [search, setSearch], [search])
  // const showValue = useMemo(() => [showSearch, setShowSearch], [showSearch])

  return (
    <SearchContext.Provider value={{value: [search, setSearch], value2: [showSearch, setShowSearch]}}>
      {/* <ShowSearchContext.Provider value={showValue}> */}
        {children}
      {/* </ShowSearchContext.Provider> */}
    </SearchContext.Provider>
  )
}