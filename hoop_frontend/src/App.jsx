import { useEffect, useState } from 'react'
import axios from 'axios'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { auth, googleProvider } from './firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'

// 컴포넌트들
import Sidebar from './components/Sidebar' 
import Topbar from './components/Topbar'  
import MainContent from './components/MainContent'
import NewTaskModal from './components/NewTaskModal'
import NewMeetingModal from './components/NewMeetingModal'
import Dashboard from './pages/Dashboard'
import Meetings from './pages/Meetings'
import AdminDashboard from './pages/AdminDashboard'
import EditProfileModal from './components/EditProfileModal'

function App() {
  // 1. 상태 관리 (기존 + 유저 상태 추가)
  const [tasks, setTasks] = useState([])
  const [meetings, setMeetings] = useState([])
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false); 
  const [currentView, setCurrentView] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // 2. 로그인 상태 감시
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
          role: '' // 기본 역할
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 3. 기능 함수들
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("로그인 실패 다시 시도해주세요!", err);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', !isDark ? 'dark' : 'light');
  };

  useEffect(() => {
    if (user) { 
      axios.get('http://127.0.0.1:8000/api/tasks/')
        .then(res => setTasks(res.data))
        .catch(err => console.error(err))
    }
  }, [user]);

  // 로딩 중일 때 보여줄 화면
  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      로딩중..
    </div>
  );

  if (!user) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f8f9fa' }}>
        <h1 style={{ marginBottom: '20px' }}>🏀 Welcome to HooP!</h1>
        <p style={{ marginBottom: '30px' }}>로그인해야 친구들과 협업할 수 있어!</p>
        <button 
          onClick={handleLogin}
          style={{ padding: '12px 24px', fontSize: '16px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Google로 로그인하기
        </button>
      </div>
    );
  }

  // 5. 로그인 된 사용자만
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/*" element={
        <div className="hoop-app" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
          <Sidebar 
            currentView={currentView} 
            setCurrentView={setCurrentView} 
            user={user} 
            projects={[]} 
            onOpenModal={() => setIsModalOpen(true)} 
          />
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Topbar 
              user={user} 
              onOpenModal={() => setIsModalOpen(true)}
              onOpenProfileModal={() => setIsProfileModalOpen(true)} 
              currentView={currentView} 
              isDark={isDark} 
              toggleTheme={toggleTheme}
              onLogout={handleLogout} 
            />
            
            <NewMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} />

              <EditProfileModal 
                isOpen={isProfileModalOpen} 
                onClose={() => setIsProfileModalOpen(false)} 
                user={user}
                onSave={(newData) => {
                setUser({ ...user, ...newData }); 
                setIsProfileModalOpen(false);
                }}
              />

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {currentView === 'home' && <MainContent userName={user.name} tasks={tasks} />}
              {currentView === 'dashboard' && <Dashboard tasks={tasks} />}
              {currentView === 'meetings' && (
                <Meetings 
                  meetings={meetings} 
                  onOpenMeetingModal={() => setIsMeetingModalOpen(true)} 
                />
              )}
              {/* 공사 중 화면 */}
              {!['home', 'dashboard', 'meetings'].includes(currentView) && (
                <div style={{ padding: '50px', textAlign: 'center', color: '#717785' }}>
                  <h1>🚧 {currentView} 화면 공사 중! 🚧</h1>
                </div>
              )}
            </div>
          </div>

          <NewTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <NewMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} />
        </div>
      } />
    </Routes>
  );
}

export default App;