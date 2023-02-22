import React from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

// добавить в проект иконки и импортировать
const downIcon = <ArrowDropDownIcon/>
const upIcon = <ArrowDropUpIcon/>
const noneIcon = <UnfoldMoreIcon/>

export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {

    if (sort === '') {
        return down
    }
    if (sort === down) {
        return up
    }
    if (sort === up) {
        return ''
    }
    if (sort !== down && sort !== up) {
        return down
    }
    return ''
    // const sorting = sort === '' ? down : up
    // // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
    // return sorting // исправить
}

const SuperSort: React.FC<SuperSortPropsType> = (
    {
        sort, value, onChange, id = 'hw15',
    }
) => {
    const up = '0' + value
    const down = '1' + value

    const onChangeCallback = () => {

        onChange(pureChange(sort, down, up))
    }

    const icon = sort === down
        ? downIcon
        : sort === up
            ? upIcon
            : noneIcon

    return (
        <span
            id={id + '-sort-' + value}
            onClick={onChangeCallback}
        >
            {/*сделать иконку*/}
            {/*<img*/}
            {/*    id={id + '-icon-' + sort}*/}
            {/*    src={icon}*/}
            {/*/>*/}

            {icon} {/*а это убрать*/}
        </span>
    )
}

export default SuperSort
