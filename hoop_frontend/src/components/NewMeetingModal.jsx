import React, { useState, useEffect } from 'react';

function NewMeetingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  
  // 오늘 날짜 기본값 세팅!
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  
  const [location, setLocation] = useState('');
  const [agendas, setAgendas] = useState([]);
  const [currentAgenda, setCurrentAgenda] = useState('');
  const [content, setContent] = useState('');

  // 오늘 이전 날짜인지 체크
  const isPastDate = date !== '' && date < today;

  useEffect(() => {
    if (isOpen) setStep(1);
  }, [isOpen]);

  if (!isOpen) return null;

  const addAgenda = () => {
    if (currentAgenda.trim()) {
      setAgendas([...agendas, currentAgenda.trim()]);
      setCurrentAgenda('');
    }
  };

  const removeAgenda = (index) => {
    setAgendas(agendas.filter((_, i) => i !== index));
  };

  const inputBaseStyle = {
    width: '100%', padding: '8px 12px', border: '1.5px solid var(--border)',
    borderRadius: '10px', fontSize: '13px', outline: 'none', background: 'var(--surface)',
    boxSizing: 'border-box', color: 'var(--ink)'
  };

  const btnBaseStyle = {
    padding: '8px 16px', borderRadius: '10px', fontSize: '13px', 
    fontWeight: 600, cursor: 'pointer', border: '1.5px solid var(--border)'
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(13,15,19,.45)', 
      backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', 
      alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: 'var(--surface)', borderRadius: '20px', width: '480px',
        maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 8px 40px rgba(0,0,0,.18)',
        animation: 'modalIn .2s ease'
      }}>
        {/* 헤더 */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: '16px', fontWeight: 600 }}>
            {step === 1 ? '✦ 새 회의록 작성' : '🎉 저장 완료!'}
          </div>
          <button onClick={onClose} style={{ width: '24px', height: '24px', borderRadius: '6px', border: 'none', background: 'var(--surface-2)', cursor: 'pointer', color: 'var(--ink-3)' }}>✕</button>
        </div>

        {/* 바디 */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {step === 1 ? (
            <>
              <input type="text" placeholder="회의 제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)}
                style={{ ...inputBaseStyle, border: 'none', borderBottom: '2px solid var(--border)', borderRadius: 0, padding: '8px 0', fontSize: '15px', fontWeight: 600 }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-3)' }}>날짜</label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    max="9999-12-31"
                    style={{ ...inputBaseStyle, border: isPastDate ? '1.5px solid var(--red)' : '1.5px solid var(--border)' }} 
                  />
                  {/*  날짜 경고! */}
                  {isPastDate && (
                    <div style={{ color: 'var(--red)', fontSize: '10px', marginTop: '2px', fontWeight: 500 }}>
                      이전 날짜로는 회의를 만들 수 없어요!
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-3)' }}>장소/링크</label>
                  <input type="text" placeholder="회의 장소" value={location} onChange={(e) => setLocation(e.target.value)} style={inputBaseStyle} />
                </div>
              </div>

              {/* 안건 섹션 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-3)' }}>안건</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: agendas.length > 0 ? '5px' : '0' }}>
                  {agendas.map((item, index) => (
                    <div key={index} style={{ padding: '8px 12px', background: 'var(--surface-2)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '12.5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{index + 1}. {item}</span>
                      <button onClick={() => removeAgenda(index)} style={{ border: 'none', background: 'transparent', color: 'var(--ink-4)', cursor: 'pointer', fontSize: '12px' }}>✕</button>
                    </div>
                  ))}
                </div>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input type="text" placeholder="안건 추가..." value={currentAgenda} onChange={(e) => setCurrentAgenda(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addAgenda()} style={{ ...inputBaseStyle, paddingRight: '70px' }} />
                  <button onClick={addAgenda} style={{ position: 'absolute', right: '6px', zIndex: 1, padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--surface)', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}>+ 추가</button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-3)' }}>회의록 내용</label>
                <textarea placeholder="회의 내용을 입력하세요" rows="4" value={content} onChange={(e) => setContent(e.target.value)} style={{ ...inputBaseStyle, resize: 'none', lineHeight: '1.6' }} />
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>📝✨</div>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 'bold' }}>새로운 회의록이 기록되었어요!</h3>
              <p style={{ color: 'var(--ink-3)', fontSize: '13px', marginTop: '8px' }}>리스트에서 확인해 보세요.</p>
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          {step === 1 ? (
            <>
              {/* 1. 임시저장 */}
              <button style={{ ...btnBaseStyle, background: 'var(--surface-2)', color: 'var(--ink-2)' }}>
                임시저장
              </button>
              {/* 2. 취소 */}
              <button onClick={onClose} style={{ ...btnBaseStyle, background: 'transparent', color: 'var(--ink-3)' }}>
                취소
              </button>
              {/* 3. 저장하기 (비활성화 시에도 잘 보이게!) */}
              <button 
                onClick={() => setStep(2)} 
                disabled={isPastDate || !title}
                style={{ 
                  ...btnBaseStyle, border: 'none',
                  background: (isPastDate || !title) ? '#F1F3F5' : 'var(--accent)', 
                  color: (isPastDate || !title) ? '#ADB5BD' : 'white', 
                  cursor: (isPastDate || !title) ? 'not-allowed' : 'pointer'
                }}
              >
                저장하기
              </button>
            </>
          ) : (
            <button onClick={onClose} style={{ ...btnBaseStyle, border: 'none', background: 'var(--accent)', color: 'white', padding: '8px 24px' }}>
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewMeetingModal;