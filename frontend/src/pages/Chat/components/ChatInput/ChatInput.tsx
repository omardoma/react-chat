import React, { useState, useRef } from 'react';

import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Input, IconButton } from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    display: 'flex'
  },
  input: {
    flex: 1,
    padding: '0.5rem'
  },
  sendButton: {
    flexShrink: 0
  }
});

interface ChatInputProps {
  sendMessage: (text: string) => void;
  sendOnCtrlEnter: boolean;
}

function ChatInput(props: ChatInputProps): JSX.Element {
  const { formatMessage: f } = useIntl();
  const classes = useStyles();
  const { sendMessage, sendOnCtrlEnter } = props;
  const [text, setText] = useState<string>('');
  const sendButtonEl = useRef<HTMLButtonElement>(null);
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  const handleFormSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText) {
      sendMessage(trimmedText);
      setText('');
    }
  };
  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    if (
      event.key === 'Enter' &&
      ((sendOnCtrlEnter && event.ctrlKey) ||
        !(sendOnCtrlEnter || event.ctrlKey))
    ) {
      event.preventDefault();
      sendButtonEl.current.click();
    }
  };
  return (
    <Paper
      component="form"
      variant="outlined"
      square
      className={classes.root}
      onSubmit={handleFormSubmit}
    >
      <Input
        className={classes.input}
        multiline
        rowsMax={6}
        autoComplete="off"
        autoFocus
        disableUnderline
        placeholder={f({ id: 'chat.chatInput.placeholder' })}
        inputProps={{ 'aria-label': f({ id: 'chat.chatInput.label' }) }}
        name="message"
        value={text}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
      />
      <IconButton
        ref={sendButtonEl}
        type="submit"
        className={classes.sendButton}
        aria-label={f({ id: 'chat.chatInput.sendButton' })}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}

export default ChatInput;
