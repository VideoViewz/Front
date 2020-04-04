import React from 'react';
import { Video } from '../classes/Video';

interface IProps {
    video: Video;
}

class YoutubeComp extends React.Component<IProps> {
    render() {
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div style={{ marginBottom: "40px" }} className="col-md-6">
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe title={this.props.video.videoName} className="embed-responsive-item" src={this.props.video.url} allowFullScreen></iframe>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }

}
export default YoutubeComp;