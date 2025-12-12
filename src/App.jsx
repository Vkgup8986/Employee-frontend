import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import AdminSummary from './components/dashboard/AdminSummary.jsx';
import DepartmentList from './components/department/DepartmentList.jsx';
import PrivateRoutes from './utils/PrivateRoutes.jsx'
import RoleBaseRoutes from './utils/RoleBaseRoutes.jsx'
import AddDepartment from './components/department/AddDepartment.jsx';
import EditDepartment from './components/department/EditDepartment.jsx';
import List from './components/employee/List.jsx';
import Add from './components/employee/Add.jsx';
import View from './components/employee/View.jsx';
import Edit from './components/employee/Edit.jsx';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Navigate to="/admin-dashboard" />} > </Route>
        <Route path="/login" element={<Login />} > </Route>
        <Route path="/admin-dashboard" element={
          //at first at goes in PrivateRoute component (place in Utils folder in frontend) there check its user verify or not, then RoleBaseRoute there check user is admin or not by passing array as props, so that only admin access the AdminDashbord
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashboard />    
            </RoleBaseRoutes>
          </PrivateRoutes>} >

          <Route index element={<AdminSummary />} ></Route>

          <Route path="departments" element={<DepartmentList />} ></Route>
          <Route path="add-department" element={<AddDepartment />} ></Route>
          <Route path="department/:id" element={<EditDepartment />} ></Route>

          <Route path="employees" element={< List />} ></Route>
          <Route path="Add" element={<Add />} ></Route>
          <Route path="employees/:id" element={<View />} ></Route>
          <Route path="employees/edit/:id" element={<Edit/>} ></Route>

        </Route>
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} > </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
