import React from 'react';

function FormatDateTime({ isoDateString }) {
  const date = new Date(isoDateString);

  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' }); // Use 'short' for half month names
  const day = String(date.getDate()).padStart(2, '0');

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const adjustedHours = hours % 12 || 12;

  return (
    <div className='d-flex gap-1'>
      <small>{`${month}-${day}-${year}`}</small>
      <small>at</small>
      <small>{`${adjustedHours}:${minutes} ${amPm}`}</small>
    </div>
  );
}

export default FormatDateTime;