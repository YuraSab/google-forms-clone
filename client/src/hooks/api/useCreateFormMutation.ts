import { api } from '../../store/generated/graphql';

export const useCreateFormMutation = () => {
    const [createForm, { isLoading }] = api.useCreateFormMutation();
    
    return {
        createForm,
        isLoading
    };
};