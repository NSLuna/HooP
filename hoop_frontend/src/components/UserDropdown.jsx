import React, { useState } from 'react';

const Divider = () => <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '4px 16px' }} />;

const SectionTitle = ({ children }) => (
  <div style={{ padding: '8px 16px 4px', fontSize: '11px', fontWeight: 'bold', color: 'var(--ink-4)', textTransform: 'uppercase' }}>
    {children}
  </div>
);

const MenuItem = ({ icon, title, desc, onClick }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{ 
        padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.3s ease',
        background: isHover ? 'rgba(99, 102, 241, 0.1)' : 'transparent', borderRadius: '12px', margin: '2px 8px',
        boxShadow: isHover ? '0 4px 12px rgba(0, 0, 0, 0.05)' : 'none'
      }}
    >
      <span style={{ fontSize: '20px', filter: isHover ? 'drop-shadow(0 0 5px var(--accent))' : 'none', transition: 'all 0.2s' }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, color: isHover ? 'var(--accent)' : 'var(--ink)', fontSize: '13px', transition: 'color 0.2s' }}>{title}</div>
        {desc && <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '2px' }}>{desc}</div>}
      </div>
      <span style={{ color: isHover ? 'var(--accent)' : 'var(--ink-4)', fontSize: '10px', transform: isHover ? 'translateX(3px)' : 'translateX(0)', transition: 'all 0.2s' }}>▶</span>
    </div>
  );
};

function UserDropdown({ user, onClose, onOpenProfileModal }) {
  const handleAction = (task) => {
    if (task === '프로필 편집') {
      onOpenProfileModal(); 
    } else {
      console.log(`${task} 실행!`);
    }
    onClose();
  };

  return (
    <div style={{
      position: 'absolute', top: '45px', right: '0', width: '280px', 
      background: 'var(--surface)', borderRadius: '16px', 
      boxShadow: '0 8px 32px rgba(0,0,0,0.15)', border: '1px solid var(--border)',
      overflow: 'hidden', zIndex: 100, textAlign: 'left'
    }}>
      <div style={{ background: '#222631', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
        <div style={{ 
          width: '40px', height: '40px', borderRadius: '50%', 
          background: 'linear-gradient(135deg, #6366f1, #a855f7)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' 
        }}>
          {user?.name?.slice(-2) || '사용자'}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{user?.name || '사용자'}</div>
          <div style={{ fontSize: '11px', color: '#a8adb8' }}>{user?.role || '사용자'} · Hoop</div>
        </div>
      </div>

      <div style={{ padding: '8px 0' }}>
        <SectionTitle>계정</SectionTitle>
        <MenuItem icon="👤" title="프로필 편집" desc="이름, 상태 메시지 변경" onClick={() => handleAction('프로필 편집')} />
        <Divider />

        <SectionTitle>환경설정</SectionTitle>
        <MenuItem icon="🔔" title="알림 설정" desc="알림 유형 및 수신 방식" onClick={() => handleAction('알림 설정')} />
        <MenuItem icon="🌐" title="언어 / 지역" desc="한국어 · KST (UTC+9)" onClick={() => handleAction('언어 설정')} />
        <Divider />

        <SectionTitle>워크스페이스</SectionTitle>
        <MenuItem icon="🏢" title="워크스페이스 설정" desc="팀 이름, 멤버 관리" onClick={() => handleAction('워크스페이스 설정')} />
        <MenuItem icon="🔗" title="연동 앱" desc="Google, Slack, Zoom 등" onClick={() => handleAction('연동 앱')} />
        <Divider />

        <MenuItem icon="❓" title="도움말 & 피드백" onClick={() => handleAction('도움말')} />
      </div>
    </div>
  );
}

export default UserDropdown;