import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext.jsx'


const Login = () => {
  // storing data of email,password making of useState
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault();
    //alert("login");
    try {
      const response = await axios.post("https://employee-server-i9od.vercel.app/api/auth/login", { email, password });

      if (response.data.success) { //if Successfully post kar diya email and password ko
        login(response.data.user)
        localStorage.setItem("token", response.data.token) // localStorage me token to store kar rhai h
        console.log("Redirecting to admin dashboard")
        if (response.data.user.role === "admin") { navigate('/admin-dashboard') } // Role ke hisab se navigate kar de rahi adminDaasboard ya employeeDashbord
        else {
          navigate('/employee-dashboard')
        }
      }
      console.log(response.data)

    } catch (error) {
      // console.log(error);
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error)
      } else {
        setError("Server Error")
      }

    }
  }
  return (
    <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-purple-500 from-50% to-gray-200 to-50% space-y-6' >

      {/* {error && <p className='text-red-500' >{error}</p>} */}

      <h2 className='font-serif text-3xl text-white' >Employee Management System</h2>

      <div className='border shadow-lg rounded-md p-6 w-80 bg-gray-100'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>

        <form action="" onSubmit={handleSubmit} >
          <div className='mb-4' >
            <label htmlFor="email" className='block text-gray-700'>Email</label>
            <input type="email" className='w-full px-3 py-2 border bg-gray-120  focus:outline-purple-500
            ' placeholder='Enter Email'
              onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700'>Password</label>
            <input type="password" className='w-full px-3 py-2 border bg-gray-120 focus:outline-purple-500' placeholder='********' onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className='mb-4  flex items-center justify-between'>
            <label className='inline-flex items-center' >
              <input type="checkbox" className='form-checkbox' />
              <span className="ml-2 text-gray-700"> Remember me</span>
            </label>
            <a href="#" className='text-purple-500'>Forgot password</a>
          </div>

          <div className='mb-4'>
            <button type='submit' className='w-full bg-purple-500 text-whihte py-2 rounded-md'>Login</button>
          </div>
        </form>
        {error && <p className='text-red-500 text-lg' >{error}</p>}
      </div>
    </div>
  )
}

export default Login
