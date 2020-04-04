import React from 'react';
import axios from 'axios';
import { Store } from '../store-folder/Store';
import YoutubeComp from './YoutubeComp'
import { Navbar, Button, Nav, FormControl, Form } from 'react-bootstrap'
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

class FormComp extends React.Component<IProps, IState> {
  state: IState = {
    url: '',
    videoName: '',
    uploader: 'Tomer',
    course: 'Math'
  };

  handleSubmit = () => {

    if (this.state.url.includes('https://www.youtube.com/')) {

      axios.post(`https://videoviewz-staging.herokuapp.com/video/upload`, {
        url: this.state.url,
        videoName: 'COD',
        uploader: this.state.uploader,
        course: this.state.course
      })
        .then((res) => {
          res.data.error === 'Video already exists' ? alert('Video already exists!') : alert('Upload Success!');
          //push an empty object and pop it again to re- render the component again( observer component)
          this.props.store.urlResults.push(Object(undefined));
          this.props.store.urlResults.pop();
        })
    }
    else {
      alert('Youtube link is not valid!');
    }
  };

  loadData = () => {
    let html: string;
    html = "https://videoviewz-staging.herokuapp.com/video/" + this.state.course;
    axios.get(html)
      .then(res => {
        this.props.store.updateUrlResults(res.data);
      })
  }

  setURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ url: e.target.value });
  }

  render() {
    return (
      <div>
        {this.loadData()}
        <Navbar bg="light" expand="lg">
          <img style={{ marginBottom: '5px' }}
            className="imgStyle"
            src={require(`../pictures/logoVideo.png`)}
            alt=""
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
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
            {
              this.props.store.urlResults.map((res, i) =>
                <YoutubeComp key={i} video={res} />
              )
            }
          </div>
        </div>
      </div>
    );
  }
}
export default observer(FormComp);

