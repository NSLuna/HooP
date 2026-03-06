// src/App.jsx 전체적으로 요렇게 바꿔봐! ✨

import { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from './components/Sidebar' 
import Topbar from './components/Topbar'  
import MainContent from './components/MainContent'
import NewTaskModal from './components/NewTaskModal'

function App() {
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState({ name: '루나' })
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tasks/')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="hoop-app" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar onOpenModal={() => setIsModalOpen(true)} />
        <MainContent userName={user.name} tasks={tasks} />
      </div>

      <NewTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}

export default App