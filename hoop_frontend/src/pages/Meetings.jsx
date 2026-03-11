import React, { useState } from 'react';
import NewMeetingModal from '../components/NewMeetingModal';

function Meetings({ meetings = [], upcomingMeetings = [], actionItems = [], onOpenMeetingModal }) {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div style={{ padding: '24px 24px 24px 24px', color: 'var(--ink)' }}>
      
      {/* 1. 상단 탭이랑 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '2px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '3px' }}>
          {['전체', '내 회의', '초안', '완료'].map((tab, idx) => {
            const tabKeys = ['all', 'mine', 'draft', 'done'];
            const isActive = activeTab === tabKeys[idx];
            return (
              <div 
                key={tab}
                onClick={() => setActiveTab(tabKeys[idx])}
                style={{ 
                  padding: '6px 14px', borderRadius: '8px', fontSize: '12.5px', cursor: 'pointer',
                  fontWeight: 500, transition: 'all 0.15s',
                  background: isActive ? 'var(--surface)' : 'transparent',
                  color: isActive ? 'var(--ink)' : 'var(--ink-3)',
                  boxShadow: isActive ? 'var(--sh)' : 'none'
                }}
              >
                {tab}
              </div>
            )
          })}
        </div>
        <button 
          onClick={onOpenMeetingModal} 
          style={{ 
            padding: '8px 16px', background: 'var(--accent)', color: 'white', border: 'none', 
            borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px',
            boxShadow: '0 4px 12px rgba(37, 99, 255, 0.15)'
          }}
        >
          + 새 회의록 작성
        </button>
      </div>

      {/* 2. 레이아웃 (2단 분리) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>
        
        {/* 왼쪽 단: 회의록 리스트 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {meetings.length === 0 && (
             <div style={{ padding: '60px 20px', textAlign: 'center', background: 'var(--surface)', borderRadius: '22px', border: '1px dashed var(--border)' }}>
               <div style={{ fontSize: '30px', marginBottom: '12px' }}>📭</div>
               <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--ink-2)', marginBottom: '8px' }}>아직 작성된 회의록이 없어요!</div>
               <div style={{ fontSize: '13px', color: 'var(--ink-3)' }}>새 회의록 작성 버튼을 눌러보세요.</div>
             </div>
          )}

          {meetings.map((meeting) => (
            <div key={meeting.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '22px', padding: '20px', boxShadow: 'var(--sh)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ padding: '2px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: 'var(--accent-light)', color: 'var(--accent)' }}>{meeting.status || '진행예정'}</span>
                <span style={{ fontSize: '11px', color: 'var(--ink-4)' }}>{meeting.date} · {meeting.time} · {meeting.location}</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{meeting.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6 }}>{meeting.summary}</div>
              
              <div style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
                <button style={{ padding: '5px 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'transparent', fontSize: '12px', cursor: 'pointer' }}>📄 보기</button>
              </div>
            </div>
          ))}
        </div>

        {/* 오른쪽 단: 사이드바 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '22px', padding: '20px', boxShadow: 'var(--sh)' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>다가오는 회의</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {upcomingMeetings.length === 0 && <div style={{ fontSize: '12.5px', color: 'var(--ink-3)' }}>다가오는 일정이 없어요!</div>}
              {upcomingMeetings.map((up, idx) => (
                <div key={idx} style={{ padding: '10px', borderRadius: '10px', background: idx === 0 ? 'var(--accent-light)' : 'var(--surface-2)', borderLeft: `3px solid ${idx === 0 ? 'var(--accent)' : 'var(--border-2)'}` }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: idx === 0 ? 'var(--accent)' : 'var(--ink-3)', marginBottom: '3px' }}>{up.timeLabel}</div>
                  <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '2px' }}>{up.title}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--ink-3)' }}>{up.location}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '22px', padding: '20px', boxShadow: 'var(--sh)' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>미완료 액션아이템</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {actionItems.length === 0 && <div style={{ fontSize: '12.5px', color: 'var(--ink-3)' }}>남은 숙제가 없어요! 👏</div>}
              {actionItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: idx === actionItems.length - 1 ? 'none' : '1px solid var(--border)' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1.5px solid var(--border-2)', flexShrink: 0 }}></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 500 }}>{item.title}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-4)' }}>{item.context}</div>
                  </div>
                  <div style={{ fontSize: '11px', color: item.overdue ? 'var(--red)' : 'var(--ink-4)' }}>{item.dueDate}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Meetings;