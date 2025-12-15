import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Add = () => {
  const [departments, setDepartments] = useState([])
  const [formData, setFormData] = useState({})
  const navigate = useNavigate();

  // for feching data in deparment ,so that in options it shows all departments,we make EmployeeHelper.jsx
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments()
      setDepartments(departments)
    }
    getDepartments()
  }, [])

  // making function for detecting is it file
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
    }
    else {
      setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataObj = new FormData()
    Object.keys(formData).forEach((key) => {formDataObj.append(key, formData[key])})
    try {
      const response = await axios.post('https://employee-server-fhax.vercel.app/api/employee/add', formDataObj, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`, }
      })

      console.log(response.data.success);


      if (response.data.success) {
        // Pass state to trigger refetch from Copilot for refresh
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }
  }


  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 runded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-5 '>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Name */}
          <div >
            <label className='block text-sm font-medium text-gray-700'>Name</label>
            <input className='mt-1 p-2 block w-full border border-gray-300 rounded-md' type="text" name="name" placeholder='Type Name' onChange={handleChange} required />
          </div>

          {/* Emial*/}
          <div >
            <label className='block text-sm font-medium text-gray-700'>Emial</label>
            <input className='mt-1 p-2 block w-full border border-gray-300 rounded-md' type="email" name="email" placeholder='Type Emial' onChange={handleChange} required />
          </div>

          {/* Employee ID */}
          <div >
            <label className='block text-sm font-medium text-gray-700'>Employee ID</label>
            <input className='mt-1 p-2 block w-full border border-gray-300 rounded-md' type="text" name="employeeId" placeholder='Employee ID' onChange={handleChange} required />
          </div>

          {/* Gender */}
          <div >
            <label className='block text-sm font-medium text-gray-700'>Gender</label>
            <select name="gender" className='mt-1 p-2 block w-full border border-gray-300 rounded-md' onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">other</option>
            </select>

          </div>

          {/* Date */}
          <div >
            <label className='block text-sm font-medium text-gray-700'>Date of Birth</label>
            <input className='mt-1 p-2 block w-full border border-gray-300 rounded-md' type="date" name="dob" placeholder='insert in dd/mm/yyyy formate' onChange={handleChange} required />
          </div>

          {/* Marital Status*/}
          <div >
            <label className='block text-sm font-medium text-gray-700'>Marital Status</label>
            <select className='mt-1 p-2 block w-full border border-gray-300 rounded-md' name="MaritalStatus" placeholder='Marital Status' onChange={handleChange} required>
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>

          </div>

          {/* Designation */}
          <div >
            <label className='block text-sm font-medium text-gray-700'> Designation</label>
            <input className='mt-1 p-2 block w-full border border-gray-300 rounded-md' type="text" name="designation" placeholder='Inserted  Designation ' onChange={handleChange} required />
          </div>

          {/* Department*/}
          <div >
            <label className='block text-sm font-medium text-gray-700'> Department </label>
            <select className='mt-1 p-2 block w-full border border-gray-300 rounded-md' type="text" name="department" onChange={handleChange} required>
              <option >Select Department</option>
              {departments.map(dep => (
                <option key={dep._id} value={dep._id} >{dep.dep_name}</option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div >
            <label className='block text-sm font-medium text-gray-700'> Salary </label>
            <input className='mt-1 p-2 block w-full border border-gray-300 rounded-md' type="number" name="salary" placeholder='Inserted Salary' onChange={handleChange} required />
          </div>

          {/* password */}
          <div >
            <label className='block text-sm font-medium text-gray-700'>  password </label>
            <input className='mt-1 p-2 block w-full border border-gray-300 rounded-md' type="password" name="password" value={formData.password} placeholder='Insert *******' onChange={handleChange} required />
          </div>

          {/* Role */}
          <div >
            <label className='block text-sm font-medium text-gray-700'> Role </label>
            <select className='mt-1 p-2 block w-full border border-gray-300 rounded-md' name="role" onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>

          </div>
          {/* Upload Image */}
          <div >
            <label className='block text-sm font-medium text-gray-700'> image </label>
            <input className='mt-1 p-2 block w-full border border-gray-300 rounded-md' type="file" name="image" placeholder='Upload Image' accept='image/*' onChange={handleChange} required />
          </div>

        </div>

        <button type='submit' className='w-full mt-6 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-md'>Add Employee</button>

      </form>

    </div>
  )
}

export default Add
