import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import st from './../hw08/HW8.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import {useSearchParams} from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'

/*
* 1 - дописать SuperPagination +
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15 +
* 4 - сделать стили в соответствии с дизайном +
* 5 - добавить HW15 в HW5/pages/JuniorPlus +
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}

const getTechs = (params: ParamsType) => {
    return axios
        .get<{ techs: TechType[], totalCount: number }>(
            'https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test3',
            {params}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW15 = () => {
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(4)
    const [idLoading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(100)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<TechType[]>([])

    const sendQuery = (params: any) => {
        setLoading(true)
        getTechs(params)
            .then((res) => {
                // делает студент
                if (res) {


                    // const stateCopy = res.data.techs.map(t => ({...t}))
                    //
                    // if (sort[1] === 't') {
                    //     if (sort === '') {
                    //         return stateCopy
                    //     }
                    //     if (sort === '0tech') {
                    //         stateCopy.sort(function (a, b) {
                    //             let nameA = a.tech.toLowerCase(), nameB = b.tech.toLowerCase()
                    //             if (nameA < nameB)
                    //                 return -1
                    //
                    //             return 0
                    //         })
                    //     }
                    //     if (sort === '1tech') {
                    //         stateCopy.sort(function (a, b) {
                    //             let nameA = a.tech.toLowerCase(), nameB = b.tech.toLowerCase()
                    //             if (nameA > nameB)
                    //                 return -1
                    //
                    //             return 0
                    //         })
                    //     }
                    // }
                    // if (sort[1] === 'd') {
                    //     if (sort[0] === '0') {
                    //         stateCopy.sort(function (a, b) {
                    //             let nameA = a.developer.toLowerCase(), nameB = b.developer.toLowerCase()
                    //             if (nameA < nameB)
                    //                 return -1
                    //             return 0
                    //         })
                    //     }
                    //     if (sort[0] === '1') {
                    //         stateCopy.sort(function (a, b) {
                    //             let nameA = a.developer.toLowerCase(), nameB = b.developer.toLowerCase()
                    //             if (nameA > nameB)
                    //                 return -1
                    //             return 0
                    //         })
                    //     }
                    // }
                    // if (sort[0] === '0') {
                    //     stateCopy.sort(function (a, b) {
                    //         let nameA = a.tech.toLowerCase(), nameB = b.tech.toLowerCase()
                    //         if (nameA < nameB)
                    //             return -1
                    //         return 0
                    //     })
                    // }
                    // if (sort[0] === '1') {
                    //     stateCopy.sort(function (a, b) {
                    //         let nameA = a.tech.toLowerCase(), nameB = b.tech.toLowerCase()
                    //         if (nameA > nameB)
                    //             return -1
                    //         return 0
                    //     })
                    // }
                    setTechs(res.data.techs)
                    setTotalCount(res.data.totalCount)
                    setLoading(false)

                }
                // сохранить пришедшие данные

                //
            })
    }

    const onChangePagination = (newPage: number, newCount: number) => {

        // делает студент
        setCount(newCount)
        setPage(newPage)
        sendQuery({page: newPage, count: newCount})
        const newSearch: { page?: string, count?: string } = page ? {page: '' + newPage, count: '' + newCount} : {}
        const {search, ...restQueries} = Object.fromEntries(searchParams)
        setSearchParams({...newSearch, ...restQueries})

    }

    const onChangeSort = (newSort: string) => {
        setSort(newSort)
        setPage(1)
        sendQuery({page, count, sort: newSort})
        const newSearch: {sort?: string} = sort ? {sort: newSort} : {}
        const {find, ...restQueries} = Object.fromEntries(searchParams)
        setSearchParams({...newSearch, ...restQueries})
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        sendQuery({page: params.page, count: params.count})
        setPage(+params.page || 1)
        setCount(+params.count || 4)
    }, [])


    const mappedTechs = techs.map(t => (
        <tr className={st.item}>
            <td className={st.ageCol1}>
                {t.tech}
            </td>
            <td className={st.ageCol1}>
                {t.developer}
            </td>
        </tr>
    ))

    const hw15FinalClass = idLoading ? s.hw15Block : ''

    return (
        <div id={'hw15'}>
            <div className={s2.hwTitle}>Homework #15</div>
            {idLoading && <div id={'hw15-loading'} className={s.loading}><CircularProgress size={'100px'}/></div>}
            <div className={s2.hw + ' ' + hw15FinalClass}>


                <SuperPagination
                    page={page}
                    itemsCountForPage={count}
                    totalCount={totalCount}
                    onChange={onChangePagination}
                />

                <table id={'hw8-users'} className={st.users + ' ' + s.row}>
                    <thead className={st.thead}>
                    <tr>
                        <td className={st.nameCol}>
                            Tech
                            <SuperSort sort={sort} value={'tech'} onChange={onChangeSort}/></td>

                        <td className={st.ageCol}>
                            Developer
                            <SuperSort sort={sort} value={'developer'} onChange={onChangeSort}/>
                        </td>
                    </tr>
                    </thead>

                    <tbody>{mappedTechs}</tbody>
                </table>


            </div>
        </div>
    )
}

export default HW15
