import React from 'react';
import {
    Select,
} from 'antd';


export default function OptionsObject(){
    const OPTIONS = [
        'project task',
        'js task',
        'codewars',
        'test',
        'crosscheck',
        'review',
        'broadcast live',
        'self education',
        'meetup',
        'interview',
        'presentation',
    ];
    const optionBlock = [];
    for (let i = 0; i < OPTIONS.length; i += 1) {
        const option = <Select.Option key={OPTIONS[i]} value={OPTIONS[i]}>{OPTIONS[i]}</Select.Option>
        optionBlock.push(option);
    }
    return optionBlock;
}