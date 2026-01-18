import { Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import DashboardLayout from '@components/layouts/DashboardLayout'
import HomePage from '@components/pages/HomePage'
import DecisionCapture from '@components/pages/DecisionCapture'
import TimelineView from '@components/pages/TimelineView'
import ComparativeIntelligence from '@components/pages/ComparativeIntelligence'
import SimulationLab from '@components/pages/SimulationLab'
import InstitutionalDashboard from '@components/pages/InstitutionalDashboard'
import LoadingScreen from '@components/ui/LoadingScreen'

function App() {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-background dark">
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route path="capture" element={<DecisionCapture />} />
          <Route path="timeline" element={<TimelineView />} />
          <Route path="compare" element={<ComparativeIntelligence />} />
          <Route path="simulate" element={<SimulationLab />} />
          <Route path="dashboard/:type" element={<InstitutionalDashboard />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
