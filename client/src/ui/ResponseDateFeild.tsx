import type { AnswerValue } from "../types/forms";
import styles from "./ResponseFields.module.css";

interface Props {
    question: { title: string };
    value: AnswerValue;
    onChange: (val: AnswerValue) => void;
}

export const ResponseDateFeild = ({ question, value, onChange }: Props) => (
    <div className={styles.card}>
        <label className={styles.title}>{question.title}</label>
        <input 
            type="date"
            className={styles.input}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);