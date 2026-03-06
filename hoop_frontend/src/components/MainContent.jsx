import React from 'react';

// 1. 통계 카드 부품 (설계도 스타일)
const StatCard = ({ icon, value, label, change }) => (
  <div style={{ 
    background: 'var(--surface)', borderRadius: '24px', padding: '20px',
    border: '1px solid var(--border)', boxShadow: 'var(--sh)', position: 'relative', overflow: 'hidden'
  }}>
    <div style={{ fontSize: '20px', marginBottom: '12px' }}>{icon}</div>
    <div style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-1px' }}>{value}</div>
    <div style={{ fontSize: '13px', color: 'var(--ink-3)' }}>{label}</div>
    <div style={{ 
      fontSize: '11px', marginTop: '8px', padding: '2px 8px', borderRadius: '20px',
      display: 'inline-block', background: 'var(--green-light)', color: 'var(--green)' 
    }}>
      {change}
    </div>
  </div>
);

function MainContent({ userName, tasks }) {
  // 2. 실시간 계산하기 
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === '완료').length;
  const inProgressTasks = tasks.filter(t => t.status === '진행중').length;
  const overDueTasks = tasks.filter(t => t.status === '기한초과').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // 3. 프로젝트별 진행률 계산 (연습용으로 프로젝트 필터링!)
  const appTasks = tasks.filter(t => t.project === '앱 리뉴얼');
  const appProg = appTasks.length > 0 ? Math.round((appTasks.filter(t => t.status === '완료').length / appTasks.length) * 100) : 72; // 데이터 없을땐 임시값!

  return (
    <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto', background: 'var(--canvas)' }}>
      {/* (1) 환영 인사 */}
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '32px', fontWeight: 400, margin: '0 0 8px 0' }}>
          안녕하세요, {userName || '방문자'}님 👋
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: '15px' }}>
          오늘 처리해야 할 업무 <strong>{totalTasks}개</strong>가 있어요. ✨
        </p>
      </header>

      {/* (2) 실시간 통계 카드 영역 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <StatCard icon="📋" value={inProgressTasks} label="진행중 업무" change="실시간 데이터" />
        <StatCard icon="✅" value={`${completionRate}%`} label="완료율" change={`성공적으로 진행 중!`} />
        <StatCard icon="⚠️" value={overDueTasks} label="기한 초과" change="체크해볼까요?" />
        <StatCard icon="🗓️" value="5" label="오늘 일정" change="회의 2건 포함" />
      </div>

      {/* (3) 메인 리스트와 현황판 (좌우 배치) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
        
        {/* 왼쪽: 업무 리스트 카드 */}
        <section style={{ 
          background: 'var(--surface)', borderRadius: '24px', padding: '24px', 
          border: '1px solid var(--border)', boxShadow: 'var(--sh)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600 }}>내 업무</h3>
            <span style={{ color: 'var(--accent)', fontSize: '13px', cursor: 'pointer' }}>모두 보기 →</span>
          </div>

          {tasks.map(task => (
            <div key={task.id} style={{ padding: '16px 0', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--border-2)' }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{task.title}</div>
                <span style={{ fontSize: '11px', color: 'var(--accent)', background: 'var(--accent-light)', padding: '2px 8px', borderRadius: '20px' }}>
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* 오른쪽: 프로젝트 현황판 */}
        <aside style={{ 
          background: 'var(--surface)', borderRadius: '24px', padding: '24px', 
          border: '1px solid var(--border)', height: 'fit-content', boxShadow: 'var(--sh)'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>프로젝트 현황</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span>앱 리뉴얼</span>
                <span>{appProg}%</span>
              </div>
              <div style={{ height: '6px', background: 'var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${appProg}%`, height: '100%', background: 'var(--accent)' }}></div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default MainContent;