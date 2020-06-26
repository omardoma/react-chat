import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { FormattedDate } from 'react-intl';
import { isSameDay } from 'date-fns';

import { Message } from '../../../../shared/types';
import { ClockFormatOption } from '../../../../shared/enums';

const useStyles = makeStyles((theme: Theme) => ({
  timestamp: {
    paddingLeft: '20px',
    paddingRight: '20px',
    alignSelf: ({ isSent }: ChatMessageProps) =>
      isSent ? 'flex-end' : 'flex-start',
    marginTop: 0,
    marginBottom: '0.25rem',
    color: theme.palette.text.hint
  },
  bubble: {
    position: 'relative',
    maxWidth: '50%',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
    marginBottom: '0.5rem',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    alignSelf: ({ isSent }: ChatMessageProps) =>
      isSent ? 'flex-end' : 'flex-start',
    backgroundColor: ({ isSent }: ChatMessageProps) =>
      isSent ? theme.palette.primary.main : theme.palette.grey[400],
    '&.sent::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: '10px',
      width: 0,
      height: 0,
      border: '10px solid transparent',
      borderBottomColor: theme.palette.primary.main,
      borderTop: 0,
      borderRight: 0,
      marginLeft: '-5px',
      marginTop: '-10px'
    },
    '&.received::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '10px',
      width: 0,
      height: 0,
      border: '10px solid transparent',
      borderBottomColor: theme.palette.grey[400],
      borderTop: 0,
      borderLeft: 0,
      marginRight: '-5px',
      marginTop: '-10px'
    },
    '& p': {
      margin: 0
    }
  }
}));

interface ChatMessageProps {
  message: Message;
  isSent: boolean;
  clockFormat: ClockFormatOption;
}

function ChatMessage(props: ChatMessageProps): JSX.Element {
  const classes = useStyles(props);
  const { message, isSent, clockFormat } = props;
  const timestamp = isSameDay ? (
    <FormattedDate
      value={message.createdAt}
      hour="numeric"
      minute="numeric"
      hour12={clockFormat === ClockFormatOption.TwelveHours}
    />
  ) : (
    <FormattedDate
      value={message.createdAt}
      day="numeric"
      month="numeric"
      year="numeric"
      hour="numeric"
      minute="numeric"
      hour12={clockFormat === ClockFormatOption.TwelveHours}
    />
  );
  return (
    <>
      <p className={classes.timestamp}>
        {!isSent && <span>{message.senderUsername}, </span>}
        {timestamp}
      </p>
      <div className={`${classes.bubble} ${isSent ? 'sent' : 'received'}`}>
        <p>{message.content}</p>
      </div>
    </>
  );
}

export default ChatMessage;
