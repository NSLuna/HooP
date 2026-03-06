function Topbar({ onOpenModal }) {
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
        
        <div style={{ display: 'flex', gap: '12px', color: 'var(--ink-3)', fontSize: '18px', cursor: 'pointer' }}>
          <span>🔔</span>
          <span>⚙️</span>
        </div>

        <button onClick={onOpenModal}
        style={{ 
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
          + 새 업무 추가
        </button>
      </div>
    </header>
  );
}

export default Topbar;