import axios from 'axios'
import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'


const userContext = createContext()

const authContext = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  // verify kar rhai agar login user karta hai to uska token generate hojayega ,server krta h send karta h frontend ko in cookies or in localstorage, ab kya to login user agar access karta hai har page ko , to har page verify karega ki wo user hai ki nhi to server middleware(authMiddleware.js) ka istamal karega to verify user
  // inside useEffect hook we will call server site and we will verify the user
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token") // getting token from loaclstorage
        if (token) {
          const response = await axios.get("https://employee-server-fhax.vercel.app/api/auth/verify", { 
            headers: {  // here we pass the token to authmiddlware to verify user by getting tken from localStorage
              Authorization: `Bearer ${token}`,
            },
          })
          if (response.data.success) {
            setUser(response.data.user)
          }
        } else {
          setUser(null)
          setLoading(false);
        }
      } catch (error) {
        if (error.response && !error.response.data.error) {
          setUser(null)
        }
      }
      finally {
        setLoading(false);
      }
    }
    verifyUser()
  }, [])

  const login = (userData) => {
    setUser(userData)
  }
  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
  }
  return (

    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>

  )
}

export const useAuth = () => useContext(userContext)

export default authContext