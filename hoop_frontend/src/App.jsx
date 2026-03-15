import { useEffect, useState } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar' 
import Topbar from './components/Topbar'  
import MainContent from './components/MainContent'
import NewTaskModal from './components/NewTaskModal'
import NewMeetingModal from './components/NewMeetingModal'
import Dashboard from './pages/Dashboard'
import Meetings from './pages/Meetings'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  const [tasks, setTasks] = useState([])
  const [meetings, setMeetings] = useState([])
  const [user, setUser] = useState({ name: '루나', role: '개발자' })
  
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false); 
  
  const [currentView, setCurrentView] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', !isDark ? 'dark' : 'light');
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tasks/')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err))
  }, [])
    
  return (
    <Routes>
      
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/*" element={
        <div className="hoop-app" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
          {/* 사이드바 */}
          <Sidebar 
            currentView={currentView} 
            setCurrentView={setCurrentView} 
            user={user} 
            projects={[]} 
            onOpenModal={() => setIsModalOpen(true)} 
          />
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* 탑바 */}
            <Topbar 
              user={user} 
              onOpenModal={() => setIsModalOpen(true)} 
              currentView={currentView} 
              isDark={isDark} 
              toggleTheme={toggleTheme} 
            />
            
            {/* 메인 콘텐츠 영역 */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {currentView === 'home' && <MainContent userName={user.name} tasks={tasks} />}
              {currentView === 'dashboard' && <Dashboard tasks={tasks} />}
              
              {currentView === 'meetings' && (
                <Meetings 
                  meetings={meetings} 
                  onOpenMeetingModal={() => setIsMeetingModalOpen(true)} 
                />
              )}
              
              {currentView !== 'home' && currentView !== 'dashboard' && currentView !== 'meetings' && (
                <div style={{ padding: '50px', textAlign: 'center', color: '#717785' }}>
                  <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>🚧 {currentView} 화면 공사 중! 🚧</h1>
                  <p>열심히 개발중이에요!</p>
                </div>
              )}
            </div>
          </div>

          <NewTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <NewMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} />
        </div>
      } />
      
    </Routes>
  )
}

export default App