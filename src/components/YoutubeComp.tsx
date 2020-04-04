import React from 'react';

interface IProps {
    url: string;
}

class YoutubeComp extends React.Component<IProps> {
    render() {
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div style={{ marginBottom: "40px" }} className="col-md-6">
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe className="embed-responsive-item" src={this.props.url} allowFullScreen></iframe>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }

}
export default YoutubeComp;