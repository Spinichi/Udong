import { useState, useEffect } from 'react'
import Onboarding from '../pages/Onboarding'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

type Route = 'onboarding' | 'login' | 'signup'

const Router = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>(() => {
    const path = window.location.pathname
    if (path === '/login') return 'login'
    if (path === '/signup') return 'signup'
    return 'onboarding'
  })

  const navigate = (route: Route) => {
    setCurrentRoute(route)
    const path = route === 'onboarding' ? '/' : `/${route}`
    window.history.pushState({}, '', path)
  }

  useEffect(() => {
    const handlePopstate = () => {
      const path = window.location.pathname
      if (path === '/login') setCurrentRoute('login')
      else if (path === '/signup') setCurrentRoute('signup')
      else setCurrentRoute('onboarding')
    }

    window.addEventListener('popstate', handlePopstate)
    return () => window.removeEventListener('popstate', handlePopstate)
  }, [])

  switch (currentRoute) {
    case 'login':
      return <Login
        onNavigateToOnboarding={() => navigate('onboarding')}
        onNavigateToSignup={() => navigate('signup')}
      />
    case 'signup':
      return <Signup
        onNavigateToOnboarding={() => navigate('onboarding')}
        onNavigateToLogin={() => navigate('login')}
      />
    default:
      return <Onboarding onNavigateToLogin={() => navigate('login')} />
  }
}

export default Router