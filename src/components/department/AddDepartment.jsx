import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddDepartment = () => {

  const [department, setDepartment] = useState({ dep_name: "", description: "" })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;  // e.target (jo current input element hota hai) se name and uska value assisgn kar derhai name value varible me ,isko object destructuring h
    setDepartment({ ...department, [name]: value }) // two things here first previouse value, 2nd when new value put,ye dynamic kam horhai jab user dep name oruska value dal rhai to direct department ja rahi, phir description ka valua dal rhai to wo depatmwnt me chala jrhai,ek hi handler multiple inputs ke liye chal jayega
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://employee-server-fhax.vercel.app/api/department/add', department, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.data.success) {
        // Pass state to trigger refetch from Copilot for refresh
        navigate("/admin-dashboard/departments", { state: { refetch: true } });
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }
  }

  return (
    <div className='max-w-3xl mx-auto mt-10 bg-purple-400 p-8 rounded-md shadow-md w-96 border-s-violet-500'>

      <h3 className='text-2xl font-bold mb-6'>Add Department</h3>

      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="dep_name" className='text-sm font-medium text-gray-700'> Department Name</label>
          <input type="text" name="dep_name" placeholder='Enter Dep Name' onChange={handleChange} className='mt-1 w-full p-2 border border-gray-300 rounded-md bg-purple-100' required />
        </div>

        <div className="">
          <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Discription</label>
          <textarea name="description" onChange={handleChange} id="" placeholder='Description' className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-purple-100' rows="4" />
        </div>

        <button type='submit' className='w-full mt-6 bg-purple-500 text-white font-bold py-2 px-4 rounded'> Add to Department</button>

      </form>

    </div>

  )
}

export default AddDepartment
