import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {red} from "@mui/material/colors";
import {buttonClasses} from "@mui/material";

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    xType?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = (

    {
        xType,
        className,
        disabled,
        ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalClassName = s.button + ' ' + s.default
        + (disabled ? ' ' + s.disabled : '')
    + (xType === 'red' ? ' ' + s.red : xType === 'secondary' ? ' ' + s.secondary : '')
    + (className ? ' ' + className : '')




        // + (className ? s.disabled + className : '')// + (disabled
        // + (className ? s.red : '')//         ? ...
        // //         : xType === 'red'
        // //             ? ...
        // + (className ? ' ' + className : '') // задачка на смешивание классов

    return (
        <button
            disabled={disabled}
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}

export default SuperButton
