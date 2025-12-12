import { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
  const [departments, setDepartments] = useState([])
  const [employee, setEmployee] = useState({
    name : '',
    maritalStatus:'',
    designation:'',
    salary:0,
    departments:'',
  })
  const navigate = useNavigate();
  const {id} = useParams()

  // for feching data in deparment ,so that in options it shows all departments,we make EmployeeHelper.jsx
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments()
      setDepartments(departments)
    }
    getDepartments()
  }, [])

  useEffect(() => {
    const fetchEmployee = async () => {
      // setLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`, { // removed leading space
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data?.success) {
          const employee = response.data.employee
          setEmployee((prev) => ({...prev, name : employee.userId.name,
          maritalStatus: employee.maritalStatus,
          designation:employee.designatin,
          salary : employee.salary,
          department: employee.department,
          }))
        } else {
          setEmployee(null)
        }
      } catch (error) {
        alert(error.response?.data?.error || error.message)
        setEmployee(null)
      } finally {
        // setLoading(false)
      }
    }

    fetchEmployee()
  }, [])

  // // making function for detecting is it file
  const handleChange = (e) => {
    const { name, value} = e.target
    
      setEmployee((prevData) => ({ ...prevData, [name]: value }))
    }
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const formDataObj = new FormData()
    // Object.keys(formData).forEach((key) => {formDataObj.append(key, formData[key]) })
    try {
      const response = await axios.put(`http://localhost:5000/api/employee/${id}`,employee, {
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
    <>{departments && employee ? (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 runded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-5 '>Edit Employees Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Name */}
          <div >
            <label className='block text-sm font-medium text-gray-700'>Name</label>
            <input className='mt-1 p-2 block w-full border border-gray-300 rounded-md' type="text" name="name" value={employee.name}  placeholder='Type Name' onChange={handleChange} required />
          </div>
        
          {/* Marital Status*/}
          <div >
            <label className='block text-sm font-medium text-gray-700'>Marital Status</label>
            <select className='mt-1 p-2 block w-full border border-gray-300 rounded-md' name="MaritalStatus" 
              value={employee.maritalStatus}  
            placeholder='Marital Status' onChange={handleChange} required>
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>

          </div>

          {/* Designation */}
          <div >
            <label className='block text-sm font-medium text-gray-700'> Designation</label>
            <input className='mt-1 p-2 block w-full border border-gray-300 rounded-md' type="text" name="designation" 
              value={employee.designatin}  
            placeholder='Inserted  Designation ' onChange={handleChange} required />
          </div>

          {/* Salary */}
          <div >
            <label className='block text-sm font-medium text-gray-700'> Salary </label>
            <input className='mt-1 p-2 block w-full border border-gray-300 rounded-md' type="number" name="salary"
              value={employee.salary}  
            placeholder='Inserted Salary' onChange={handleChange} required />
          </div>

          {/* Department*/}
          <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700'> Department </label>
            <select className='mt-1 p-2 block w-full border border-gray-300 rounded-md' type="text" name="department" 
            value={employee.department}
            onChange={handleChange} required>
              <option >Select Department</option>
              {departments.map(dep => (
                <option key={dep._id} value={dep._id} >{dep.dep_name}</option>
              ))}
            </select>
          </div>
        </div>

        <button type='submit' className='w-full mt-6 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-md'>Edit Employee</button>

      </form>

    </div>
    ) : <div> Loading....</div>} </>
  )

}
export default Edit