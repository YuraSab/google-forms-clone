import type { Question } from "../store/generated/graphql";
import type { AnswerValue } from "../types/forms";

interface BuilderData {
    title: string;
    description: string;
    questions: Question[]; 
}

export const validateFormData = ({ title, questions }: BuilderData) => {
    if (!title.trim()) return "Title is required.";
    if (!questions.length) return "Add at least one field.";
    return null;
};

export const prepareFormPayload = ({ title, description, questions }: BuilderData) => {
    return {
        title: title,
        description: description,
        questions: questions.map(({ title, type, options }) => ({
            title,
            type,
            options: options || [],
        })),
    };
};

export const prepareResponsePayload = (formId: string, answers: Record<string, AnswerValue>) => {
    return {
        formId,
        answers: Object.entries(answers).map(([questionId, value]) => ({
            questionId,
            value: Array.isArray(value) ? JSON.stringify(value) : value
        }))
    };
};

export const parseAnswerValue = (value: string | null | undefined): string[] | string | null => {
    if (!value) return null;
    if (value.startsWith('[')) {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }
    return value;
};