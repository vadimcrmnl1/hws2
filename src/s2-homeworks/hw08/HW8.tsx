import React, {useState} from 'react'
import {CheckUsersAC, homeWorkReducer, SortNameAC} from './bll/homeWorkReducer'
import s from './HW8.module.css'
import s2 from '../../s1-main/App.module.css'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import User from './User'

/*
* 1 - дописать типы и логику (сортировка по имени, фильтрация по совершеннолетию) homeWorkReducer, проверить тестом
* 2 - дописать компоненту User
* 3 - сделать стили в соответствии с дизайном
* */

export type UserType = {
    _id: number
    name: string
    age: number
}

const initialPeople: UserType[] = [
    // студенты могут поменять имя/возраст/количество объектов, _id должны быть целочисленные
    {_id: 0, name: 'Никита', age: 6},
    {_id: 1, name: 'Вероника', age: 30},
    {_id: 2, name: 'Толя', age: 64},
    {_id: 3, name: 'Игорек', age: 31},

]

const HW8 = () => {
    const [people, setPeople] = useState<UserType[]>(initialPeople)
    const [currentSort, setCurrentSort] = useState('')

    const finalPeople = people.map((u: UserType) => <User key={u._id} u={u}/>)

    const sortUp = () => {
        setPeople(
            homeWorkReducer(initialPeople, {type: 'sort', payload: 'up'})
        ) // в алфавитном порядке a.name > b.name
        SortNameAC('up')

    }

    const sortDown = () => {
        setPeople(
            homeWorkReducer(initialPeople, {type: 'sort', payload: 'down'})
        ) // в обратном порядке a.name < b.name}
        SortNameAC('down')

    }
    const check18 = () => {
        setPeople(
            homeWorkReducer(initialPeople, {type: 'check', payload: 18})
        ) // совершеннолетние
        CheckUsersAC(18)

    }

    return (
        <div id={'hw3'}>
            <div className={s2.hwTitle}>Homework #8</div>
            <div className={s2.hw}>
                <div className={s.container}>
                    <div className={s.buttonsContainer}>
                        <SuperButton
                            className={s.button}
                            id={'hw8-button-up'}
                            onClick={sortUp}
                            xType={currentSort === 'up' ? '' : 'secondary'}
                        >
                            Sort up
                        </SuperButton>
                        <SuperButton
                            className={s.button}
                            id={'hw8-button-down'}
                            onClick={sortDown}
                            xType={currentSort === 'down' ? '' : 'secondary'}
                        >
                            Sort down
                        </SuperButton>
                        <SuperButton
                            className={s.button}
                            id={'hw8-button-18'}
                            onClick={check18}
                            xType={currentSort === '18' ? '' : 'secondary'}
                        >
                            Check 18+
                        </SuperButton>
                    </div>

                    <table id={'hw8-users'} className={s.users}>
                        <thead className={s.thead}>
                        <tr>
                            <td className={s.nameCol}>Full name</td>
                            <td className={s.ageCol}>Age</td>
                        </tr>
                        </thead>

                        <tbody>{finalPeople}</tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HW8
