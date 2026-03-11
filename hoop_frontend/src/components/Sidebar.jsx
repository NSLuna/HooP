// src/components/Sidebar.jsx
import React from 'react';

function Sidebar({ currentView, setCurrentView, projects = [], onOpenModal }) {
  const menuItems = [
    { id: 'home', icon: '🏠', label: '홈' },
    { id: 'dashboard', icon: '📊', label: '대시보드' },
    { id: 'schedule', icon: '📅', label: '일정표' },
    { id: 'meetings', icon: '📝', label: '회의록' } 
  ];

  return (
    <nav style={{ width: '240px', background: 'var(--ink)', color: 'white', height: '100vh', padding: '24px 16px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', marginBottom: '40px', color: 'var(--accent)', padding: '0 12px' }}>
        Hoop
      </div>
      
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginBottom: '12px', letterSpacing: '1px', padding: '0 12px' }}>메인</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
          {menuItems.map(item => (
            <li 
              key={item.id} 
              onClick={() => setCurrentView(item.id)} 
              style={{ 
                padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '12px',
                background: currentView === item.id ? 'rgba(37,99,255,0.15)' : 'transparent',
                color: currentView === item.id ? 'var(--accent)' : 'var(--ink-4)',
                fontWeight: currentView === item.id ? '600' : '400', transition: 'all 0.2s'
              }}
            >
              <span>{item.icon}</span> {item.label}
            </li>
          ))}
        </ul>

        <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginBottom: '12px', letterSpacing: '1px', padding: '0 12px' }}>프로젝트</div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          
          {/* 👶 가짜 글자 대신 진짜 프로젝트 데이터가 여기서 반복해서 예쁘게 나와요! */}
          {projects.map(proj => (
            <li 
              key={proj.id}
              // 프로젝트를 누르면 'project-1' 같은 이름으로 스위치가 켜져요!
              onClick={() => setCurrentView(`project-${proj.id}`)}
              style={{ 
                padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center',
                color: currentView === `project-${proj.id}` ? 'var(--accent)' : 'var(--ink-4)',
                background: currentView === `project-${proj.id}` ? 'rgba(37,99,255,0.15)' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '10px' }}>{proj.icon || '🔵'}</span> {proj.title}
            </li>
          ))}

          {/* ✨ 루나가 원했던 항상 떠 있는 '새 프로젝트 추가' 버튼! */}
          <li 
            onClick={onOpenModal}
            style={{ 
              padding: '10px 12px', borderRadius: '8px', cursor: 'pointer',
              color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: '10px',
              transition: 'all 0.2s', marginTop: '4px', fontSize: '13px'
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>+</span> 새 프로젝트
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;