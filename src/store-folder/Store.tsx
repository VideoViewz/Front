export class Store {

    urlResults: string[] = [];

    updateUrlResults = (urlResults: string[]) => {
        this.urlResults = urlResults;
    }
}