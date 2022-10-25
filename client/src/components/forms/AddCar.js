import { useState, useEffect } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { ADD_CAR, GET_CARS } from '../../queries';


const { Option } = Select;

const AddCar = () => {
    //const [id] = useState(uuidv4());
    const [addCar] = useMutation(ADD_CAR);

    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = values => {
        const { year, make, model, price, personId} = values;
        const id = uuidv4();
        
        addCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId
            },
            refetchQueries: [{query: GET_CARS, variables: {personId}}]
        })

        form.resetFields();
    }

    return (
        <Form
            form={form} 
            onFinish={onFinish}
            name='add-car-form' size='medium'
            layout='inline' 
            style={{marginBottom: '40px'}}>
            <Form.Item name='make' style={{marginBottom: '8px', width: '17%'}}
               rules={[{ required: true, message: 'Please input car make!'}]}>
                <Input placeholder='Toyota' />
            </Form.Item>
            <Form.Item name='model' style={{marginBottom: '8px', width: '17%'}}
               rules={[{ required: true, message: 'Please input car model!'}]}>
                <Input placeholder='Corolla' />
            </Form.Item>
            <Form.Item name='year' style={{marginBottom: '8px'}}
               rules={[{ required: true, message: 'Please input car year!'}]}>
                <InputNumber placeholder='2022' max={2022}/>
            </Form.Item>
            <Form.Item name='price' style={{marginBottom: '8px'}}
               rules={[{ required: true, message: 'Please input car price!'}]}>
                <InputNumber placeholder='$40000.00' formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}/>
            </Form.Item>
            <Form.Item name='personId' style={{marginBottom: '8px', width: '19%'}}
               rules={[{ required: true, message: 'Please select person ID!'}]}>
                <Select>
                    <Option value="3">Steven</Option>
                </Select>
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button type='primary' htmlType='submit'
                    disabled={
                        !form.isFieldsTouched(true) || 
                        form.getFieldsError().filter(({errors}) => errors.length).length
                        }>
                        Add Car
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default AddCar;