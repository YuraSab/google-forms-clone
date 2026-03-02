import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCreateFormMutation } from "../hooks/api/useCreateFormMutation";
import type { RootState } from "../store";
import { setTitle, setDescription, addQuestion, updateQuestion, removeQuestion, resetBuilder } from "../store/slices/builderSlice";
import { QuestionField } from "../ui/QuestionField";
import { Button } from "../ui/Button";
import Loader from "../ui/Loader";
import styles from "./FormBuilder.module.css";
import { prepareFormPayload, validateFormData } from "../utils/formHelpers";

const FormBuilder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { title, description, questions } = useSelector((state: RootState) => state.builder);
    const { createForm, isLoading } = useCreateFormMutation();

    const handleCreateForm = async () => {
        const error = validateFormData({ title, description, questions });
        if (error) 
            return alert(error);

        const payload = prepareFormPayload({ title, description, questions });

        try {
            await createForm(payload).unwrap();
            dispatch(resetBuilder());
            navigate('/');
        } catch (error) {
            console.error('Save error:', error);
        }
    };

    if (isLoading) return <Loader />;

    return (
        <div className={styles.container}>
            <div className={styles.formHeader}>
                <input 
                    className={styles.inputTitle}
                    placeholder="Form Title"
                    type="text"
                    value={title}
                    onChange={(e) => dispatch(setTitle(e.target.value))} 
                />
                <input 
                    className={styles.inputDesc}
                    placeholder="Form Description"
                    type="text"
                    value={description}
                    onChange={(e) => dispatch(setDescription(e.target.value))} 
                />
            </div>
            <div className={styles.questionsList}>
                {questions.map((q) => (
                    <QuestionField 
                        key={q.id} 
                        question={q}
                        onChange={(fields) => dispatch(updateQuestion({ id: q.id, fields }))}
                        onRemove={() => dispatch(removeQuestion(q.id))}
                    />
                ))}
            </div>
            <div className={styles.bottomActions}>
                <Button variant="secondary" onClick={() => dispatch(addQuestion())}>
                    + Add Question
                </Button>
                <Button onClick={handleCreateForm} disabled={isLoading}>
                    Save and Publish
                </Button>
            </div>
        </div>
    );
};

export default FormBuilder;