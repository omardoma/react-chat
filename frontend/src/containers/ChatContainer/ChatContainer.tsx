import React, { Suspense, lazy, useRef } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { useImmer } from 'use-immer';
import { useSocket } from 'use-socketio';
import useEventListener from '@use-it/event-listener';
import { CircularProgress } from '@material-ui/core';
import { useIntl } from 'react-intl';

import { useGlobalState } from '../../shared/state';
import { Message } from '../../shared/types';
import { generateId } from '../../shared/utils';

const Chat = lazy(() => import('../../pages/Chat'));
const Settings = lazy(() => import('../../pages/Settings'));

function ChatContainer(): JSX.Element {
  const { formatMessage: f } = useIntl();
  const location = useLocation();
  const blinkingIntervalId = useRef<number>(null); // useRef not useState to persist across re-renders as well as not trigger a re-render when mutating it
  const originalTitle = useRef<string>(document.title); // useRef not useState to persist across re-renders and not be re-evaluated again on each re-render
  const notificationTitle = f({ id: 'newMessage' });
  const [state, dispatch] = useGlobalState();
  const { username } = state.settings;
  const [messages, setMessages] = useImmer<Message[]>([]);

  const blinkTabTitle = (): void => {
    blinkingIntervalId.current = window.setInterval(() => {
      if (document.title === notificationTitle) {
        document.title = originalTitle.current;
      } else {
        document.title = notificationTitle;
      }
    }, 1000);
  };

  const handleWindowFocus = (): void => {
    if (blinkingIntervalId.current) {
      clearInterval(blinkingIntervalId.current);
      blinkingIntervalId.current = null;
      document.title = originalTitle.current;
      if (location.pathname === '/chat') {
        dispatch({ type: 'CLEAR_UNREAD_COUNT' });
      }
    }
  };

  useEventListener('focus', handleWindowFocus);

  const addMessage = (message: Message): void => {
    setMessages((draftMessages) => {
      draftMessages.push(message);
    });
  };

  const handleMessageEvent = (message: Message): void => {
    if (!(location.pathname === '/chat' && document.hasFocus())) {
      dispatch({ type: 'INCREMENT_UNREAD_COUNT' });
    }
    addMessage(message);
    if (!blinkingIntervalId.current) {
      blinkTabTitle();
    }
  };

  const { socket } = useSocket('message', handleMessageEvent);

  const sendMessage = (text: string): void => {
    const message = {
      id: generateId(),
      senderUsername: username,
      content: text,
      createdAt: new Date().toISOString()
    };
    addMessage(message);
    socket.emit('message', message);
  };

  // Routing shouldn't have a Switch to avoid re-rendering the chat component and messages on changing tabs
  return (
    <Suspense fallback={<CircularProgress style={{ margin: 'auto' }} />}>
      <Route path="/chat">
        <Chat messages={messages} sendMessage={sendMessage} />
      </Route>
      <Route path="/settings" component={Settings} />
      <Redirect exact from="/" to="/chat" />
    </Suspense>
  );
}

export default ChatContainer;
