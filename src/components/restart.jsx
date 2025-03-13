import React from 'react';

function ReStart({ onConfirm, onCancel }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h1>Restart</h1>
                <p>Do you want to restart the game?</p>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    );
}

export default ReStart;