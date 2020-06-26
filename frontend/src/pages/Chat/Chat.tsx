import React, { useRef, useEffect } from 'react';

import { makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { useTransition, animated } from 'react-spring';

import { ChatInput, ChatMessage } from './components';

import { Message } from '../../shared/types';
import { useGlobalState } from '../../shared/state';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  messages: {
    listStyle: 'none',
    margin: '0',
    padding: '0.75rem',
    flex: '1 1 0',
    overflowX: 'hidden',
    overflowY: 'scroll'
  },
  messageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  emptyMessage: {
    fontWeight: 'bold',
    margin: 'auto'
  },
  inputBox: {
    flexShrink: 0
  }
});

interface ChatProps {
  messages: Message[];
  sendMessage: (text: string) => void;
}

function Chat(props: ChatProps): JSX.Element {
  const { formatMessage: f } = useIntl();
  const classes = useStyles();
  const [state] = useGlobalState();
  const { username, sendOnCtrlEnter, clockFormat } = state.settings;
  const { messages, sendMessage } = props;
  const lastMessageEl = useRef<HTMLLIElement>(null);

  // Scroll to the bottom of the messages on mount and updates
  useEffect(() => {
    if (messages.length) {
      lastMessageEl.current.scrollIntoView();
    }
  }, [messages]);

  const transitions = useTransition(
    messages,
    (message: Message) => message.id,
    {
      config: {
        duration: 300
      },
      from: (message: Message) => ({
        transform:
          message.senderUsername === username
            ? 'translate3d(100%, 0, 0)'
            : 'translate3d(-100%, 0, 0)'
      }),
      enter: { transform: 'translate3d(0, 0, 0)' }
    }
  );

  const animatedMessages = transitions.map(
    ({ item: message, key, props: style }) =>
      message && (
        <animated.li key={key} style={style} className={classes.messageWrapper}>
          <ChatMessage
            message={message}
            isSent={message.senderUsername === username}
            clockFormat={clockFormat}
          />
        </animated.li>
      )
  );

  return (
    <article className={classes.root}>
      {messages.length ? (
        <ol className={classes.messages}>
          {animatedMessages}
          <li ref={lastMessageEl} />
        </ol>
      ) : (
        <p className={classes.emptyMessage}>{f({ id: 'chat.emptyMessage' })}</p>
      )}
      <footer className={classes.inputBox}>
        <ChatInput
          sendMessage={sendMessage}
          sendOnCtrlEnter={sendOnCtrlEnter}
        />
      </footer>
    </article>
  );
}

export default Chat;
