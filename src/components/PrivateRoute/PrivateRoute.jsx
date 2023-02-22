import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ loggedIn, children }) => {
  console.log('loggedIn', loggedIn)
  return <>{loggedIn ? <>{ children }</> : <Navigate to={'/login'} />}</>
}
