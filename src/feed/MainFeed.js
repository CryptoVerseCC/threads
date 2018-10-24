import React, { Component } from 'react';
import styled from 'styled-components';
import timeago from 'timeago.js';

import { H4 } from '../Components';
import { UnstyledLink as Link } from '../Link';
import IdentityAvatar from '../Avatar';
import InfiniteScroll from '../InfiniteScroll';

const Header = styled(({ className }) => (
  <div className={`columns is-mobile ${className}`}>
    <div className="column is-6" />
    <div className="column is-1">Participants</div>
    <div className="column is-3">Author (OP)</div>
  </div>
))`
  font-size: 0.6rem;
  font-size: bold;
  color: #928f9b;
`;

const Thread = styled(({ className, feedItem }) => (
  <div className={`columns is-mobile ${className}`}>
    <div className="column is-6">
      <H4>{feedItem.target}</H4>
      <span className="content">{feedItem.content || feedItem.target}</span>
    </div>
    <div className="column is-1">0</div>
    <div className="column is-3 is-flex">
      <IdentityAvatar
        id={feedItem.author}
        src={feedItem.author_info.image_preview_url}
        style={{ width: '2rem', height: '2rem' }}
      />
      <div style={{ marginLeft: '5px' }}>
        <div style={{ fontWeight: 'bold', wordBreak: 'break-all' }}>{feedItem.author_info.name}</div>
        <div>{timeago().format(feedItem.created_at)}</div>
      </div>
    </div>
  </div>
))`
  font-size: 0.8rem;

  .content {
    color: #928f9b;
  }

  :hover {
    background: #ffffff;
    cursor: pointer;
  }
`;

class MainFeed extends Component {
  renderItem = (feedItem) => (
    <Link to={`/thread/${feedItem.id}`} key={feedItem.id}>
      <Thread feedItem={feedItem} />
    </Link>
  );

  render() {
    const {
      className,
      feedItems,
      feedLoading,
      temporaryReplies,
      temporaryReactions,
      getMoreFeedItems,
      feedLoadingMore,
      emptyFeedMessage,
    } = this.props;

    if (feedLoading) {
      return null;
    }

    if (emptyFeedMessage) {
      return 'No messages yet';
    }

    return (
      <div className={className}>
        <Header />
        <InfiniteScroll
          style={{ width: '100%' }}
          hasMore={true}
          onLoadMore={getMoreFeedItems}
          throttle={100}
          threshold={300}
          isLoading={feedLoadingMore || feedLoading}
        >
          {feedItems.map(this.renderItem)}
        </InfiniteScroll>
      </div>
    );
  }
}

export default MainFeed;
