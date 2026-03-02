import { QuestionType, type Question } from "../store/generated/graphql";
import { Button } from "./Button";
import styles from "./QuestionField.module.css";

interface Props {
    question: Omit<Question, 'id'>;
    onChange: (fields: Partial<Question>) => void;
    onRemove: () => void;
}

export const QuestionField = ({ question, onChange, onRemove }: Props) => {
    
    const handleOptionChange = (index: number, val: string) => {
        const newOptions = [...(question.options || [])];
        newOptions[index] = val;
        onChange({ options: newOptions });
    };

    const addOption = () => {
        onChange({ options: [...(question.options || []), ""] });
    };

    const removeOption = (index: number) => {
        onChange({ options: (question.options || []).filter((_, i) => i !== index) });
    };

    const hasOptions = question.type === QuestionType.MultipleChoice || question.type === QuestionType.Checkbox;

    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <input 
                    className={styles.inputTitle}
                    type="text" 
                    placeholder="Question title"
                    value={question.title}
                    onChange={(e) => onChange({ title: e.target.value })}
                />
                <select 
                    className={styles.selectType}
                    value={question.type}
                    onChange={(e) => onChange({ type: e.target.value as QuestionType })}
                >
                    <option value={QuestionType.Text}>Text</option>
                    <option value={QuestionType.Date}>Date</option>
                    <option value={QuestionType.MultipleChoice}>Multiple Choice</option>
                    <option value={QuestionType.Checkbox}>Checkbox</option>
                </select>
                <button className={styles.removeBtn} onClick={onRemove}>
                    Delete question
                </button>
            </div>
            {hasOptions && (
                <div className={styles.optionsSection}>
                    {question.options?.map((opt, idx) => (
                        <div key={idx} className={styles.optionRow}>
                            <span className="text-gray-400">•</span>
                            <input 
                                className={styles.inputOption}
                                type="text" 
                                placeholder={`Option ${idx + 1}`}
                                value={opt || ""}
                                onChange={(e) => handleOptionChange(idx, e.target.value)}
                            />
                            <button className={styles.removeBtn} onClick={() => removeOption(idx)}>
                                ✕
                            </button>
                        </div>
                    ))}
                    <Button 
                        variant="secondary" 
                        onClick={addOption}
                        style={{ padding: '4px 12px', fontSize: '0.8rem', marginTop: '10px' }}
                    >
                        + Add option
                    </Button>
                </div>
            )}
        </div>
    );
};