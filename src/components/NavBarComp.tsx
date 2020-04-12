import React from 'react';
import { Navbar, Nav, NavDropdown, FormControl, Form } from 'react-bootstrap';
import axios from 'axios';
import { Store } from '../store-folder/Store';
import { Video } from '../classes/Video';
import { CourseClass } from '../classes/CourseClass';

interface IProps {
    store: Store;
    allCourses: CourseClass[];
}

interface IState {
    selectedCourse: string;
}

class NavBarComp extends React.Component<IProps> {

    state: IState = {
        selectedCourse: 'Select a course'
    };

    handleSelectedCourse = (eventKey: string) => {
        this.setState({ selectedCourse: eventKey }, () => {

            let html = "https://videoviewz-staging.herokuapp.com/video/" + this.state.selectedCourse;
            axios.get(html)
                .then(res => {
                    this.props.store.updateUrlResults(res.data);
                })

        });
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

    render() {
        return (
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
                                this.props.allCourses.map((course, i) => {
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
        );
    }
}
export default NavBarComp;