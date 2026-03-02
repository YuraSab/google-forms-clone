import styles from './Loader.module.css';

const Loader = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.scroller}></div>
            <h2>Loading...</h2>
        </div>
    )
}

export default Loader;