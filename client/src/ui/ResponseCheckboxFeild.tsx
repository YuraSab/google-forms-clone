import type { Question } from "../store/generated/graphql";
import type { AnswerValue } from "../types/forms";
import styles from "./ResponseFields.module.css";

interface Props {
    question: Question,
    value: AnswerValue;
    onChange: (val: string[]) => void;
}

export const ResponseCheckboxFeild = ({ question, value, onChange }: Props) => {
    const handleToggle = (opt: string) => {
        const current = Array.isArray(value) ? value : [];
        onChange(current.includes(opt) ? current.filter(i => i !== opt) : [...current, opt]);
    };

    return (
        <div className={styles.card}>
            <p className={styles.title}>{question.title}</p>
            <div className={styles.optionsList}>
                {question.options?.filter((opt) => typeof opt === "string").map((opt) => (
                    <label key={opt} className={styles.optionLabel}>
                        <input 
                            type="checkbox" 
                            checked={value?.includes(opt)}
                            onChange={() => handleToggle(opt)}
                        />
                        <span>{opt}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};