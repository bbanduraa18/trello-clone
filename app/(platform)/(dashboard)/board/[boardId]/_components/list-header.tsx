'use client';

import { useState, useRef, ElementRef } from 'react';

import { useEventListener } from 'usehooks-ts';
import FormInput from '@/components/form/form-input';

import { List } from '@prisma/client';

interface ListHeaderProps {
  data: List;
}

const ListHeader = ({ data }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener('keydown', onKeyDown);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form ref={formRef} className="flex-1 px-[2px]">
          <input hidden id="id" name="id" value={data.id} readOnly />
          <input
            hidden
            id="BoardId"
            name="BoardId"
            value={data.boardId}
            readOnly
          />
          <FormInput
            ref={inputRef}
            onBlur={() => {}}
            id="title"
            placeholder="Enter list title"
            defaultValue={title}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {title}
        </div>
      )}
    </div>
  );
};

export default ListHeader;