import React from 'react';
import axios from 'axios';
import { Store } from '../store-folder/Store';
import { observer } from 'mobx-react';

interface IProps {
  store: Store;
}

interface IState {
  file: Blob;
  name: string;
  user: string;
  course: string;
}

class Form extends React.Component<IProps, IState> {
  state: IState = {
    file: new File([''], 'filename'),
    name: '',
    user: 'Tomer',
    course: 'Math'
  };

  onChangeHandler = (event: any) => {
    console.log(event.target.files[0]);
    this.setState({
      file: event.target.files[0],
      name: event.target.files[0].name
    });
  };

  handleSubmit = () => {
    console.log(this.state.file);
    const formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('name', this.state.name);
    formData.append('user', this.state.user);
    formData.append('course', this.state.course);

    axios.post(`http://localhost:3000/video/upload`, formData).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };

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
                <input
                  type="file"
                  name="file"
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3"></div>
              <div style={{marginBottom:"40px"}} className="col-md-6">
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
