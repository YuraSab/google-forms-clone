import { useParams, Link } from "react-router-dom";
import { useFormResponsesQuery } from "../hooks/api/useFormResponsesQuery";
import { useFormQuery } from "../hooks/api/useFormQuery";
import { parseAnswerValue } from "../utils/formHelpers";
import Loader from "../ui/Loader";
import styles from "./FormResponses.module.css";

const FormResponses = () => {
    const { id } = useParams();
    const { form, isLoading: isLoadingForm } = useFormQuery(id || '');
    const { responses, isLoading: isLoadingResp } = useFormResponsesQuery(id || '');

    if (isLoadingForm || isLoadingResp) return <Loader />;

    const hasResponses = responses && responses.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link 
                    to={hasResponses ? `/forms/${id}/fill` : "/"} 
                    className={styles.backLink}
                >
                    {hasResponses ? "← Back to form" : "← On the main one"}
                </Link>
                <h1 className={styles.title}>Results: {form?.title}</h1>
                {hasResponses && (
                    <p className={styles.countText}>Total answers: {responses.length}</p>
                )}
            </div>

            <div className={styles.tableContainer}>
                {!hasResponses ? (
                    <div className={styles.emptyState}>
                        No responses have been received yet.
                    </div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                {form?.questions.map((q) => (
                                    <th key={q.id}>{q.title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {responses.map((resp, index) => (
                                <tr key={resp.id}>
                                    <td className={styles.indexCell}>{index + 1}</td>
                                    {form?.questions.map((q) => {
                                        const answer = resp.answers.find(a => a.questionId === q.id);
                                        const parsedValue = parseAnswerValue(answer?.value);

                                        return (
                                            <td key={q.id}>
                                                {Array.isArray(parsedValue) ? (
                                                    parsedValue.map((item) => (
                                                        <span key={item} className={styles.tag}>{item}</span>
                                                    ))
                                                ) : (
                                                    parsedValue || '-'
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default FormResponses;