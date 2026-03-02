import { api } from '../../store/generated/graphql';

export const useFormsQuery = () => {
    const { data, isLoading, error } = api.useGetFormsQuery(undefined,  { refetchOnMountOrArgChange: true });
    
    return {
        forms: data?.forms || [],
        isLoading,
        error
    };
};