import axios from "axios"
import { useNavigate } from "react-router-dom"

// colums for DataTable
export const columns = [
  { name: "S.No", selector: (row) => row.sno, width: "70px" },
  { name: "Name", selector: (row) => row.name, sortable: true, width: "130px" },
  { name: "Image", cell: (row) => row.profileImage, width: "100px", ignoreRowClick: true },
  { name: "Department", selector: (row) => row.department, width: "90px" },
  { name: "DOB", selector: (row) => row.dob, sortable: true, width: "130px" },
  { name: "Action", cell: (row) => row.action, center: "true", ignoreRowClick: true },

]

export const fetchDepartments = async () => {
  let departments

  try {
    const response = await axios.get('https://employee-server-fhax.vercel.app/api/department', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.data.success) {
      departments = response.data.departments

    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error)
    }
  }
  return departments
}

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate()

  const handleView = () => {
    if (!Id) {
      alert("Employee id is not defined")
      console.error("EmployeeButtons: missing Id prop")
      return
    }
    navigate(`/admin-dashboard/employees/${Id}`)
  }

  const handleEdit = () => {
    if (!Id) {
      alert("Employee id is not defined")
      console.error("EmployeeButtons: missing Id prop")
      return
    }
    navigate(`/admin-dashboard/employees/edit/${Id}`)
  }

  return (
    <div className="flex space-x-3">
      <button className="px-3 py-1 bg-purple-500 text-white rounded" onClick={handleView}

      >View</button>
      <button className="px-3 py-1 bg-green-500 text-white rounded " onClick={handleEdit}>Edit</button>

      <button className="px-3 py-1 bg-yellow-500 text-white rounded " >Salary</button>
      <button className="px-3 py-1 bg-red-500 text-white rounded " >Leave</button>
    </div>
  )
}