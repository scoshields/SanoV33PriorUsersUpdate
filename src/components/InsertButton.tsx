import React from 'react';
import { Plus } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface InsertButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function InsertButton({ onClick, disabled }: InsertButtonProps) {
  return (
    <Tooltip content="Add text at cursor position">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="p-2 sm:p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed touch-target"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </Tooltip>
  );
}