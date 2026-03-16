import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserDropdown from './UserDropdown';

function Topbar({ user, onOpenModal, onOpenProfileModal, currentView, isDark, toggleTheme }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const titles = { home: '홈', dashboard: '대시보드', schedule: '일정표', meetings: '회의록', search: '검색' };

  return (
    <header className="topbar" style={{ 
      background: 'var(--surface)', borderBottom: '1px solid var(--border)', 
      position: 'sticky', top: 0, zIndex: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
      padding: '0 32px', height: '60px', width: '100%', boxSizing: 'border-box'
    }}>
      {/* 1. 왼쪽 구역 */}
      <div className="left" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <span style={{ color: 'var(--ink-3)', fontSize: '18px' }}>☰</span>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--ink)', fontFamily: 'DM Sans, sans-serif' }}>
          {titles[currentView] || '프로젝트'}
        </h2>
      </div>

      {/* 2. 오른쪽 구역 */}
      <div className="actions" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
        
        {/* 검색바 */}
        <div className="search-bar" style={{ position: 'relative', width: '240px' }}>
          <input type="text" placeholder="검색..." style={{ 
            padding: '8px 16px 8px 36px', borderRadius: '12px', border: '1px solid var(--border)',
            background: 'var(--canvas)', color: 'var(--ink)', fontSize: '13px', outline: 'none',
            width: '100%', boxSizing: 'border-box'
          }} />
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)' }}>⊙</span>
        </div>

        {/* 테마 토글 */}
        <div onClick={toggleTheme} style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'center', width: '70px', 
          padding: '5px 0', borderRadius: '20px', background: 'var(--surface-2)', 
          border: '1px solid var(--border)', cursor: 'pointer', boxSizing: 'border-box'
        }}>
          <span style={{ fontSize: '12px', color: 'var(--ink-3)', fontWeight: 'bold' }}>{isDark ? '다크' : '라이트'}</span>
        </div>

        {/* 설정 드롭다운 구역 */}
        <div style={{ display: 'flex', gap: '12px', color: 'var(--ink-3)', fontSize: '18px', position: 'relative'}}>
          <span style={{ cursor: 'pointer' }}>🔔</span>
          <span style={{ cursor: 'pointer' }} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>⚙️</span>
          
          {isDropdownOpen && (
            <UserDropdown 
              user={user} 
              onClose={() => setIsDropdownOpen(false)}
              onOpenProfileModal={onOpenProfileModal} 
            />
          )}
        </div>

        {/* 버튼들 */}
        <button onClick={onOpenModal} style={{
          background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '10px', 
          padding: '8px 16px', fontWeight: 600, fontSize: '13px', cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(37, 99, 255, 0.15)',
          whiteSpace: 'nowrap'
        }}>
          + 새 업무 추가
        </button>

        <Link to="/admin" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'var(--bg-sidebar)', color: 'white', border: '1px solid var(--border)', borderRadius: '10px', 
            padding: '8px 16px', fontWeight: 600, fontSize: '13px', cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}>
            ⚙️ 관리자
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Topbar;