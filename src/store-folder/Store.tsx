import { Video } from '../classes/Video';
export class Store {

    urlResults: Video[] = [];
    searchedUrls: Video[] = [];

    updateUrlResults = (videosResults: Video[]) => {
        this.urlResults = videosResults;
    }

    updateSearchedVideos = (searchedVideos: Video[]) => {
        this.searchedUrls = searchedVideos;
    }

    resetSearchedUrls = () => {
        this.searchedUrls = [];
    }
}