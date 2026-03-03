
let selectionBox = null;
let startX = 0;
let startY = 0;

function handleMouseDown(event) {
    // Only start selection on left click
    if (event.button !== 0) return;

    // Prevent default drag behavior
    event.preventDefault();

    // Check if the target is part of the selection box itself
    if (selectionBox && event.target === selectionBox) return;

    // Capture starting coordinates
    startX = event.clientX;
    startY = event.clientY;

    // Create the selection box element if it doesn't exist
    if (!selectionBox) {
        selectionBox = document.createElement('div');
        Object.assign(selectionBox.style, {
            position: 'fixed',
            border: '1px solid #000000',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            pointerEvents: 'none', // Allows events to pass through to elements beneath
            boxSizing: 'border-box',
            zIndex: '999999',
        });
        document.body.appendChild(selectionBox);
    }

    // Position and size the box initially
    Object.assign(selectionBox.style, {
        left: `${startX}px`,
        top: `${startY}px`,
        width: '0px',
        height: '0px',
        display: 'block',
    });

    // Add event listeners for moving and releasing
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

function handleMouseMove(event) {
    // Calculate new position and size based on current mouse position
    const currentX = event.clientX;
    const currentY = event.clientY;

    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    const left = Math.min(currentX, startX);
    const top = Math.min(currentY, startY);

    Object.assign(selectionBox.style, {
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`,
    });
}

function handleMouseUp() {
    // Hide the selection box and remove event listeners
    if (selectionBox) {
        selectionBox.style.display = 'none';
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
}

// Attach the initial event listener to the document
document.addEventListener('mousedown', handleMouseDown);