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
                <div className="row">
                    <div className="col-lg-12">
                        aaaa
                    </div>
                </div>
            </div>
        )
    }
}
export default observer(Form);