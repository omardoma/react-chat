import React from 'react';

import { render, screen, userEvent, fireEvent } from 'test-utils';

import ChatInput from './ChatInput';

import i18n from '../../../../shared/config/i18n';

describe('ChatInput', () => {
  it('renders ChatInput component', () => {
    // Arrange
    const sendMessage = jest.fn();
    const sendOnCtrlEnter = false;
    const { asFragment } = render(
      <ChatInput sendMessage={sendMessage} sendOnCtrlEnter={sendOnCtrlEnter} />
    );
    // Assert
    expect(asFragment()).toMatchSnapshot();
  });

  it('should type the user input', () => {
    // Arrange
    const sendMessage = jest.fn();
    const sendOnCtrlEnter = false;
    render(
      <ChatInput sendMessage={sendMessage} sendOnCtrlEnter={sendOnCtrlEnter} />
    );
    const messageInputEl = screen.getByRole('textbox', { name: /message/i });
    const messageText = 'Hey there';
    // Act
    userEvent.type(messageInputEl, messageText);
    // Assert
    expect(messageInputEl).toHaveValue(messageText);
  });

  it('should send a message when the send button is clicked', () => {
    // Arrange
    const sendMessage = jest.fn();
    const sendOnCtrlEnter = false;
    render(
      <ChatInput sendMessage={sendMessage} sendOnCtrlEnter={sendOnCtrlEnter} />
    );
    const messageInputEl = screen.getByRole('textbox', { name: /message/i });
    const sendButtonEl = screen.getByLabelText(
      i18n.en['chat.chatInput.sendButton']
    );
    const messageText = 'Hey there';
    // Act
    userEvent.type(messageInputEl, messageText);
    userEvent.click(sendButtonEl);
    // Assert
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(messageText);
  });

  it('should not send a message when the Enter key is pressed and sendOnCtrlEnter is on', () => {
    // Arrange
    const sendMessage = jest.fn();
    const sendOnCtrlEnter = true;
    render(
      <ChatInput sendMessage={sendMessage} sendOnCtrlEnter={sendOnCtrlEnter} />
    );
    const messageInputEl = screen.getByRole('textbox', { name: /message/i });
    const messageText = 'Hey there';
    // Act
    userEvent.type(messageInputEl, messageText);
    fireEvent.keyPress(messageInputEl, {
      key: 'Enter',
      code: 13,
      charCode: 13,
      keyCode: 13
    });
    // Assert
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('should send a message when the Enter key is pressed and sendOnCtrlEnter is off', () => {
    // Arrange
    const sendMessage = jest.fn();
    const sendOnCtrlEnter = false;
    render(
      <ChatInput sendMessage={sendMessage} sendOnCtrlEnter={sendOnCtrlEnter} />
    );
    const messageInputEl = screen.getByRole('textbox', { name: /message/i });
    const messageText = 'Hey there';
    // Act
    userEvent.type(messageInputEl, messageText);
    fireEvent.keyPress(messageInputEl, {
      key: 'Enter',
      code: 13,
      charCode: 13,
      keyCode: 13
    });
    // Assert
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(messageText);
  });

  it('should not send a message when CTRL+ENTER key combination is pressed and sendOnCtrlEnter is off', () => {
    // Arrange
    const sendMessage = jest.fn();
    const sendOnCtrlEnter = false;
    render(
      <ChatInput sendMessage={sendMessage} sendOnCtrlEnter={sendOnCtrlEnter} />
    );
    const messageInputEl = screen.getByRole('textbox', { name: /message/i });
    const messageText = 'Hey there';
    // Act
    userEvent.type(messageInputEl, messageText);
    fireEvent.keyPress(messageInputEl, {
      key: 'Enter',
      code: 13,
      charCode: 13,
      keyCode: 13,
      ctrlKey: true
    });
    // Assert
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('should send a message when CTRL+ENTER key combination is pressed and sendOnCtrlEnter is on', () => {
    // Arrange
    const sendMessage = jest.fn();
    const sendOnCtrlEnter = true;
    render(
      <ChatInput sendMessage={sendMessage} sendOnCtrlEnter={sendOnCtrlEnter} />
    );
    const messageInputEl = screen.getByRole('textbox', { name: /message/i });
    const messageText = 'Hey there';
    // Act
    userEvent.type(messageInputEl, messageText);
    fireEvent.keyPress(messageInputEl, {
      key: 'Enter',
      code: 13,
      charCode: 13,
      keyCode: 13,
      ctrlKey: true
    });
    // Assert
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(messageText);
  });
});
