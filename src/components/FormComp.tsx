import React from 'react';
import axios from 'axios';
import { Store } from '../store-folder/Store';
import YoutubeComp from './YoutubeComp';
import NavBarComp from './NavBarComp';
import UploadVideoComp from './UploadVideoComp';
import { CourseClass } from '../classes/CourseClass';

import { observer } from 'mobx-react';

interface IProps {
  store: Store;
}

interface IState {
  noVideosFound: boolean;
  selectedCourse: string;
  allCourses: CourseClass[];
}

class FormComp extends React.Component<IProps, IState> {
  state: IState = {
    noVideosFound: false,
    selectedCourse: 'Select a course',
    allCourses: []
  };

  componentDidMount = () => {
    this.loadCourses();
  }

  loadCourses = () => {
    let html = "https://videoviewz-staging.herokuapp.com/course";
    axios.get(html)
      .then(res => {
        this.setState({ allCourses: res.data });
      })
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

  render() {
    return (
      <div>
        <NavBarComp store={this.props.store} allCourses={this.state.allCourses} />
        <div className="row backgroundImgStyle">
          <div className="col-lg-12">
            <UploadVideoComp store={this.props.store} allCourses={this.state.allCourses} />
            {this.loadVideos()}
          </div>
        </div>
      </div>
    );
  }
}
export default observer(FormComp);

