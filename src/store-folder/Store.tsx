import { Video } from '../classes/Video';
export class Store {

    urlResults: Video[] = [];

    updateUrlResults = (videosResults: Video[]) => {
        this.urlResults = videosResults;
    }
}