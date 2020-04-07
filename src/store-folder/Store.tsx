import { Video } from '../classes/Video';
import { CourseClass } from '../classes/CourseClass';
export class Store {

    urlResults: Video[] = [];
    searchedUrls: Video[] = [];
    allCourses: CourseClass[] = [];
    didLoadData: boolean = false;

    updateUrlResults = (videosResults: Video[]) => {
        this.urlResults = videosResults;
    }

    setDidLoadData = () => {
        this.didLoadData = true;
    }

    loadAllCourses = (courses: CourseClass[]) => {
        this.allCourses = courses;
    }

    updateSearchedVideos = (searchedVideos: Video[]) => {
        this.searchedUrls = searchedVideos;
    }

    resetSearchedUrls = () => {
        this.searchedUrls = [];
    }
}