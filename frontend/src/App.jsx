import {Route, Routes} from "react-router-dom"
import CreateBook from "./pages/createBook"
import DeleteBook from "./pages/deleteBook"
import EditBook from "./pages/editBook"
import Home from "./pages/home"
import ShowBook from "./pages/showBook"
function App() {

  return (
  <Routes>
    <Route   path="/" element={<Home/>}/>
    <Route   path="/books/create" element={<CreateBook/>}/>
    <Route   path="/books/details/:id" element={<ShowBook/>}/>
    <Route   path="/books/edit/:id" element={<EditBook/>}/>
    <Route   path="/books/delete/:id" element={<DeleteBook/>}/>
  </Routes>
  )
}

export default App
