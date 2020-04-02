import React from 'react';
import axios from 'axios';
import { Store } from '../store-folder/Store';
import { observer } from 'mobx-react';

interface IProps {
  store: Store;
}

interface IState {
  url: string;
  videoName: string;
  uploader: string;
  course: string;
}

class Form extends React.Component<IProps, IState> {
  state: IState = {
    url: '',
    videoName: '',
    uploader: 'Tomer',
    course: 'Math'
  };

  handleSubmit = () => {

    axios.post(`https://videoviewz-staging.herokuapp.com/video/upload`, {
      url: this.state.url,
      videoName: 'COD',
      uploader: this.state.uploader,
      course: this.state.course
    })
      .then(res => {
        // console.log(res);
        // console.log(res.data);
      })
  };

  setURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ url: e.target.value });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <img
            className="imgStyle"
            src={require(`../pictures/logoVideo.png`)}
            alt=""
          />
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
        <div className="row backgroundImgStyle">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-12 ">
                <h1 className="uploadVideo">Upload Video</h1>
              </div>
            </div>
            <div style={{ padding: '13px' }} className="row">
              <div className="col-lg-12">
                <button
                  onClick={() => this.handleSubmit()}
                  className="uploadButtonStyle"
                >
                  <h1 className="plusStyle">+</h1>
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <input onChange={this.setURL} type="text" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3"></div>
              <div style={{ marginBottom: "40px" }} className="col-md-6">
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/zlRq8RAawng" allowFullScreen></iframe>
                </div>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default observer(Form);
