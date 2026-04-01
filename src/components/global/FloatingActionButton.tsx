import React, { useState } from 'react';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fab-wrapper">
      <input
        id="fabCheckbox"
        type="checkbox"
        className="fab-checkbox"
        checked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)}
      />
      <label className="fab" htmlFor="fabCheckbox">
        <span className="fas fa-circle fab-dots-1"></span>
        <span className="fas fa-circle fab-dots-2"></span>
        <span className="fas fa-circle fab-dots-3"></span>
      </label>
      <div className="fab-wheel">
        <a className="fab-action fab-action-1" onClick={() => alert('Help clicked')}>
          <i className="fas fa-question"></i>
        </a>
        <a className="fab-action fab-action-2" onClick={() => alert('Book clicked')}>
          <i className="fas fa-book"></i>
        </a>
        <a className="fab-action fab-action-3" onClick={() => alert('Contacts clicked')}>
          <i className="fas fa-address-book"></i>
        </a>
        <a className="fab-action fab-action-4" onClick={() => alert('Info clicked')}>
          <i className="fas fa-info"></i>
        </a>
      </div>
    </div>
  );
};

export default FloatingActionButton;
