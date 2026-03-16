import React, { useState } from 'react';

function EditProfileModal({ isOpen, onClose, user, onSave }) {
  const [name, setName] = useState(user?.name || '');
  const [engName, setEngName] = useState(''); 
  const [role, setRole] = useState(user?.role || ''); 
  const [email, setEmail] = useState(user?.email || ''); 
  const [bio, setBio] = useState(user?.bio || ''); 
  
  const [nameError, setNameError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); 

  if (!isOpen) return null;

  const profileText = name ? name.slice(-2) : 'User';

  const handleSaveClick = () => {
    if (!name.trim()) { 
      setNameError(true); 
      return; 
    }
    setNameError(false);
    
    setIsSuccess(true);
    
    setTimeout(() => {
      setIsSuccess(false); 
      onSave({ name, engName, role, bio }); 
    }, 1500);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* 1. 모달 헤더 */}
        <div style={headerStyle}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', color: '#333' }}>프로필 편집</h2>
            <p style={{ margin: '5px 0 0', fontSize: '13px', color: '#888' }}>이름, 직책, 소개를 수정하세요</p>
          </div>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
        </div>

        {/* 2. 프로필 사진 영역 */}
        <div style={profileBoxStyle}>
          <div style={profileCircleStyle}>{profileText}</div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>프로필 사진</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={btnOutlineStyle}>사진 변경</button>
              <button style={btnDangerStyle}>삭제</button>
            </div>
          </div>
        </div>

        {/* 3. 입력 폼 영역 */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', padding: '0 24px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>이름 <span style={{color: '#ef4444'}}>*</span></label>
            <input 
              value={name} 
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) setNameError(false);
              }} 
              style={{...inputStyle, borderColor: nameError ? '#ef4444' : '#d1d5db'}} 
            />
            {nameError && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>이름을 입력해주세요!</div>}
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>영문 이름</label>
            <input value={engName} onChange={(e) => setEngName(e.target.value)} style={inputStyle} />
          </div>
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>직책</label>
          <input value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle} />
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>이메일</label>
          <input value={email} readOnly style={{...inputStyle, backgroundColor: '#f9fafb', color: '#6b7280'}} />
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>한 줄 소개</label>
          <input value={bio} onChange={(e) => setBio(e.target.value)} style={inputStyle} />
        </div>

        {/* 4. 모달 푸터 */}
        <div style={footerStyle}>
          {isSuccess ? (
            <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '14px', padding: '8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✨</span> 프로필 저장 성공!
            </div>
          ) : (
            <>
              <button onClick={onClose} style={cancelBtnStyle}>취소</button>
              <button onClick={handleSaveClick} style={saveBtnStyle}>저장</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// 스타일들 모음
const overlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalStyle = { background: 'white', borderRadius: '12px', width: '500px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', overflow: 'hidden' };
const headerStyle = { padding: '24px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' };
const closeBtnStyle = { background: 'transparent', border: 'none', fontSize: '20px', color: '#aaa', cursor: 'pointer', padding: '4px' };
const profileBoxStyle = { margin: '24px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #f3f4f6' };
const profileCircleStyle = { width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' };
const btnOutlineStyle = { padding: '6px 12px', border: '1px solid #333', background: 'white', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' };
const btnDangerStyle = { padding: '6px 12px', border: '1px solid #fee2e2', background: '#fef2f2', color: '#ef4444', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' };
const inputGroup = { marginBottom: '16px', padding: '0 24px' };
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' };
const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: '14px', outline: 'none' };
const footerStyle = { padding: '16px 24px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: '12px', backgroundColor: '#f9fafb' };
const cancelBtnStyle = { padding: '8px 16px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', color: '#374151' };
const saveBtnStyle = { padding: '8px 24px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' };

export default EditProfileModal;