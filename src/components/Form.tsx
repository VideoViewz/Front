import React from 'react';
import { Store } from '../Store';

interface IState {
  review: string;
  stars: number;
}

interface IProps {
  store: Store;
}

export default class Form extends React.Component</*{store:Store}*/IProps, IState> {

  state: IState = { //To initialize state if you want
    review: '',
    stars: 1
  }

  submitReview() {
    this.props.store.addReview({ review: this.state.review, stars: this.state.stars });
  };

  setReview = (e: any) => {
    this.setState({ review: e.target.value })
  }

  setStars = (e: any) => {
    this.setState({ stars: Number(e.target.value) });
  }

  render() {
    return (
      <div className="formSection">
        <div className="form-group">
          <p>Submit a Review</p>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <input onChange={this.setReview} type="text" name="review" id="review" placeholder="Write a review" className="form-control" />
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <select name="stars" id="stars" onChange={this.setStars} className="form-control">
                <option value="1">1 Star</option>
                <option value="2">2 Star</option>
                <option value="3">3 Star</option>
                <option value="4">4 Star</option>
                <option value="5">5 Star</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <button onClick={() => this.submitReview()} className="btn btn-success" type="submit">SUBMIT REVIEW</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}