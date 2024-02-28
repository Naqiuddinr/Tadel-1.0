import './App.css'

import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import useLocalStorage from 'use-local-storage';
import { useContext } from 'react';

import { store } from './store';
import { AuthContext } from './feature/AuthContext';
import RequireAuth from './components/RequireAuth';

import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import AddTodoPage from "./pages/AddTodo";
import EditPage from './pages/EditPage';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import ArchivePage from './pages/ArchivePage';


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
          <Navbar.Brand as={Link} to={'/'}>
            <img
              alt=""
              src="src\components\16897435-removebg-preview.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Tadel
          </Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to={'/addtask'}>Add Task</Nav.Link>
            <Nav.Link as={Link} to={'/archive'}>Archive</Nav.Link>
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
  const [userData, setUserData] = useLocalStorage("userData", [])


  return (
    <AuthContext.Provider value={{ token, setToken, userData, setUserData }}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
              <Route index element={<Home />} />
              <Route path="addtask" element={<AddTodoPage />} />
              <Route path="archive" element={<ArchivePage />} />
              <Route path="edittodo/:id" element={<EditPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthContext.Provider>
  )
}