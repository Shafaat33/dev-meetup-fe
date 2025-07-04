import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { SendHorizonal } from 'lucide-react';

const ChatPage = () => {
  const { chatId } = useParams();
  const location = useLocation();
  const user = useSelector((store) => store.user.user);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { firstName, _id } = user;
  const { receiverName, photo } = location.state;
  
  const fetchChatMessages = async () => {
    setIsLoading(true);
    const chat = await axios.get(BASE_URL + '/chat/' + chatId, { withCredentials: true });
    
    const chatMessages = chat?.data?.messages?.map((message) => {
      return {
        firstName: message.senderId.firstName,
        lastName: message.senderId.lastName,
        text: message.text,
      }
    });
    setMessages(chatMessages);
    setIsLoading(false);
  };
  
  useEffect(() => {
    fetchChatMessages();
  }, []);
  
  useEffect(() => {
    if (!user?._id) return;
    const socket = createSocketConnection();
    socket.emit('joinChat', { userId: _id, chatId });
    
    socket.on('messageReceived', ({ firstName, text }) => {
      setMessages((prevMessages) => [...prevMessages, { text, firstName }]);
    });
  }, [_id, chatId]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    const socket = createSocketConnection();
    socket.emit('sendMessage', { firstName, chatId, userId: _id, text: newMessage });
    setNewMessage('');
  };
  
  return (
    <div className="min-h-200 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-base-200/70 border-b border-gray-200 p-4 gap-6">
        <div className="chat-image avatar gap-4">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={photo}
            />
          </div>
          <h1 className="text-xl font-semibold text-gray-800 gap-2"> { receiverName }</h1>
        </div>
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p>Start a conversation by typing a message below!</p>
          </div>
        )}
        
        {messages?.map((message, key) => (
          <div key={key}>
            <div className={message.firstName === user?.firstName ? 'chat chat-start' : 'chat chat-end'}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                {message?.firstName}
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">{message?.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !newMessage.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <SendHorizonal />
          </button>
        </form>
      </div>
    </div>
  )
};

ChatPage.propTypes = {
  loading: PropTypes.bool,
};

ChatPage.defaultProps = {
  loading: false,
};

export default ChatPage;
