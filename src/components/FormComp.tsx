import React from 'react';
import axios from 'axios';
import { Store } from '../store-folder/Store';
import YoutubeComp from './YoutubeComp'
import { Video } from '../classes/Video';
import { Navbar, Nav, NavDropdown, FormControl, Form } from 'react-bootstrap';
import { CourseClass } from '../classes/CourseClass';
import { observer } from 'mobx-react';

interface IProps {
  store: Store;
}

interface IState {
  url: string;
  videoName: string;
  uploader: string;
  selectedCoursePost: string;
  noVideosFound: boolean;
  selectedCourse: string;
  allCourses: CourseClass[];
}

class FormComp extends React.Component<IProps, IState> {
  state: IState = {
    url: '',
    videoName: '',
    uploader: 'Tomer',
    selectedCoursePost: '',
    noVideosFound: false,
    selectedCourse: 'Select a course',
    allCourses: []
  };

  componentDidMount = () => {
    this.loadCourses();
  }

  handleSubmit = () => {
    let wasError: boolean = false;

    if (!this.state.url.includes('https://www.youtube.com/')) {
      wasError = true;
      document.getElementById('url')!.style.border = ' 1.5px solid red'
    }

    if (this.state.videoName === '') {
      wasError = true;
      document.getElementById('videoName')!.style.border = ' 1.5px solid red'
    }

    if (this.state.selectedCoursePost === '') {
      wasError = true;
      document.getElementById('selectedCoursePost')!.style.border = ' 1.5px solid red';
    }

    if (!wasError) {
      document.getElementById('url')!.style.border = 'none';
      document.getElementById('videoName')!.style.border = 'none';
      document.getElementById('selectedCoursePost')!.style.border = 'none';
      axios.post(`https://videoviewz-staging.herokuapp.com/video/upload`, {
        url: this.state.url,
        videoName: this.state.videoName,
        uploader: this.state.uploader,
        course: this.state.selectedCoursePost
      })
        .then((res) => {
          res.data.error === 'Video already exists' ? alert('Video already exists!') : alert('Upload Success!');
          //push an empty object and pop it again to re- render the component again( observer component)
          this.props.store.resetSearchedUrls();
          this.props.store.urlResults.push();
          this.props.store.urlResults.pop();
        })
    }
  };

  loadCourses = () => {
    let html = "https://videoviewz-staging.herokuapp.com/course";
    axios.get(html)
      .then(res => {
        this.setState({ allCourses: res.data });
        // this.props.store.loadAllCourses(res.data);
      })
  }

  searchVideos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      let tempVideoArr: Video[];
      tempVideoArr = this.props.store.urlResults.filter(video => video.videoName.toLowerCase().includes(e.target.value.toLowerCase()));
      if (tempVideoArr.length === 0)
        this.setState({ noVideosFound: true });
      else {
        this.setState({ noVideosFound: false });
        this.props.store.updateSearchedVideos(tempVideoArr);
      }
    }
    else {
      this.setState({ noVideosFound: false })
      this.props.store.updateSearchedVideos([]);
    }

  }

  setURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ url: e.target.value });
  }

  setVideoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ videoName: e.target.value });
  }

  loadVideos = () => {
    if (this.state.noVideosFound)
      return (
        <p className="videoNameStyle">No video found</p>
      );
    else if (this.props.store.urlResults.length === 0)
      return (
        <p className="videoNameStyle">No videos for the selected course</p>
      );
    else if (this.props.store.searchedUrls.length === 0) {
      return (
        <div>
          {
            this.props.store.urlResults.map((res, i) =>
              <YoutubeComp key={i} video={res} />
            )
          }
        </div>
      );
    }
    else {
      return (
        <div>
          {
            this.props.store.searchedUrls.map((res, i) =>
              <YoutubeComp key={i} video={res} />
            )
          }
        </div>
      );
    }
  }

  handleSelectedCourse = (eventKey: string) => {

    this.setState({ selectedCourse: eventKey }, () => {

      let html = "https://videoviewz-staging.herokuapp.com/video/" + this.state.selectedCourse;
      axios.get(html)
        .then(res => {
          this.props.store.updateUrlResults(res.data);
        })

    });
  }

  changeSelectedCoursePost = () => {
    let course = (document.getElementById("selectedCoursePost")! as HTMLInputElement).value;
    this.setState({ selectedCoursePost: course });
  }

  render() {
    return (
      <div>
        {alert()}
        <Navbar bg="light" expand="lg">
          <img style={{ marginBottom: '5px' }}
            className="imgStyle"
            src={require(`../pictures/logoVideo.png`)}
            alt=""
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown onSelect={this.handleSelectedCourse} title={this.state.selectedCourse} id="coursesDrop">
                {
                  this.state.allCourses.map((course, i) => {
                    return <NavDropdown.Item key={i} eventKey={course.name}>{course.name}</NavDropdown.Item>
                  })
                }
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl onChange={this.searchVideos} type="text" placeholder="Search for video name" className="mx-auto" />
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div className="row backgroundImgStyle">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-12 ">
                <p className="uploadVideo">Upload Video</p>
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
                <select onChange={() => this.changeSelectedCoursePost()} id="selectedCoursePost">
                  <option hidden>Select a course</option>
                  {
                    this.props.store.allCourses.map((course, i) => {
                      return <option key={i} value={course.name}>{course.name}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <FormControl onChange={this.setURL} id='url' type="text" placeholder="Enter youtube link" className="mx-auto inputStyle" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <FormControl onChange={this.setVideoName} id='videoName' type="text" placeholder="Enter video name" className="mx-auto inputStyle" />
              </div>
            </div>
            {this.loadVideos()}
          </div>
        </div>
      </div>
    );
  }
}
export default observer(FormComp);

