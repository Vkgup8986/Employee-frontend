import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'


const DepartmentList = () => {
  const location = useLocation();
  const [departments, setDepartments] = useState([])
  const [depLoading, setDepLoding] = useState(false)
  const [filteredDepartments, setFilterDepartments] = useState([])

  const onDepartmentDelete = async (id) => {
    const data = departments.filter(dep => dep._id !== id)
    //const data = departments.filter(dep._id !==id)
    setDepartments(data)
  }

  useEffect(() => {  // from fetaching data from database when i add any department
    const fetchDepartments = async () => {
      setDepLoding(true)
      try {
        const response = await axios.get('https://employee-server-fhax.vercel.app//department', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => (
            {
              _id: dep._id,
              sno: sno++,
              dep_name: dep.dep_name,
              action: (< DepartmentButtons Id={dep._id} onDepartmentDelete={handleDepartmentDelete} />),
            }
          )
          )
          setDepartments(data)
          setFilterDepartments(data)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setDepLoding(false)
      }
    }

    const handleDepartmentDelete = () => {
      fetchDepartments()
    }

    fetchDepartments()
  }, [location.state?.refetch])

  const handleFilterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilterDepartments(records)
  }

  return (
    <> {depLoading ? <div>Loading...</div> :
      <div className='p-5'>

        <div className='text-center'>
          <h3 className='text-2xl font-bold'>Mange Department</h3>
        </div>
        <div className='flex justify-between items-center'>
          <input type="text" placeholder='Search by Dep. Name' className='py-4 px-0.5 border' onChange={handleFilterDepartments} />
          <Link to="/admin-dashboard/add-department" className=' px-4 py-1 bg-purple-500 rounded text-white'
          > Add New Department</Link>
        </div>

        <div className='mt-5'>
          <DataTable columns={columns} data={filteredDepartments} pagination />

        </div>
      </div>
    }</>
  )
}

export default DepartmentList