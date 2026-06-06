import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Services from './Pages/Services'
import AdminLogin from './Pages/AdminLogin.jsx'
import Admin from './Pages/Admin.jsx'
import Blogs from './Pages/Blog.jsx'


function App() {
  return (
    <div className='px-2 sm:px-12 md:px-16 lg:px-20 bg-gray-900'>
        <Navbar/>
<Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/services' element={<Services/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/blog' element={<Blogs/>} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Admin />} />
            
        </Routes>
        <Footer/>
    </div>
  )
}

export default App