// import classNames from 'classnames/bind'
// import styles from './Table.module.scss'

// const cx = classNames.bind(styles)

function Table({ headings, children }) {
    return (
        <div className="w3-container">
            <table className="w3-table w3-striped w3-bordered w3-hoverable">
                <thead>
                    <tr className="w3-light-grey">
                        {headings.map((heading, index) => (
                            <th key={index}>{heading}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    )
}

export default Table
