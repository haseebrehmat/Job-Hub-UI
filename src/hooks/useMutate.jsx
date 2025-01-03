import useSWRMutation from 'swr/mutation'
import { useFormik } from 'formik'

const useMutate = (url, api, initial, schema, onSubmit, onError, onSuccess = null) => {
    const { trigger, isMutating } = useSWRMutation(url, api, {
        onError,
        onSuccess,
    })

    const { values, errors, handleSubmit, handleChange, resetForm, setFieldValue } = useFormik({
        initialValues: initial,
        validationSchema: schema,
        validateOnChange: true,
        enableReinitialize: true,
        onSubmit,
    })

    return {
        values,
        errors,
        handleSubmit,
        handleChange,
        resetForm,
        setFieldValue,
        trigger,
        wait: isMutating,
    }
}

export default useMutate
