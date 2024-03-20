import { useState, memo } from 'react'
import useSWR from 'swr'
import { Button, Drawer, Input, Textarea } from '@components'



const Form = ({ show, setShow, filters, setfilters }) => {
    const [values, setValues] = useState({'name': '', 'company': '', 'experience': '', 'job_desc': ''})
    const handleSubmit = () => {
        setfilters(values)
        setShow(!show)
    }



    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <div className='grid grid-flow-row gap-2'>
                <p className='font-medium text-xl'>Cover Letter124 Form</p>
                <hr className='mb-2' />
                <Input
                    name='name'
                    onChange={e=> setValues({...values, name: e.target.value})}
                    value={values.name}
                    ph='name'
                    onBlur={""}
                    label='name'
                />
                <Input
                    name='company'
                    onChange={e=> setValues({...values, company: e.target.value})}
                    value={values.company}
                    ph='company'
                    onBlur={""}
                    label='Company'
                />
                <Input
                    name='experience'
                    onChange={e=> setValues({...values, experience: e.target.value})}
                    value={values.experience}
                    ph='experience'
                    onBlur={""}
                    label='Experience'
                />

                <Textarea
                    name='job_des'
                    onChange={e=> setValues({...values, job_desc: e.target.value})}
                    value={values.job_desc}
                    ph='job description'
                    onBlur={""}
                    label='Job Description'
                />
                <div className='pt-4 space-y-2'>
                    <Button label='Generate' fill onClick={handleSubmit} />
                    <Button label='Cancel' onClick={() => setShow(false)} />
                </div>
            </div>
        </Drawer>
    )
}

export default memo(Form)
