import React from 'react';

const Modal = ({ isOpen, onClose, onLogin, onSignup }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <p className="mb-4">You need to log in to access this feature.</p>
        <div className="flex justify-between gap-4">
          <button onClick={onLogin} className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
          <button onClick={onSignup} className="bg-green-500 text-white py-2 px-4 rounded">Signup</button>
          <button onClick={onClose} className="bg-gray-300 text-black py-2 px-4 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
