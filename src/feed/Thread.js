import React from 'react';
import styled from 'styled-components';
import timeago from 'timeago.js';

import IdentityAvatar from '../Avatar';
import { H4 } from '../Components';

/*
    hidePermalink,
    feedItem,
    replies,
    reactions,
    style,
    onShowLikers,
    getTemporaryReactions,
    onVerify,
*/

const Container = styled.div`
  border-radius: 3px;
  background-color: #ffffff;
`;

const Item = styled(({ className, feedItem, targetOnly }) => (
  <Container className={`${className} columns`}>
    <div className="column is-2 ">
      <div className="is-flex" style={{ alignItems: 'center' }}>
        <IdentityAvatar
          id={!feedItem.context ? feedItem.author : feedItem.context}
          src={!feedItem.context ? feedItem.author_info.image_preview_url : feedItem.context_info.image_preview_url}
          style={{ width: '2rem', height: '2rem', flexShrink: 0, marginRight: '5px' }}
        />
        <span className="author-name">
          {!feedItem.context ? feedItem.author_info.name : feedItem.context_info.name}
        </span>
      </div>
    </div>
    <div className="column">
      {!targetOnly ? (
        <React.Fragment>
          <H4>{feedItem.target}</H4>
          <div className="created-at">{timeago().format(feedItem.created_at)}</div>
          <span>{feedItem.content || feedItem.target}</span>
        </React.Fragment>
      ) : (
        <span>{feedItem.content || feedItem.target}</span>
      )}
    </div>
  </Container>
))`
  margin: 10px 0;
  .author-name,
  .created-at {
    font-size: 0.8rem;
    font-weight: 600;
    word-break: break-all;
  }
`;

const Reply = ({ reply }) => (
  <React.Fragment>
    <Item targetOnly feedItem={reply} />
    <div style={{ marginLeft: '2rem' }}>
      {reply.replies.map((reply) => (
        <Reply reply={reply} key={reply.id} />
      ))}
    </div>
  </React.Fragment>
);

export const Thread = ({ feedItem, replies }) => (
  <React.Fragment>
    <Item feedItem={feedItem} />
    {replies.map((reply) => (
      <Reply reply={reply} key={reply.id} />
    ))}
  </React.Fragment>
);
