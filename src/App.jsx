import './App.css';
import LoginPage from './Components/LoginPage';
import Read from './Components/Read';
import Signin from './Components/Signup';
import Table_user from './Components/Table_user';
import UserPage from './Components/user_page';
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/Store';

function App() {

  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/log_in' element={<LoginPage/>}></Route> 
      <Route path='/sign_up' element={<Signin/>}></Route>
      <Route path='/table_user' element={<Table_user/>}></Route>
      <Route path='/Read' element={<Read/>}></Route>
      <Route path='/user_page/' element={<UserPage/>}></Route>
    </Routes>
  </BrowserRouter>
  </Provider>
    </>
  )
}

export default App
