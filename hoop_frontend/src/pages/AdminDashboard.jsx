import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('approvals');

  const pendingUsers = [
    { id: 1, name: '김신입', email: 'newbie@hoop.com', date: '2026-03-16' },
    { id: 2, name: '이열정', email: 'passion@hoop.com', date: '2026-03-15' },
    { id: 3, name: '박테스트', email: 'test@hoop.com', date: '2026-03-14' },
  ];

  return (
    <div className="admin-dashboard" style={{ display: 'flex', height: '100vh', background: 'var(--canvas)' }}>
      
      {/* 🛠️ 관리자 전용 사이드바 */}
      <div style={{ width: '240px', background: 'var(--surface)', borderRight: '1px solid var(--border)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--ink)', marginBottom: '32px', fontFamily: 'DM Sans, sans-serif' }}>
          ⚙️ Hoop Admin
        </div>
        
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <li onClick={() => setActiveTab('approvals')} style={{ 
            padding: '12px 16px', borderRadius: '10px', cursor: 'pointer', fontWeight: activeTab === 'approvals' ? 600 : 400,
            background: activeTab === 'approvals' ? 'var(--accent)' : 'transparent', 
            color: activeTab === 'approvals' ? 'white' : 'var(--ink-3)', transition: 'all 0.2s'
          }}>
            ✋ 가입 승인 대기
          </li>
          <li onClick={() => setActiveTab('users')} style={{ 
            padding: '12px 16px', borderRadius: '10px', cursor: 'pointer', fontWeight: activeTab === 'users' ? 600 : 400,
            background: activeTab === 'users' ? 'var(--accent)' : 'transparent', 
            color: activeTab === 'users' ? 'white' : 'var(--ink-3)', transition: 'all 0.2s'
          }}>
            👥 전체 사용자 관리
          </li>
          <li onClick={() => setActiveTab('stats')} style={{ 
            padding: '12px 16px', borderRadius: '10px', cursor: 'pointer', fontWeight: activeTab === 'stats' ? 600 : 400,
            background: activeTab === 'stats' ? 'var(--accent)' : 'transparent', 
            color: activeTab === 'stats' ? 'white' : 'var(--ink-3)', transition: 'all 0.2s'
          }}>
            📊 시스템 통계
          </li>

          <li style={{ marginTop: 'auto' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '12px 16px', borderRadius: '10px', cursor: 'pointer', fontWeight: 600,
                background: 'var(--canvas)', border: '1px solid var(--border)',
                color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.2s'
              }}>
                🏠 워크스페이스로 복귀
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* 📄 메인 콘텐츠 영역 (루나 코드 그대로!) */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        {activeTab === 'approvals' && (
          <div>
            <h2 style={{ fontSize: '24px', color: 'var(--ink)', marginTop: 0, marginBottom: '24px' }}>가입 승인 대기열</h2>
            
            <div style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--canvas)', borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '16px 24px', color: 'var(--ink-3)', fontSize: '13px', fontWeight: 500 }}>이름</th>
                    <th style={{ padding: '16px 24px', color: 'var(--ink-3)', fontSize: '13px', fontWeight: 500 }}>이메일</th>
                    <th style={{ padding: '16px 24px', color: 'var(--ink-3)', fontSize: '13px', fontWeight: 500 }}>신청일</th>
                    <th style={{ padding: '16px 24px', color: 'var(--ink-3)', fontSize: '13px', fontWeight: 500 }}>승인 관리</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingUsers.map(user => (
                    <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px 24px', color: 'var(--ink)', fontWeight: 600, fontSize: '14px' }}>{user.name}</td>
                      <td style={{ padding: '16px 24px', color: 'var(--ink-2)', fontSize: '14px' }}>{user.email}</td>
                      <td style={{ padding: '16px 24px', color: 'var(--ink-3)', fontSize: '14px' }}>{user.date}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <button style={{ background: '#10b981', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '8px', marginRight: '8px', cursor: 'pointer', fontWeight: 'bold' }}>승인</button>
                        <button style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '5px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>거절</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
          {activeTab === 'users' && (
          <div>
            <h2 style={{ fontSize: '24px', color: 'var(--ink)', marginTop: 0, marginBottom: '24px' }}>전체 사용자 관리</h2>
            
            <div style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--canvas)', borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '16px 24px', color: 'var(--ink-3)', fontSize: '13px', fontWeight: 500 }}>이름 / 이메일</th>
                    <th style={{ padding: '16px 24px', color: 'var(--ink-3)', fontSize: '13px', fontWeight: 500 }}>권한</th>
                    <th style={{ padding: '16px 24px', color: 'var(--ink-3)', fontSize: '13px', fontWeight: 500 }}>상태</th>
                    <th style={{ padding: '16px 24px', color: 'var(--ink-3)', fontSize: '13px', fontWeight: 500 }}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 가짜 사용자 데이터 1 */}
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '14px' }}>김프로</div>
                      <div style={{ color: 'var(--ink-3)', fontSize: '12px', marginTop: '4px' }}>pro@hoop.com</div>
                    </td>
                    <td style={{ padding: '16px 24px', color: 'var(--ink-2)', fontSize: '14px' }}>일반 사용자</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>활성</span>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <button style={{ background: 'transparent', color: 'var(--ink-3)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>권한 변경</button>
                    </td>
                  </tr>
                  {/* 가짜 사용자 데이터 2 */}
                  <tr style={{ borderBottom: 'none' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '14px' }}>최관리</div>
                      <div style={{ color: 'var(--ink-3)', fontSize: '12px', marginTop: '4px' }}>admin@hoop.com</div>
                    </td>
                    <td style={{ padding: '16px 24px', color: '#6366f1', fontSize: '14px', fontWeight: 'bold' }}>관리자</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>활성</span>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <button style={{ background: 'transparent', color: 'var(--ink-3)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>권한 변경</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab !== 'approvals' && activeTab !== 'users' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--ink-3)' }}>
            <span style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</span>
            <h3 style={{ fontSize: '18px', margin: 0 }}>열심히 개발중이에요!</h3>
          </div>
        )}
      </div>

    </div>
  );
}

export default AdminDashboard;