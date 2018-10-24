import React, { Component } from 'react';
import styled from 'styled-components';

import IdentityAvatar from './Avatar';
import { H3 } from './Components';

class AddThreadCmp extends Component {
  formRef = React.createRef();

  onSubmit = (e) => {
    e.preventDefault();
    const { title, description } = this.formRef.current;
    this.props.onCreate({ title: title.value, description: description.value });
  };

  render() {
    const { activeEntity, style } = this.props;

    return (
      <div style={{ width: '100%', ...style }}>
        <H3>Start a thread</H3>
        <div className="columns" style={{ color: '#868a97', fontSize: '0.8rem', marginBottom: '30px' }}>
          <div className="column is-4">
            Please provide a title and a description. You can also define the participants.
          </div>
          <div className="column is-4 is-offset-4" style={{ textAlign: 'right' }}>
            Keep receiving 10% of the total ads in the thread.
          </div>
        </div>
        <div className="columns" style={{ backgroundColor: '#ffffff', borderRadius: '3px' }}>
          <div className="column is-2">
            <Pile style={{ marginBottom: '5px' }}>You</Pile>
            <div className="is-flex" style={{ alignItems: 'center' }}>
              <IdentityAvatar
                id={activeEntity.id}
                src={activeEntity.image_preview_url}
                style={{ width: '2rem', height: '2rem', flexShrink: 0 }}
              />
              <span style={{ fontSize: '0.6rem', fontWeight: 'bold', wordBreak: 'break-all' }}>
                {activeEntity.name}
              </span>
            </div>
          </div>
          <div className="column">
            <form onSubmit={this.onSubmit} ref={this.formRef}>
              <Field required title="Title" name="title" placeholder={'"What’s the best wallet to store Ethereum?"'} />
              <Field
                multiline
                required
                title="Description"
                name="description"
                placeholder={'"What’s the best wallet to store Ethereum?"'}
              />
              <ComingSoon>
                <Filters />
              </ComingSoon>
              <AddButtom type="submit">Start a thread</AddButtom>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const AddButtom = styled.button`
  color: #ffffff;
  background-color: #0329b6;
  padding: 10px 15px;
  font-weight: 600;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
`;

const ComingSoon = styled(({ className, children }) => (
  <div className={className}>
    Coming soon
    <div className="feature">{children}</div>
  </div>
))`
  .feature {
    filter: blur(1px);
    user-select: none;
    cursor: not-allowed;
  }
`;

const Filters = styled(({ className }) => (
  <div className={className}>
    <FieldTitle>Limit participants to holders</FieldTitle>
    <FilterPile>Eth</FilterPile>
    <FilterPile>0x</FilterPile>
    <FilterPile>Omg</FilterPile>
  </div>
))`
  margin-bottom: 15px;
`;

const Pile = styled.div`
  display: inline-block;
  font-size: 0.6rem;
  font-weight: bold;
  padding: 5px 10px;
  background-color: #eef0f9;
  border-radius: 15px;
  margin-right: 15px;
`;

const FilterPile = Pile.extend`
  :after {
    content: 'x';
    padding-left: 10px;
  }
`;

const FieldTitle = styled.p`
  font-size: 0.6rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Field = styled(({ className, title, multiline, ...restProps }) => (
  <div className={className}>
    <FieldTitle>{title}</FieldTitle>
    <div className="input-wrapper">{!multiline ? <input {...restProps} /> : <textarea {...restProps} />}</div>
  </div>
))`
  margin-bottom: 15px;

  .input-wrapper {
    display: relative;
  }

  .input-wrapper > input,
  .input-wrapper > textarea {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 3px;
    resize: none;
    outline: none;
    box-shadow: inset 0 0.5px 1.5px 0 rgba(3, 41, 182, 0.12);
    background-color: #eff1f9;
  }
`;

export default AddThreadCmp;

export class AddThread extends Component {
  state = { step: 'initial' };

  render() {
    const { activeEntity, ...props } = this.props;
    const { step } = this.state;

    if (step === 'initial') {
      return (
        <AddButtom onClick={() => this.setState({ step: 'add' })} {...props}>
          Start a thread
        </AddButtom>
      );
    }

    return <AddThreadCmp activeEntity={activeEntity} {...props} />;
  }
}
