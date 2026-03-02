import type { AnswerValue } from "../types/forms";
import styles from "./ResponseFields.module.css";

interface Props {
    question: { title: string };
    value: AnswerValue;
    onChange: (val: string) => void;
}

export const ResponseTextField = ({ question, value, onChange }: Props) => (
    <div className={styles.card}>
        <label className={styles.title}>{question.title}</label>
        <input 
            type="text"
            className={styles.input}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter the answer..."
        />
    </div>
);