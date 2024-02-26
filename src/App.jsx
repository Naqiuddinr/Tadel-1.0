import './App.css'

import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import useLocalStorage from 'use-local-storage';

import { store } from './store';
import { AuthContext } from './feature/AuthContext';

import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import AddTodoPage from "./pages/AddTodo";
import EditPage from './pages/EditPage';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import { useContext } from 'react';


export function Layout() {

  const navigate = useNavigate();
  const authContext = useContext(AuthContext)

  function logout() {
    authContext.setToken(null);
    navigate('/login');
  }

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to={'/'}>Todo App</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to={'/addtodo'}>Add Todo</Nav.Link>
            <Button variant='outline-secondary' onClick={() => logout()}>Logout</Button>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

export default function App() {

  const [token, setToken] = useLocalStorage("token", null);


  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='login' element={<Login />} />
            <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
              <Route index element={<Home />} />
              <Route path="addtodo" element={<AddTodoPage />} />
              <Route path="edittodo/:id" element={<EditPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthContext.Provider>
  )
}