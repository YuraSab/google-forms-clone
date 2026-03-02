import { Link, useNavigate, useParams } from "react-router-dom";
import { useSubmitResponseMutation } from "../hooks/api/useSubmitResponseMutation";
import { useFormQuery } from "../hooks/api/useFormQuery";
import { QuestionType, type Question } from "../store/generated/graphql";
import { ResponseTextField } from "../ui/ResponseTextField";
import { ResponseDateFeild } from "../ui/ResponseDateFeild";
import { ResponseCheckboxFeild } from "../ui/ResponseCheckboxFeild";
import { ResponseMultipleChoiceFeild } from "../ui/ResponseMultipleChoiceFeild";
import Loader from "../ui/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer, resetFiller } from "../store/slices/fillerSlice";
import { Button } from "../ui/Button";
import styles from "./FormFiller.module.css";
import type { RootState } from "../store";
import { prepareResponsePayload } from "../utils/formHelpers";
import type { AnswerValue } from "../types/forms";

const FormFiller = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { form, isLoading } = useFormQuery(id || '');
    const { answers } = useSelector((state: RootState) => state.filler);
    const { submitResponse, isLoading: isSubmitting } = useSubmitResponseMutation();

    const handleChangeResponse = (questionId: string, value: AnswerValue) => {
        dispatch(setAnswer({ questionId, value }));
    };

    const returnDefaultValue = (type: QuestionType) => type === QuestionType.Checkbox ? [] : '';

    const renderField = (question: Question) => {
        const commonProps = {
            question,
            value: answers[question.id] ?? returnDefaultValue(question.type),
            onChange: (value: AnswerValue) => handleChangeResponse(question.id, value)
        };

        switch(question.type) {
            case QuestionType.Text:
                return <ResponseTextField {...commonProps}/>;
            case QuestionType.Date:
                return <ResponseDateFeild {...commonProps} />;
            case QuestionType.MultipleChoice:
                return <ResponseMultipleChoiceFeild {...commonProps} />;
            case QuestionType.Checkbox:
                return <ResponseCheckboxFeild {...commonProps} />;
            default:
                return null;
        }
    };

    const handleSubmit = async () => {
        if (!id) return;
        
        const payload = prepareResponsePayload(id, answers);

        try {
            await submitResponse(payload).unwrap();
            dispatch(resetFiller());
            navigate('/');
        } catch(error) {
            console.error('Submit error:', error);
        }
    };

    if (isLoading || isSubmitting) return <Loader/>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>{form?.title || "Form Filling"}</h2>
                {form?.description && <p>{form.description}</p>}
            </div>

            <div className={styles.fieldsList}>
                {form?.questions.map((q) => (
                    <div key={q.id} className={styles.fieldCard}>
                        {renderField(q)}
                    </div>
                ))}
            </div>

            <div className={styles.footer}>
                <Link className={styles.link} to={`/forms/${id}/responses`}>
                    ← See responses
                </Link>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Submit Answers'}
                </Button>
            </div>
        </div>
    );
}

export default FormFiller;