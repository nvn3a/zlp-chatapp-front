import React, { Component } from 'react';
import { Avatar } from 'antd';
import { connect } from 'react-redux';
import { setChatWith, setChatHistory } from '../../actions';
import axios from 'axios';

class GroupCell extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const that = this;
        this.props.setChatWith(this.props.id, {name: this.props.name, members: this.props.members});
        axios.post('http://127.0.0.1:8000/api/get-messages', {
            personal_message: false,
            group_id: this.props.id
        }).then(function(res) {
            that.props.setChatHistory(res.data);
        });
    }

    render() {
        return (
            <div className='cell' onClick={this.handleClick}>
                <Avatar size={48} icon="team" />
                <div className='info'>
                    <span className='display-name'>{this.props.name}</span>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setChatWith: (id, detail) => {
            dispatch(setChatWith(false, id, detail));
        },
        setChatHistory: (arr) => {
            dispatch(setChatHistory(arr));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupCell);

// {/* <span className='lastest-msg'>ashdjasdasdasdasdasdasdasdasdasdasdasd</span> */}
