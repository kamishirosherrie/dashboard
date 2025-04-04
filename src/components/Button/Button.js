import classNames from 'classnames/bind'
import styles from './Button.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    hover,
    add,
    editBtn,
    deleteBtn,
    cancel,
    normal,
    submit,
    fullWidth,
    className,
    children,
    disabled,
    onClick,
    ...passProp
}) {
    let Component = 'button'
    const props = {
        onClick,
        ...passProp,
    }

    if (disabled) {
        delete props.onClick
    }

    if (to) {
        props.to = Component = Link
    } else if (href) {
        props.href = href
        Component = 'a'
    }

    const classNames = cx('wrapper', {
        hover,
        add,
        editBtn,
        deleteBtn,
        cancel,
        submit,
        normal,
        fullWidth,
        disabled,
        [className]: className,
    })

    return (
        <Component className={classNames} {...props}>
            <span className={cx('text')}>{children}</span>
        </Component>
    )
}

export default Button
