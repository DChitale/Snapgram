import AuthLayout from './_auth/authLayout';
import SignInForm from './_auth/forms/signInForm';
import SignUpForm from './_auth/forms/signUpForm';
import { Home } from './_root/pages';
import RootLayout from './_root/rootLayout';


import './global.css';
import { Routes,Route } from 'react-router-dom';
const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        <Route element={<AuthLayout/>}>
            <Route path='/sign-in' element={<SignInForm />} />
            <Route path='/sign-up' element={<SignUpForm/>} />
        </Route>
        <Route element={<RootLayout/>}>
            <Route index element={<Home/>} />
        </Route>


        
      </Routes>
    </main>
  )
}

export default App;