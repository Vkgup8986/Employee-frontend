import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper"
import DataTable from "react-data-table-component"
import axios from "axios"


const List = () => {

  const location = useLocation()
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoding] = useState(false)
  const [filterEmployee , setFilterEmployee] = useState([])

  useEffect(() => {  // from fetaching data from database when i add any department
    const fetchEmployees = async () => {
      setEmpLoding(true)
      try {
        const response = await axios.get('http://localhost:5000/api/employee', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })


        if (response.data.success) {
          let sno = 1;
           const data = response.data.employees.map((emp) =>
            // ( // employees come from getEmployees component in employeeController.js
          //   {
          //     _id: emp._id,
          //     sno: sno++,
          //     department: emp.department?.dep_name || "",
          //     name: emp.userId?.name,
          //     dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "",

          //     profileImage: emp.userId?.profileImage? (
          //       <img width={40} className="rounded-full" src={`http://localhost:5000/${emp.userId.profileImage}`} alt={emp.userId?.name || ""} />) :null,
          //     action: (<EmployeeButtons Id={emp._id} />), // employeeButton i crreated in employyeeHelper.jsx
          //   }
          // )

           {
             const filename = emp.userId?.profileImage || "";
             console.log("profileImage from API:", filename); // debug

             // build a correct URL depending on what's stored
             let imgSrc = null;
             if (filename) {
               if (filename.startsWith("http") || filename.startsWith("//")) {
                 imgSrc = filename;
               } else if (filename.includes("public/") || filename.includes("Uploads/")) {
                 // if backend returned "public/Uploads/xxx.jpg" or "Uploads/xxx.jpg"
                 imgSrc = `http://localhost:5000/${filename.replace(/^\/+/, "")}`;
               } else {
                 // most common: DB stores only filename (e.g. "169xxx.jpg")
                 imgSrc = `http://localhost:5000/public/Uploads/${filename}`;
               }
             }
             return {
               _id: emp._id,
               sno: sno++,
               department: emp.department?.dep_name || "",
               name: emp.userId?.name || "",
               dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "",
               profileImage: imgSrc ? (
                 <img width={40} className="rounded-full" src={imgSrc} alt={emp.userId?.name || ""} />
               ) : null,
               action: (<EmployeeButtons Id={emp._id} />),
             };
           }
          )
           //console.log(response.data.employees);

          setEmployees(data)
          setFilterEmployee(data)

        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setEmpLoding(false)
      }
    }

    fetchEmployees();
  }, [location.state?.refetch]) //location.state?.refetch

  const handleFilter = (e) =>{
    const records = employees.filter((emp) =>(emp.name.toLowerCase().includes(e.target.value.toLowerCase())))
    setFilterEmployee(records)
  }

  return (
    <div className="p-5">
      <div className='text-center'>
        <h3 className='text-2xl font-bold mb-3'>Manage Employees </h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder='Search by Name' className='py-2 px-0.5 border mb-2' onChange={handleFilter} />
        <Link to="/admin-dashboard/Add" className=' px-4 py-1 bg-purple-500 rounded text-white'
        > Add New Employee</Link>
      </div>
      <div>
        <DataTable columns={columns} data={filterEmployee} pagination/>
      </div>
    </div>
  )
}

export default List