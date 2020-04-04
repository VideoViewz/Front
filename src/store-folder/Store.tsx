import { Video } from '../classes/Video';
export class Store {

    urlResults: Video[] = [];

    updateUrlResults = (videosResults: any) => {
        for (let i = 0; i < videosResults.length; i++) {
            this.urlResults[i] = new Video(videosResults[i].url,
                videosResults[i].videoName);
        }
    }
}