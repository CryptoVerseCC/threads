import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, text, boolean, object } from '@storybook/addon-knobs/react';

import AddThread from '../AddThread';

storiesOf('Components', module)
  .addDecorator(withKnobs)
  .addDecorator((story) => (
    <div
      style={{
        backgroundColor: '#f5f8fd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        padding: '50px',
      }}
    >
      {story()}
    </div>
  ))
  .add('Add Thread', () => {
    return (
      <AddThread
        activeEntity={{
          id: '0x460031Ae4DB5720D92A48feCF06a208c5099C186',
          name: '0x4600....C186',
          image_preview_url:
            'https://storage.googleapis.com/opensea-prod.appspot.com/0xa6d954d08877f8ce1224f6bfb83484c7d3abf8e9/479.png',
        }}
        onCreate={action('on create')}
      />
    );
  });
