import React, { Component } from 'react';
import styled from 'styled-components';

import { getFeedItemsFromCache, getRanking, isValidFeedItem, enhanceFeedItem } from './api';
import { pageView } from './Analytics';
import { getFeed } from './Feed';
import Hero from './Hero';
import { FlatContainer } from './Components';
import FeedTypeSwitcher from './FeedTypeSwitcher';
import StatusBox from './StatusBox';

const ExplainerBox = styled(FlatContainer)`
  margin-top: 20px;

  @media (max-width: 770px) {
    mergin-top: 10px;
  }
`;

const { REACT_APP_DEFAULT_TOKEN_ID: DEFAULT_TOKEN_ID } = process.env;

const fetchPopularFeed = async () => {
  const { items } = await getRanking(
    [
      {
        algorithm: 'cryptoverse_last_week_popular_feed',
      },
    ],
    'api/decorate-with-opensea',
  );
  return items.filter(isValidFeedItem).map(enhanceFeedItem);
};

const NewestFeed = getFeed(getFeedItemsFromCache(), true, true, undefined, (f0, f1) => f1.created_at - f0.created_at);
const PopularFeed = getFeed(fetchPopularFeed, false, false);
const ActiveFeed = getFeed(getFeedItemsFromCache('cache-cryptoverse-active-feed'), true, false);

export default class IndexPage extends Component {
  state = { feedType: FeedTypeSwitcher.ACTIVE };

  componentDidMount() {
    pageView();
  }

  changeFeedType = (feedType) => {
    if (this.state.feedType !== feedType) {
      this.setState({ feedType });
    }
  };

  render() {
    const { feedType } = this.state;
    const defaultUnloggedFeeds = [FeedTypeSwitcher.ACTIVE, FeedTypeSwitcher.POPULAR, FeedTypeSwitcher.NEW];
    return (
      <React.Fragment>
        <div className="columns ordered-mobile">
          <div className="column is-8 fl-1 is-offset-2">
            <StatusBox check={StatusBox.Web3LockedCheck} style={{ marginBottom: '30px' }}>
              <Hero />
            </StatusBox>
            <FeedTypeSwitcher
              type={feedType}
              onChange={this.changeFeedType}
              style={{ marginBottom: '2em' }}
              options={defaultUnloggedFeeds}
            />
            {feedType === FeedTypeSwitcher.NEW && <NewestFeed />}
            {feedType === FeedTypeSwitcher.POPULAR && <PopularFeed />}
            {feedType === FeedTypeSwitcher.ACTIVE && <ActiveFeed />}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
