import React from 'react';
import { ChatInterface } from './ChatInterface';

export const ChatContainer: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] w-[calc(100vw-2rem)] md:w-[450px]">
      <ChatInterface />
    </div>
  );
};
