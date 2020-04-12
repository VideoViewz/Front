import React from 'react';
import {FormControl} from 'react-bootstrap';
import axios from 'axios';
import { Store } from '../store-folder/Store';
import { CourseClass } from '../classes/CourseClass';

interface IProps {
    store: Store;
    allCourses: CourseClass[];
}

interface IState {
    videoName: string;
    selectedCoursePost: string;
    url: string;
    uploader: string;
}

class UploadVideoComp extends React.Component<IProps> {

    state: IState = {
        videoName: '',
        selectedCoursePost: '',
        url: '',
        uploader: 'Tomer'
    };

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


    changeSelectedCoursePost = () => {
        let course = (document.getElementById("selectedCoursePost")! as HTMLInputElement).value;
        this.setState({ selectedCoursePost: course });
    }

    setURL = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ url: e.target.value });
    }

    setVideoName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ videoName: e.target.value });
    }

    render() {
        return (
            <div>
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
                                this.props.allCourses.map((course, i) => {
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
            </div>
        );
    }
}
export default UploadVideoComp;