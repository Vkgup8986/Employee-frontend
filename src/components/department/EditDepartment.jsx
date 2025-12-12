import axios from 'axios'
import React, {useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'


const EditDepartment = () => {
  const {id} = useParams()

  const [department,setDepartment] =useState([])
  const[deploading,setDepLoding] = useState(false)
  const navigate = useNavigate()
   useEffect(() => {  // from fetaching data from database when i add any department
      const fetchDepartments = async () => {
        setDepLoding(true)
        try {
          const response = await axios.get(
           ` http://localhost:5000/api/department/${id}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          })
          if (response.data.success) {
            setDepartment(response.data.department)
           
          }
        } catch (error) {
          if (error.response && !error.response.data.success) {
            alert(error.response.data.error)
          }
        } finally {
          setDepLoding(false)
        }
      }
  
      fetchDepartments()
    }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value }) // two things here first previouse value, 2nd when new value put
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put( `http://localhost:5000/api/department/${id}`, department, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      if (response.data.success) {
        navigate("/admin-dashboard/departments")
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }
  }
  return (
    <>{deploading ? <div>Loading...</div> : 
    <div className='max-w-3xl mx-auto mt-10 bg-purple-400 p-8 rounded-md shadow-md w-96 border-s-violet-500'>

      <h3 className='text-2xl font-bold mb-6'>Edit Department</h3>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="dep_name" className='text-sm font-medium text-gray-700'> Department Name</label>
          <input type="text" name="dep_name" placeholder='Enter Dep Name' onChange={handleChange}  value ={department.dep_name} className='mt-1 w-full p-2 border border-gray-300 rounded-md bg-purple-100' required />
        </div>
        <div className="">
          <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Discription</label>
          <textarea name="description" onChange={handleChange} value = {department.description} placeholder='Description' className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-purple-100' rows="4" />
        </div>
        <button type='submit' className='w-full mt-6 bg-purple-500 text-white font-bold py-2 px-4 rounded'> Save Changes</button>
      </form>
    </div>
    }</>
  )
}

export default EditDepartment //54:29youtube