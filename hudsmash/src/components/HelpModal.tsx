/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { GenericButton } from './GenericButton';

interface IState {
  display: boolean;
}

const HelpStyle = css`
  text-align: left;

  @font-face {
    font-family: 'Roboto Mono', monospace;
    src: url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
  }

  #helpButton {
    position: fixed;
    right: 3%;
    bottom: 5%;
    border-radius: 100%;
    font-size: 24px;
    font-family: 'Roboto Mono', monospace;
    background-color: white;
    border: none;
    box-shadow: 0 3px 4px 0 rgba(0,0,0,0.24), 0 1px 1px 0 rgba(0,0,0,0.19);
    transition-duration: 0.3s;
  }

  #helpButton:hover {
    cursor: pointer;
    transition-duration: 0.3s;
    box-shadow: 0 6px 8px 0 rgba(0,0,0,0.24), 0 3px 3px 0 rgba(0,0,0,0.19);
    background: rgb(226, 52, 50);
    color: white;
  }

  #reportButton {
    position: fixed;
    left: 3%;
    bottom: 5%;
  }

  .modal {
    display: flex;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);

    align-items: center;
    justify-content: center;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .modal-content {
    border-radius: 15px;
    background-color: #fefefe;
    font-family: 'Roboto Mono', monospace;
    padding: 20px;
    width: 85vw;
    border: none;
    max-width: 800px;
  }
`

export class HelpModal extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      display: false,
    }
  }

  render() {
    return (
      <div css={HelpStyle}>
        <div
          id='reportButton'
        >
          <a target="blank_" href="https://docs.google.com/forms/d/e/1FAIpQLScNbP1MJiaYbEOhYvWWCKWECdvAd_7ek_p2f9cRt6tujHy7gg/viewform">
          <GenericButton text="Report an error"/>
          </a>
        </div>

        <button
          id='helpButton'
          onClick={() => this.setState({ display: !this.state.display })}
        >
          ?
        </button>
        { !this.state.display ? null :
          <div id="help" className="modal">
            <div className="modal-content">
              <span
                className="close"
                onClick={() => this.setState({ display: !this.state.display })}
              >
                &times;
              </span>
              <h2>Info</h2>
              <h3>About</h3>
              <p>
                Let your favorite HUDS dishes duke it out in HUSDMash!
                Participate in settling, once and for all, what the best HUDS
                dishes are.
              </p>
              <h3>Usage</h3>
              <p>
                It's simple - just choose the better of the two dishes. If you
                want to skip the current matchup, just click "Skip this matchup."
                If you notice something wrong with the current matchup (dish
                shouldn't be in the running, broken image, broken website, you
                hate our guts, etc.) you can report it at the bottom of the page.
              </p>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default HelpModal;
