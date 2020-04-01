import React from 'react';
import axios from 'axios';
import { Store } from '../store-folder/Store';
import { observer } from 'mobx-react';

interface IProps {
    store: Store;
}

interface IState {
    file?: File;
    name?: string;
    user: string;
    course: string;
}

class Form extends React.Component<IProps, IState> {


    state: IState = {
        file: undefined,
        name: '',
        user: 'Tomer',
        course: 'Math'
    }

    onChangeHandler = (event: any) => {
        this.setState({ file: event.target.files[0], name: event.target.files[0].name });
    }

    handleSubmit = () => {
        axios.post(`https://jsonplaceholder.typicode.com/users`, {
            file: this.state.file,
            name: this.state.name,
            user: this.state.user,
            course: this.state.course
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
    }

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
                                <button onClick={() => this.handleSubmit()} className="uploadButtonStyle">
                                    <h1 className="plusStyle">+</h1>
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <input type="file" name="file" onChange={this.onChangeHandler} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default observer(Form);