import React, { useState } from 'react';

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

function Topbar({ user, onOpenModal }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <header style={{ 
      height: '60px', 
      background: 'var(--surface)', 
      borderBottom: '1px solid var(--border)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: 'var(--ink-3)', fontSize: '18px' }}>☰</span>
        <h2 style={{ 
          margin: 0, 
          fontSize: '16px', 
          fontWeight: 600, 
          color: 'var(--ink)',
          fontFamily: 'DM Sans, sans-serif'
        }}>홈</h2>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative' }}>
          <input type="text" placeholder="검색..." style={{ 
            padding: '8px 16px 8px 36px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            background: 'var(--canvas)',
            fontSize: '13px',
            width: '240px',
            outline: 'none'
          }} />
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)' }}></span>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', color: 'var(--ink-3)', fontSize: '18px'}}>
          <span style={{ cursor: 'pointer' }}>🔔</span>
          <span style={{ cursor: 'pointer' }} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>⚙️</span>
          {isDropdownOpen && (
            <div style={{
              position: 'absolute', top: '35px', right: '0', width: '260px', 
              background: 'var(--surface)', borderRadius: '16px', 
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid var(--border)',
              overflow: 'hidden', zIndex: 100
            }}>
              {/* 계정 프로필 헤더 */}
               <div style={{ background: '#222631', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {/* 이름의 앞 두 글자만 */}
                  {user?.name?.slice(-2) || '유저'}
                </div>
                <div style={{ flex: 1 }}>
                  {/* 진짜 유저 이름이랑 직책! */}
                  <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{user?.name || '사용자'}</div>
                  <div style={{ fontSize: '11px', color: '#a8adb8' }}>{user?.role || '방문자'} · Hoop</div>
                </div>
              </div>
              {/* 메뉴 리스트들 */}
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

        
        
        <a 
          href="http://127.0.0.1:8000/admin/" // 👈 장고 관리자 페이지 주소!
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >

        <button style={{
          background: 'var(--accent)', 
          color: 'white', 
          border: 'none', 
          borderRadius: '10px', 
          padding: '8px 16px',
          fontWeight: 600,
          fontSize: '13px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(37, 99, 255, 0.15)'
        }}>
          관리자 페이지
        
        </button>
        </a>
      </div>
    </header>
  );
}

export default Topbar;