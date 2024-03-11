import { createContext, useContext, useReducer, useEffect } from 'react'

const AuthContext = createContext()

const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload }
    case LOGOUT:
      return { user: null }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const initialState = () => {
    const cachedAuthState = localStorage.getItem('authState')
    if (cachedAuthState) {
      const { user } = JSON.parse(cachedAuthState)
      return { user }
    }
    return { user: null } // Default state if nothing in local storage
  }
  const [state, dispatch] = useReducer(authReducer, initialState())

  // save user to local storage upon login
  const login = (user) => {
    dispatch({ type: SET_USER, payload: user })
    localStorage.setItem('authState', JSON.stringify({ user }))
  }

  const updateUser = (updatedUser) => {
    dispatch({ type: SET_USER, payload: updatedUser })
    const storedAuthState = JSON.parse(localStorage.getItem('authState'))
    if (storedAuthState) {
      storedAuthState.user = updatedUser
    }
    localStorage.setItem('authState', JSON.stringify(storedAuthState))
  }

  // remove user from local storage upon logout
  const logout = () => {
    dispatch({ type: LOGOUT })
    localStorage.removeItem('authState')
  }

  useEffect(() => {
    const cachedAuthState = localStorage.getItem('authState')
    if (cachedAuthState) {
      const { user } = JSON.parse(cachedAuthState)
      dispatch({ type: SET_USER, payload: user })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
