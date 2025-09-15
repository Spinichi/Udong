import { useState, useEffect } from 'react'
import Onboarding from '../pages/Onboarding'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ClubSelection from '../pages/ClubSelection'
import ClubCreation from '../pages/ClubCreation'

type Route = 'onboarding' | 'login' | 'signup' | 'club-selection' | 'club-creation'

const Router = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>(() => {
    const path = window.location.pathname
    if (path === '/login') return 'login'
    if (path === '/signup') return 'signup'
    if (path === '/club-selection') return 'club-selection'
    if (path === '/club-creation') return 'club-creation'
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
      else if (path === '/club-selection') setCurrentRoute('club-selection')
      else if (path === '/club-creation') setCurrentRoute('club-creation')
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
    case 'club-selection':
      return <ClubSelection
        onNavigateToOnboarding={() => navigate('onboarding')}
        onNavigateToJoinClub={() => console.log('Navigate to join club')}
        onNavigateToCreateClub={() => navigate('club-creation')}
      />
    case 'club-creation':
      return <ClubCreation
        onNavigateToOnboarding={() => navigate('onboarding')}
        onNavigateToClubSelection={() => navigate('club-selection')}
        onCreateClub={(clubData) => console.log('Club created:', clubData)}
      />
    default:
      return <Onboarding onNavigateToLogin={() => navigate('login')} />
  }
}

export default Router