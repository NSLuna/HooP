import React, { useState } from 'react';

function NewTaskModal({ isOpen, onClose }) {
  const [priority, setPriority] = useState('중간');

  if (!isOpen) return null;

  const priorityStyle = {
    '낮음': { color: 'var(--green)', bg: 'var(--green-light)' },
    '중간': { color: 'var(--amber)', bg: 'var(--amber-light)' },
    '높음': { color: 'var(--red)', bg: 'var(--red-light)' }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(13,15,19,.45)', 
      backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', 
      alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: 'var(--surface)', borderRadius: '22px', width: '540px',
        boxShadow: '0 8px 40px rgba(0,0,0,.18)', overflow: 'hidden'
      }}>
        {/* 1. 헤더 */}
        <div style={{ padding: '20px 22px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: '18px', fontWeight: 400 }}>새 업무 만들기</div>
          <button onClick={onClose} style={{ width: '28px', height: '28px', borderRadius: '6px', border: 'none', 
            background: 'var(--surface-2)', cursor: 'pointer', fontSize: '14px', color: 'var(--ink-3)' }}>✕</button>
        </div>

        {/* 2. 바디 */}
        <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="업무 제목을 입력하세요" 
            style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '2px solid var(--border)', fontSize: '15px', 
            fontWeight: 500, outline: 'none', background: 'transparent' }} />
          
          <textarea placeholder="업무 설명 (선택)" rows="3" 
            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '13px', 
            outline: 'none', resize: 'none', lineHeight: '1.6' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--ink-3)', marginBottom: '5px' }}>프로젝트</label>
              <select style={{ width: '100%', padding: '8px 10px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '13px', 
                background: 'var(--surface)', outline: 'none' }}>
                <option>프로젝트 선택</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--ink-3)', marginBottom: '5px' }}>상태</label>
              <select style={{ width: '100%', padding: '8px 10px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '13px', 
                background: 'var(--surface)', outline: 'none' }}>
                <option>대기</option>
                <option>진행중</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--ink-3)', marginBottom: '5px' }}>담당자</label>
              <select style={{ width: '100%', padding: '8px 10px', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '13px', 
                background: 'var(--surface)', outline: 'none' }}>
                <option>담당자 선택</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--ink-3)', marginBottom: '5px' }}>우선순위</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['낮음', '중간', '높음'].map(p => {
                  const isSelected = p === priority;
                  const activeColor = priorityStyle[p].color;
                  const activeBg = priorityStyle[p].bg;

                  return (
                    <div 
                      key={p} 
                      onClick={() => setPriority(p)}
                      style={{ 
                        flex: 1, 
                        padding: '7px 0', 
                        border: isSelected ? `1.5px solid ${activeColor}` : '1.5px solid var(--border)', 
                        borderRadius: '6px', 
                        textAlign: 'center', 
                        fontSize: '12px', 
                        color: isSelected ? activeColor : 'var(--ink-3)', 
                        background: isSelected ? activeBg : 'transparent', 
                        fontWeight: isSelected ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}>
                      {p}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 3. 푸터 */}
        <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ padding: '6px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>📎</div>
            <div style={{ padding: '6px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>🔁</div>
            <div style={{ padding: '6px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>🔔</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={onClose} style={{ padding: '8px 16px', border: '1px solid var(--border)', borderRadius: '10px', background: 'transparent', 
                fontSize: '13px', cursor: 'pointer' }}>취소</button>
            <button style={{ padding: '8px 16px', border: 'none', borderRadius: '10px', background: 'var(--accent)', color: 'white',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>업무 추가</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTaskModal;