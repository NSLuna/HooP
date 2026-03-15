import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ icon, title, desc }) => (
  <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
    <span style={{ fontSize: '16px' }}>{icon}</span>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '13px' }}>{title}</div>
      {desc && <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '2px' }}>{desc}</div>}
    </div>
    <span style={{ color: 'var(--ink-4)', fontSize: '10px' }}>▶</span>
  </div>
);

function Topbar({ user, onOpenModal, currentView, isDark, toggleTheme }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const titles = { home: '홈', dashboard: '대시보드', schedule: '일정표', meetings: '회의록', search: '검색' };

  return (
    <header className="topbar" style={{ 
      background: 'var(--surface)', borderBottom: '1px solid var(--border)', 
      position: 'sticky', top: 0, zIndex: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
      padding: '0 32px', height: '60px', width: '100%', boxSizing: 'border-box'
    }}>
      <div className="left" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <span style={{ color: 'var(--ink-3)', fontSize: '18px' }}>☰</span>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--ink)', fontFamily: 'DM Sans, sans-serif' }}>
          {titles[currentView] || '프로젝트'}
        </h2>
      </div>



      {/* 3. 오른쪽 구역 */}
      <div className="actions" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>

      <div className="search-bar" style={{ position: 'relative', width: '240px' }}>
          <input type="text" placeholder="검색..." style={{ 
            padding: '8px 16px 8px 36px', borderRadius: '12px', border: '1px solid var(--border)',
            background: 'var(--canvas)', color: 'var(--ink)', fontSize: '13px', outline: 'none',
            width: '100%', boxSizing: 'border-box'
          }} />
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)' }}>⊙</span>
        </div>


        <div onClick={toggleTheme} style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'center', width: '70px', 
          padding: '5px 0', borderRadius: '20px', background: 'var(--surface-2)', 
          border: '1px solid var(--border)', cursor: 'pointer', boxSizing: 'border-box'
        }}>
          <span style={{ fontSize: '12px', color: 'var(--ink-3)', fontWeight: 'bold' }}>{isDark ? '다크' : '라이트'}</span>
        </div>

        <div style={{ display: 'flex', gap: '12px', color: 'var(--ink-3)', fontSize: '18px', position: 'relative'}}>
          <span style={{ cursor: 'pointer' }}>🔔</span>
          <span style={{ cursor: 'pointer' }} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>⚙️</span>
          
          {isDropdownOpen && (
            <div style={{
              position: 'absolute', top: '35px', right: '0', width: '260px', 
              background: 'var(--surface)', borderRadius: '16px', 
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid var(--border)',
              overflow: 'hidden', zIndex: 100
            }}>
               <div style={{ background: '#222631', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {user?.name?.slice(-2) || '유저'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{user?.name || '사용자'}</div>
                  <div style={{ fontSize: '11px', color: '#a8adb8' }}>{user?.role || '방문자'} · Hoop</div>
                </div>
              </div>
              <div style={{ padding: '8px 0' }}>
                <div style={{ padding: '4px 16px', fontSize: '11px', fontWeight: 'bold', color: 'var(--ink-4)' }}>계정</div>
                <MenuItem icon="👤" title="프로필 편집" desc="이름, 사진, 직책 변경" />
                <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '4px 16px' }}/>
                <div style={{ padding: '4px 16px', fontSize: '11px', fontWeight: 'bold', color: 'var(--ink-4)' }}>환경설정</div>
                <MenuItem icon="🔔" title="알림 설정" desc="알림 유형 및 수신 방식" />
                <MenuItem icon="🌐" title="언어 / 지역" desc="한국어 · KST (UTC+9)" />
                <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '4px 16px' }}/>
                <div style={{ padding: '4px 16px', fontSize: '11px', fontWeight: 'bold', color: 'var(--ink-4)' }}>워크스페이스</div>
                <MenuItem icon="🏢" title="워크스페이스 설정" desc="팀 이름, 멤버 관리" />
                <MenuItem icon="🔗" title="연동 앱" desc="Google, Slack, Zoom 등" />
                <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '4px 16px' }}/>
                <MenuItem icon="❓" title="도움말 & 피드백" />
              </div>
            </div>
          )}
        </div>

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