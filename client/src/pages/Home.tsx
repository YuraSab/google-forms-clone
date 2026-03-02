import { useNavigate } from 'react-router-dom';
import { useFormsQuery } from '../hooks/api/useFormsQuery';
import styles from './Home.module.css';
import Loader from '../ui/Loader';
import { Button } from '../ui/Button';

const Home = () => {
    const navigate = useNavigate();
    const { forms, isLoading, error } = useFormsQuery();

    if (isLoading) return <Loader />;
    if (error) return <div className={styles.container}>Error loading forms...</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>My Custom Forms</h1>
                <Button onClick={() => navigate('/forms/new')}>
                    Create New Form
                </Button>
            </header>

            {forms?.length === 0 ?
                (
                    <div className={styles.empty}>
                        <p>No forms found. Create your first one!</p>
                    </div>
                )
                :
                (
                    <div className={styles.grid}>
                        {forms?.map((form) => (
                            <div key={form.id} className={styles.card}>
                                <div>
                                    <h3>{form.title}</h3>
                                    <p>{form.description || 'No description provided.'}</p>
                                </div>
                                <div className={styles.actions}>
                                    <Button
                                        variant="primary"
                                        onClick={() => navigate(`/forms/${form.id}/fill`)}
                                    >
                                        Fill Out
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={() => navigate(`/forms/${form.id}/responses`)}
                                    >
                                        Results
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default Home;