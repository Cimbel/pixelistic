import React  from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

export const CustomTime = (props) => {
    TimeAgo.locale(en);
    const timeAgo = new TimeAgo('en-US')
    return <p className="light-grey date">{timeAgo.format(props.timestamp)}</p>
}

export default CustomTime;
