// components/ui/ToggleBtn.js
import React from 'react';
import IconBtn from './IconBtn';

export default function ToggleBtn({ 
  onClick, 
  on, 
  onIcon: OnIcon, 
  offIcon: OffIcon, 
  label 
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <IconBtn onClick={onClick} active={on} title={label}>
        {on ? <OnIcon size={22} /> : <OffIcon size={22} />}
      </IconBtn>
      <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400">
        {label}
      </span>
    </div>
  );
}