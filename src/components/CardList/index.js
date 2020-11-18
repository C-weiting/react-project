import React from 'react';
import Card from '@/components/Card';
import './card-list.less';

export default function CardList(props) {
    return (
        <ul className="card-list">
                {
                    props.listData.map((item, index) => (
                        <li className="card-item" key={index}>
                            <Card {...item} />
                        </li>
                    ))
                }
            </ul>
    )
}