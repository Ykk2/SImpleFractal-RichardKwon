import styles from './table.module.css'

const Table = ({ data }) => {

    return (
        <table className={styles.table}>
            <tbody className={styles.columns}>
                {Object.entries(data).map(([key, value], i) => (
                    <tr key={i}>
                        <td>{key}:</td>
                        <td>{value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
)}


export default Table;
