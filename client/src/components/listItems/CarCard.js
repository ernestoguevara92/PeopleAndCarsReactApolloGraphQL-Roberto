import { useState } from 'react'
import { Card } from 'antd'
import { useQuery } from '@apollo/client'
import { GET_CARS } from '../../queries'
import { EditOutlined } from '@ant-design/icons'
import RemoveCar from '../buttons/RemoveCar'
import UpdateCar from '../forms/UpdateCar'

const getStyles = () => ({
    card: {
        width: '455px',
        backgroundColor: '#f1d1d1',
    },
    list: {
        display: 'flex',
        justifyContent: 'center',
    }
})

const CarCard = props => {
    const { id , make, model, year, price, personId , people } = props;
    const styles = getStyles();

    const [editMode, setEditMode] = useState(false);

    const handleButtonClick = () => setEditMode(!editMode);

    const { loading, error, data } = useQuery(GET_CARS, {
        variables: { personId: id }
    });

    if (loading) return 'Loading...';
    if (error) return `Error from Cars component! ${error.message}`; 

    console.log("Person cars data: ", data.personCars);

    return (
        <>
            {editMode ?
                <UpdateCar 
                    id={id}
                    make={make}
                    model={model}
                    year={year}
                    price={price}
                    personId={personId}
                    people={people}
                    onButtonClick={handleButtonClick} />
                    :
            <Card style={styles.card}
                actions={[
                    <EditOutlined key='edit' onClick={handleButtonClick} />,
                    <RemoveCar id={id} />
                ]}>
                {make} {model}, {year}, ${price}
            </Card>
    }
        </>
    )
}

export default CarCard;