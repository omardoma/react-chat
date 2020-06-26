import React from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

import { AppBar, Tab, Tabs, useMediaQuery, Badge } from '@material-ui/core';
import { useIntl } from 'react-intl';

import { useGlobalState } from '../../state';

function NavBar(): JSX.Element {
  const { formatMessage: f } = useIntl();
  const isLargeScreen = useMediaQuery('(min-width: 768px)');
  const match = useRouteMatch();
  const location = useLocation();
  const [state, dispatch] = useGlobalState();
  const { unreadCount } = state;
  const handleChatTabClick = (): void => {
    dispatch({ type: 'CLEAR_UNREAD_COUNT' });
  };
  return (
    <AppBar position="static" color="default">
      <Tabs
        value={location.pathname}
        aria-label="Navigation tabs"
        variant={isLargeScreen ? 'standard' : 'fullWidth'}
        centered={isLargeScreen}
      >
        <Tab
          label={
            <Badge badgeContent={unreadCount} color="primary">
              {f({ id: 'navbar.tabs.chat' })}
            </Badge>
          }
          component={Link}
          to={`${match.url}chat`}
          value={`${match.url}chat`}
          onClick={handleChatTabClick}
        />
        <Tab
          label={f({ id: 'navbar.tabs.settings' })}
          component={Link}
          to={`${match.url}settings`}
          value={`${match.url}settings`}
        />
      </Tabs>
    </AppBar>
  );
}

export default NavBar;
