import React from 'react';
import { Store } from '../store-folder/Store';
import UploadForm from '../components/UploadForm';
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
                <UploadForm />
            </div>
        )
    }
}
export default observer(Form);