import { api } from '../../store/generated/graphql';

export const useFormQuery = (id: string) => {
    const { data, isLoading, error } = api.useGetFormQuery({ id });

    return {
        form: data?.form,
        isLoading,
        error
    };
};