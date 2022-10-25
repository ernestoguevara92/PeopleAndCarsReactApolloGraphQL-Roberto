//import { useState } from 'react'
import { Card, List } from 'antd'
import { useQuery } from '@apollo/client'
import { GET_CARS } from '../../queries'
//import { EditOutlined } from '@ant-design/icons'

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

const Car = props => {
    const { id } = props;
    const styles = getStyles();

    //const [editMode, setEditMode] = useState(false);

    //const handleButtonClick = () => setEditMode(!editMode);

    const { loading, error, data } = useQuery(GET_CARS, {
        variables: { personId: id }
    });

    if (loading) return 'Loading...';
    if (error) return `Error from Cars component! ${error.message}`; 

    console.log("Person cars data: ", data.personCars);

    return (
        <>
            <List grid={{gutter: 20, column: 1}} style={styles.list}>
            {data.personCars.map(({id, make, model, personId, price, year}) => (
                <List.Item key={id}>
                    <Card style={styles.card}>
                     {make} {model}, {year}, ${price}
                    </Card>
                </List.Item>
            ))}
            </List> 
        </>
    )
}

export default Car;