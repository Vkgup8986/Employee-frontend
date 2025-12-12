// import { useState } from "react"
// import { useEffect } from "react"
// import { useParams } from "react-router-dom"
// import axios from "axios"

// const View = () => {
//   const { id } = useParams()
//   const [employee, setEmployee] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {  // from fetaching data from database when i add any department

//     if (!id) return
//     const fetchEmployee = async () => {
//       setLoading(true)
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/employee/${id}`,{
//           headers: {
//             "Authorization": `Bearer ${localStorage.getItem('token')}`
//           }
//         })
//         if (response.data?.success) {
//           setEmployee(response.data.employee)

//         }
//       } catch (error) {
//         if (error.response && !error.response.data.success) {
//           alert(error.response.data.error)
//         }
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchEmployee()
//   }, [id])

//   return (
//     <>{employee ? (
//       <div className="max-w-3xl mx-auto mt-10 bg-whitw p-8 rounded-md shadow-md ">
//         <h2 className="text-2xl font-bold text-center mb-8">Employee Details</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* <div>
//             <img className="rounded-full border w-72" scr={`https://localhost:5000/${employee.userId.profileImage}`} />
//           </div> */}

//           <div>
//             {profileImage ? (
//               <img
//                 className="rounded-full border w-72"
//                 src={profileImage}
//                 alt={employee.userId?.name || "profile"}
//               />
//             ) : (
//               <div className="w-72 h-72 rounded-full bg-gray-200 flex items-center justify-center">No Image</div>
//             )}
//           </div>

//           <div>
//             <div className="flex space-x-3 mb-5">
//               <p className="text-lg font-bold">Name</p>
//               <p className="font-medium">{employee.userId?.name || "-"} </p>
//             </div>
//             <div className="flex space-x-3 mb-5">
//               <p className="text-lg font-bold">Employee ID :</p>
//               <p className="font-medium">{employee.employeeId ||"-"} </p>
//             </div>
//             <div className="flex space-x-3 mb-5">
//               <p className="text-lg font-bold">Date-of-Birth</p>
//               <p className="font-medium">{employee.dob ?new Date(employee.dob).toLocaleDateString() : "-"} </p>
//             </div>
//             <div className="flex space-x-3 mb-5">
//               <p className="text-lg font-bold">gender</p>
//               <p className="font-medium">{employee.gender || "-"} </p>
//             </div>
//             <div className="flex space-x-3 mb-5">
//               <p className="text-lg font-bold">Department :</p>
//               <p className="font-medium">{employee.department?.dep_name || "-"} </p>
//             </div>
//           </div>

//         </div>
//       </div>
//     ) : <div>Loading......</div>}</>
//   )
// }
// export default View

import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const View = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null) // use null for "not loaded"
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchEmployee = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`, { // removed leading space
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data?.success) {
          setEmployee(response.data.employee)
        } else {
          setEmployee(null)
        }
      } catch (error) {
        alert(error.response?.data?.error || error.message)
        setEmployee(null)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [id])

  if (loading) return <div>Loading......</div>
  if (!employee) return <div>No employee found</div>

  const profileImage = employee.userId?.profileImage
    ? `http://localhost:5000/public/Uploads/${employee.userId.profileImage}`
    : null

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md ">
      <h2 className="text-2xl font-bold text-center mb-8">Employee Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {profileImage ? (
            <img
              className="rounded-full border w-72"
              src={profileImage}
              alt={employee.userId?.name || "profile"}
            />
          ) : (
            <div className="w-72 h-72 rounded-full bg-gray-200 flex items-center justify-center">No Image</div>
          )}
        </div>

        <div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Name</p>
            <p className="font-medium">{employee.userId?.name || "-"} </p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Employee ID :</p>
            <p className="font-medium">{employee.employeeId || "-"} </p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Date-of-Birth</p>
            <p className="font-medium">{employee.dob ? new Date(employee.dob).toLocaleDateString() : "-"} </p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Gender</p>
            <p className="font-medium">{employee.gender || "-"} </p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Department :</p>
            <p className="font-medium">{employee.department?.dep_name || "-"} </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default View

