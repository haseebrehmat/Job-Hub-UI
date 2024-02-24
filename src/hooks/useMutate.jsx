import useSWRMutation from 'swr/mutation'
import { useFormik } from 'formik'

const useMutate = (url, api, initial, schema, onSubmit, onError, onSuccess) => {
    const { trigger } = useSWRMutation(url, api, {
        onError,
        onSuccess,
    })

    const { values, errors, handleSubmit, handleChange, resetForm } = useFormik({
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
        trigger,
    }
}

export default useMutate
