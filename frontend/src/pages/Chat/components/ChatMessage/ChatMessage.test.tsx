import React from 'react';

import { render } from 'test-utils';

import { Message } from '../../../../shared/types';
import { ClockFormatOption } from '../../../../shared/enums';

import ChatMessage from './ChatMessage';

describe('ChatMessage', () => {
  it('renders a sent ChatMessage component when isSent is true with 12 Hours clock format', () => {
    // Arrange
    const message: Message = {
      id: '1',
      content: 'Hey There',
      senderUsername: 'guest1',
      createdAt: new Date(2020, 6, 25).toISOString()
    };
    const isSent = true;
    const clockFormat = ClockFormatOption.TwelveHours;
    const { asFragment } = render(
      <ChatMessage
        message={message}
        isSent={isSent}
        clockFormat={clockFormat}
      />
    );
    // Assert
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a sent ChatMessage component when isSent is true with 24 Hours clock format', () => {
    // Arrange
    const message: Message = {
      id: '1',
      content: 'Hey There',
      senderUsername: 'guest1',
      createdAt: new Date(2020, 6, 25).toISOString()
    };
    const isSent = true;
    const clockFormat = ClockFormatOption.TwentyFourHours;
    const { asFragment } = render(
      <ChatMessage
        message={message}
        isSent={isSent}
        clockFormat={clockFormat}
      />
    );
    // Assert
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a received ChatMessage component when isSent is false with 12 Hours clock format', () => {
    // Arrange
    const message: Message = {
      id: '1',
      content: 'Hey There',
      senderUsername: 'guest1',
      createdAt: new Date(2020, 6, 25).toISOString()
    };
    const isSent = false;
    const clockFormat = ClockFormatOption.TwelveHours;
    const { asFragment } = render(
      <ChatMessage
        message={message}
        isSent={isSent}
        clockFormat={clockFormat}
      />
    );
    // Assert
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a received ChatMessage component when isSent is false with 24 Hours clock format', () => {
    // Arrange
    const message: Message = {
      id: '1',
      content: 'Hey There',
      senderUsername: 'guest1',
      createdAt: new Date(2020, 6, 25).toISOString()
    };
    const isSent = false;
    const clockFormat = ClockFormatOption.TwentyFourHours;
    const { asFragment } = render(
      <ChatMessage
        message={message}
        isSent={isSent}
        clockFormat={clockFormat}
      />
    );
    // Assert
    expect(asFragment()).toMatchSnapshot();
  });
});
