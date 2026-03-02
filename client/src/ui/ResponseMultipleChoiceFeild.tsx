import type { Question } from "../store/generated/graphql";
import type { AnswerValue } from "../types/forms";
import styles from "./ResponseFields.module.css";

interface Props {
    question: Question,
    value: AnswerValue;
    onChange: (val: AnswerValue) => void;
}

export const ResponseMultipleChoiceFeild = ({ question, value, onChange }: Props) => (
    <div className={styles.card}>
        <p className={styles.title}>{question.title}</p>
        <div className={styles.optionsList}>
            {question.options?.map((opt) => (
                <label key={opt} className={styles.optionLabel}>
                    <input 
                        type="radio" 
                        name={question.id}
                        checked={value === opt}
                        onChange={() => onChange(opt!)}
                    />
                    <span>{opt}</span>
                </label>
            ))}
        </div>
    </div>
);