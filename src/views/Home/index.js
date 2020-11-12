import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import action from '@/store/action/counter';

class Home extends React.Component {
    handleClick = () => {
        this.props.add()
    }
    render () {
        return (
            <>
                <div>Home</div>
                <div>{this.props.count}</div>
                <Button type='primary' onClick={this.handleClick}>react</Button>
            </>

        )
    }
}

const mapStateToProps = state => state.counter

export default connect(
    mapStateToProps,
    action
)(Home);