import React from 'react';
import { ChatInterface } from './ChatInterface';

export const ChatContainer: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] w-[calc(100vw-4rem)] md:w-[450px]">
      <ChatInterface />
    </div>
  );
};
