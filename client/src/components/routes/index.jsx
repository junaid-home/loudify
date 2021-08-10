import {Redirect, Route} from 'react-router-dom'
import {useAuth} from '../../store/auth-context'

export function PrivateRoute({component: Component, ...other}) {
  const {user} = useAuth()

  return (
    <Route
      {...other}
      render={(props) => (user ? <Component {...props} /> : <Redirect to='/login' />)}
    />
  )
}

export function UnauthRoute({component: Component, ...other}) {
  const {user} = useAuth()

  return (
    <Route
      {...other}
      render={(props) => (!user ? <Component {...props} /> : <Redirect to='/' />)}
    />
  )
}
