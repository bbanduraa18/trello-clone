'use client';

import { ElementRef, useRef, useState } from 'react';

import { ListWithCards } from '@/types';

import ListHeader from './list-header';
import CardForm from './card-form';

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

const ListItem = ({ data, index }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<'textarea'>>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} onAddCard={enableEditing} />

        <CardForm
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
          listId={data.id}
          boardId={data.boardId}
        />
      </div>
    </li>
  );
};

export default ListItem;
