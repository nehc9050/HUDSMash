/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';
import { LeaderBoard } from './LeaderBoard';
import { GenericButton } from './GenericButton';
import ReactLoading from 'react-loading';

// TODO: "Skip current matchup" button

interface IState {
  timesSubmitted: number;
  food1: foodObject;
  food2: foodObject;
  rankings: ReadonlyArray<foodObject>;
  loading: boolean;
  loadingRanks: boolean;
  requestId: string;
}

export interface foodObject {
  score: number;
  displayName: string;
  leaderboardHelper?: number;
  name: string;
  image?: string;
  locked?: boolean;
}

const comparisonBoxStyle = css`
  padding-top: 50px;
  .foods {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .food {
    margin: 25px;
  }
  .foodimg {
    height: 200px;
    width: auto;
    border-radius: 10px;
    margin: 10px;
  }
  .column {
    flex-direction: column;
    flex-wrap: wrap;
    width: 50%;
  }
  .loading {
    margin: 130px;
  }
  .loadingRanks {
    margin-left: 48%;
    margin-right: 48%;
    margin-top: 84px;
    margin-bottom: 84px;
  }
`;

export class ComparisonBox extends React.Component<{}, IState> {
  async getRankings():Promise<any> {
    try {
      this.setState({ loadingRanks: true });
      await(fetch("https://j4ldrj5h4f.execute-api.us-east-2.amazonaws.com/prod/getleaderboard", {
      // await(fetch("http://127.0.0.1:5000/getRankings", {
        method:  'POST',
        mode: 'cors',
      })).then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ rankings: data });
        this.setState({ loadingRanks: false });
      });
    } catch (error) {
      this.setState({ loadingRanks: false });
      console.log("Error on getRankings encountered");
    }
  }

  async submitFood(winner: string, loser: string, requestId: string):Promise<any> {
    try {
      this.setState({ loading: true });
      await(fetch("https://j4ldrj5h4f.execute-api.us-east-2.amazonaws.com/prod/beats", {
      // await(fetch("http://127.0.0.1:5000/updateMatch", {
          method:  'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({winner: winner, loser: loser, requestId: requestId}),
        })
        .then(() => this.setState({timesSubmitted: this.state.timesSubmitted + 1}))
        // .then(() => console.log(this.state))
        .then(() => {
          this.getMatch();
          // this.getRankings();
      }));
    } catch (error) {
      this.setState({ loading: false });
      console.log("Error on submitFood encountered");
      this.submitFood(winner, loser, requestId);
    }
  };

  async getMatch() {
    try {
      this.setState({ loading: true });
      await(fetch("https://j4ldrj5h4f.execute-api.us-east-2.amazonaws.com/prod/getfoodpair",
      // await(fetch("http://127.0.0.1:5000/getMatch",
        {
          method:  'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res => res.json()).then(data => {
          console.log(data);
          this.setState(
            {
              food1: data.first,
              food2: data.second,
              requestId: data.requestId
            }
          );
          this.setState({ loading: false });
        }));
    } catch (error) {
      console.log("Error on getMatch encountered");
      // console.log(error);
      this.getMatch();
    }
  }

  async componentDidMount() {
    this.getMatch();
    this.getRankings();
  }

  handleImageError(img: number) {
    console.log("image error");
    if (img === 0) {
      this.setState({
        food1: {
          displayName: this.state.food1.displayName,
          score: this.state.food1.score,
          image: "https://en.meming.world/images/en/b/bc/Mike_Wazowski-Sulley_Face_Swap.jpg",
          name: this.state.food1.name,
        }
      });
    } else {
      this.setState({
        food2: {
          displayName: this.state.food2.displayName,
          score: this.state.food2.score,
          image: "https://en.meming.world/images/en/b/bc/Mike_Wazowski-Sulley_Face_Swap.jpg",
          name: this.state.food2.name,
        }
      });
    }
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      timesSubmitted: 0,
      food1: {
        displayName: '',
        image: '',
        name: '',
        score: 500,
      },
      food2: {
        displayName: '',
        image: '',
        name: '',
        score: 500,
      },
      rankings: [
        {'displayName': 'Sassage', 'name': 'sassage', 'score': 500},
        {'displayName': 'Apple pie', 'name': 'applePie', 'score': 500}
      ],
      loading: false,
      loadingRanks: false,
      requestId: "",
    }
  }

  render() {
    return (
      <div css={comparisonBoxStyle}>
        <div className="foods">
          <div className="row">
            {
              this.state.loading ?
                <div className="loading">
                  <ReactLoading type={"bubbles"} color={"rgb(226, 52, 50)"} height={50} width={50}/>
                </div> :
                <div className="food">
                  <img
                    src={this.state.food1.image}
                    alt={this.state.food1.displayName}
                    className='foodimg'
                    onError={() => this.handleImageError(0)}
                  />
                  <div>
                    <div
                      onClick={(event: any) => {
                        this.submitFood(this.state.food1.name, this.state.food2.name, this.state.requestId)
                      }}
                    >
                      <GenericButton text={this.state.food1.displayName}/>
                    </div>
                  </div>
                </div>
            }
          </div>

          <div className="row">
            {
              this.state.loading ?
                <div className="loading">
                  <ReactLoading type={"bubbles"} color={"rgb(226, 52, 50)"} height={50} width={50}/>
                </div> :
                <div className="food">
                  <img
                    src={this.state.food2.image}
                    alt={this.state.food2.image}
                    className='foodimg'
                    onError={() => this.handleImageError(1)}
                  />
                  <div>
                    <div
                      onClick={(event: any) => {
                        this.submitFood(this.state.food2.name, this.state.food1.name, this.state.requestId)
                      }}
                    >
                      <GenericButton text={this.state.food2.displayName}/>
                    </div>
                  </div>
                </div>
            }
          </div>
        </div>
        <div
          onClick={(event: any) => {this.getMatch()}}
        >
          <GenericButton text="Skip this matchup"/>
        </div>
        {
          this.state.loadingRanks ?
            <div className="loadingRanks">
              <ReactLoading type={"bubbles"} color={"rgb(226, 52, 50)"} height={50} width={50}/>
            </div> :
            <LeaderBoard
              {...{rankings: this.state.rankings}}
            />
        }
        <div
          onClick={(event: any) => {this.getRankings()}}
        >
          <GenericButton text="Refresh rankings"/>
        </div>
      </div>
    )
  }
}
