function PopUp({ onClose, onConfirm, children, clickPosition }) {
    const popupStyle = {
        position: 'absolute',
        left: `${clickPosition.x}px`,
        top: `${clickPosition.y}px`,
        // Additional styles for visibility, etc.
    }
    return (
        <div className="popup-overlay" style={popupStyle}>
            <div className="popup-content">
                {children}
                <button onClick={onConfirm}>Check</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default PopUp;