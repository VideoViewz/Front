import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

interface IProps {
    data: any;
}

const List: React.FC<IProps> = (props) => {
    return (
        <li className="list-group-item">
            <div className="float-left">{props.data.review}</div>
            <div className="float-right">
                <StarRatingComponent value={0} name="reviewRate" starCount={props.data.stars} />
            </div>
        </li>
    )
}
export default List;