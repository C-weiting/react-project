import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import action from '@/store/action/counter';
import { getArticleList } from "@/api/blog";

class Home extends React.Component {
    componentDidMount () {
        getArticleList().then(
            (res) => {
                console.log("get article response:", res);
            },
            (error) => {
                console.log("get response failed!");
            }
        );
    }
    handleClick = () => {
        this.props.add()
    }
    render () {
        return (
            <>
                <div className="home-content">Home</div>
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