import { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import RemovePerson from '../buttons/RemovePerson'
import UpdatePerson from '../forms/UpdatePerson'
import Car from './Car'

const getStyles = () => ({
    card: {
        width: '500px',
        backgroundColor: '#f0f2f5',
        fontSize: 18,
        fontWeight: '700',
    }
})

const Person = props => {
    const { id, firstName, lastName } = props;
    const styles = getStyles();

    const [editMode, setEditMode] = useState(false);

    const handleButtonClick = () => setEditMode(!editMode);

    return (
        <>
            {editMode ?
                <UpdatePerson 
                id={id}
                firstName={firstName}
                lastName={lastName}
                onButtonClick={handleButtonClick} />
                :
                <Card style={styles.card}
                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                        <RemovePerson id={id} />
                    ]}>
                    {firstName} {lastName}
                    <Car id={id} />
                </Card>
            }
        </>
    )
}

export default Person;