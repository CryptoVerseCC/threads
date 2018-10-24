import React, { Component } from 'react';

import { getRanking, isValidFeedItem, enhanceFeedItem } from './api';
import { pageView } from './Analytics';
import { getFeed } from './Feed';
import FeedTypeSwitcher from './FeedTypeSwitcher';
import StatusBox from './StatusBox';
import { AddThread } from './AddThread';
import { withActiveEntity } from './Entity';
import AppContext from './Context';
import MainFeed from './feed/MainFeed';

const EnhancedAddThread = withActiveEntity(AddThread);

const fetchThreads = async () => {
  const { items } = await getRanking(
    [
      {
        algorithm: 'cryptoverse_threads_feed_active',
      },
    ],
    'api/decorate-with-opensea',
  );
  return items.filter(isValidFeedItem).map(enhanceFeedItem);
};

const ActiveFeed = getFeed(fetchThreads, false, false, undefined, undefined, MainFeed);

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
    return (
      <React.Fragment>
        <AppContext.Consumer>
          {({ feedStore: { postThread } }) => (
            <div className="columns">
              <div className="column is-8 is-offset-2">
                <StatusBox check={StatusBox.Web3LockedCheck} style={{ marginBottom: '30px' }}>
                  <EnhancedAddThread
                    onCreate={({ title, description }) => postThread({ target: title, content: description })}
                    style={{ marginTop: '30px' }}
                  />
                </StatusBox>
                <ActiveFeed />
              </div>
            </div>
          )}
        </AppContext.Consumer>
      </React.Fragment>
    );
  }
}
