import React from 'react';

function Dashboard({ tasks = [] }) {
  
  // (임시로 상태가 없으면 그냥 전체 개수)
  const totalTasks = tasks.length;
  const inProgressCount = tasks.filter(t => t.status === '진행중' || !t.completed).length || totalTasks;
  const doneCount = tasks.filter(t => t.status === '완료' || t.completed).length || 0;
  const urgentCount = tasks.filter(t => t.priority === '높음').length || 0;

  return (
    <div style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--ink)', marginBottom: '24px' }}>
        👋 반가워요, 오늘 업무 현황입니다!
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        
        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: 'var(--ink-3)', marginBottom: '12px', fontWeight: 'bold' }}>🚀 진행 중인 업무</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--accent)' }}>{inProgressCount}</div>
        </div>
        
        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: 'var(--ink-3)', marginBottom: '12px', fontWeight: 'bold' }}>✅ 완료된 업무</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--ink)' }}>{doneCount}</div>
        </div>
        
        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '13px', color: 'var(--ink-3)', marginBottom: '12px', fontWeight: 'bold' }}>⏰ 다가오는 마감일 (높음)</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ef4444' }}>{urgentCount}</div>
        </div>

      </div>

      <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--ink)', marginBottom: '16px' }}>최근 업무</h2>
      <div style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden' }}>
        
        {tasks.length === 0 && (
          <div style={{ padding: '30px', textAlign: 'center', color: 'var(--ink-3)', fontSize: '14px' }}>
            아직 등록된 업무가 없어요! 새 업무를 추가해보세요.
          </div>
        )}

        {tasks.slice(0, 5).map((task, index) => (
          <div key={task.id || index} style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: task.completed ? 'var(--green)' : 'var(--accent)' }}></div>
            
            {/* 진짜 제목! */}
            <span style={{ color: 'var(--ink)', fontWeight: 'bold', fontSize: '14px' }}>
              {task.title || '제목 없는 업무'}
            </span>
            
            {/* 진짜 프로젝트 이름! */}
            <span style={{ fontSize: '12px', color: 'var(--ink-3)', background: 'var(--surface-2)', padding: '4px 8px', borderRadius: '6px' }}>
              {task.project || '프로젝트 미지정'}
            </span>
            
            {/* 진짜 마감일! */}
            <span style={{ marginLeft: 'auto', fontSize: '13px', color: task.completed ? 'var(--ink-3)' : '#ef4444', fontWeight: 'bold' }}>
              {task.due_date || '마감일 없음'}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Dashboard;