function Sidebar() {
  const menuItems = [
    { icon: '🏠', label: '홈' },
    { icon: '📊', label: '대시보드' },
    { icon: '📅', label: '일정표' }
  ];

  return (
    <nav style={{ width: '240px', background: 'var(--ink)', color: 'white', height: '100vh', padding: '24px 16px' }}>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', marginBottom: '40px', color: 'var(--accent)' }}>
        Hoop
      </div>
      
      <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginBottom: '12px', letterSpacing: '1px' }}>메인</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
        {menuItems.map(item => (
          <li key={item.label} style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '12px' }}>
            <span>{item.icon}</span> {item.label}
          </li>
        ))}
      </ul>

      <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginBottom: '12px', letterSpacing: '1px' }}>프로젝트</div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ padding: '10px 12px', color: 'var(--ink-4)' }}>🔵 앱 리뉴얼</li>
      </ul>
    </nav>
  );
}
export default Sidebar;