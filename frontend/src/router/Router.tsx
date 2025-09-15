import { useState, useEffect } from 'react'
import Onboarding from '../pages/Onboarding'
import Login from '../pages/Login'

type Route = 'onboarding' | 'login'

const Router = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>(() => {
    return window.location.pathname === '/login' ? 'login' : 'onboarding'
  })

  const navigate = (route: Route) => {
    setCurrentRoute(route)
    const path = route === 'onboarding' ? '/' : `/${route}`
    window.history.pushState({}, '', path)
  }

  useEffect(() => {
    const handlePopstate = () => {
      setCurrentRoute(window.location.pathname === '/login' ? 'login' : 'onboarding')
    }

    window.addEventListener('popstate', handlePopstate)
    return () => window.removeEventListener('popstate', handlePopstate)
  }, [])

  switch (currentRoute) {
    case 'login':
      return <Login onNavigateToOnboarding={() => navigate('onboarding')} />
    default:
      return <Onboarding onNavigateToLogin={() => navigate('login')} />
  }
}

export default Router