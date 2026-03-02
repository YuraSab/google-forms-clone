import { api } from '../../store/generated/graphql';

export const useFormResponsesQuery = (formId: string) => {
  const { data, isLoading, error } = api.useGetResponsesQuery({ formId });
  
  return {
    responses: data?.responses || [],
    isLoading,
    error
  };
};