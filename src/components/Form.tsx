import React from 'react';
import { Store } from '../store-folder/Store';
import { observer } from 'mobx-react';

interface IProps {
    store: Store;
}

class Form extends React.Component<IProps> {

    render() {
        return (
            <div>
                <div className="row paddingNav">
                    <div className="col-lg-3">
                        <img className="imgStyle" src={require(`../pictures/logoVideo.png`)} alt="" />
                    </div>
                    <div className="col-lg-3">
                        nav template
                    </div>
                    <div className="col-lg-3">
                        nav template
                    </div>
                    <div className="col-lg-3">
                        nav template
                    </div>
                </div>
                <div className="row backgroundImgStyle">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-lg-12 ">
                                <h1 className="uploadVideo">Upload Video</h1>
                            </div>
                        </div>
                        <div style={{ padding: '13px' }} className="row">
                            <div className="col-lg-12">
                                <button className="uploadButtonStyle">
                                    <h1 className="plusStyle">+</h1>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default observer(Form);