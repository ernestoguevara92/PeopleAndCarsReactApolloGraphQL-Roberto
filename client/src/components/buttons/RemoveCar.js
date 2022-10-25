import { DeleteOutlined } from "@ant-design/icons"
import { useMutation } from "@apollo/client"
import { REMOVE_CAR, GET_CARS } from "../../queries"
import filter from 'lodash.filter'

const RemoveCar = ({id}) => {
    const [removeCar] = useMutation(REMOVE_CAR, {
        update(cache, { data: { removePerson }}) {
            const { personCars } = cache.readQuery({ query: GET_CARS })
            cache.writeQuery({
                query: GET_CARS,
                data: {
                    personCars: filter(personCars, o => {
                        return o.id !== removePerson.id
                    })
                }
            })
        }
    })

    const handleButtonClick = () => {
        let result = window.confirm("Are you sure you want to remove this car?")

        if (result) {
            removeCar({
                variables: {
                    id
                }
            })
        }
    }

    return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{color: 'red'}} />
}

export default RemoveCar