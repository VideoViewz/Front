import React from 'react';
import { observer } from 'mobx-react';
import { Store } from '../Store';
import List from './List';

interface IProps {
    store: Store;
}

const Reviews: React.FC<IProps> = (props) => {
    return (
        <div className="reviewsWrapper">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <i className="fa fa-comments" /> Reviews
                        </div>
                        <ul className="list-group list-group-flush">
                            {props.store.reviewList.map((e, i) =>
                                <List
                                    key={i}
                                    data={e}
                                />
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Reviews);