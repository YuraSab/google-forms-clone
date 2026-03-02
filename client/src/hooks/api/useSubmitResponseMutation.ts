import { api } from '../../store/generated/graphql';

export const useSubmitResponseMutation = () => {
    const [submitResponse, { isLoading }] = api.useSubmitResponseMutation();
    
    return {
        submitResponse,
        isLoading
    };
};