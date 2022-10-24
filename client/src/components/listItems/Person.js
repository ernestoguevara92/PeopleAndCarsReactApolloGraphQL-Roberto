
import { Card } from 'antd'

const getStyles = () => ({
    card: {
        width: '500px',
        backgroundColor: '#f0f2f5',
        fontSize: 18,
        fontWeight: '700',
    }
})

const Contact = props => {
    const { id, firstName, lastName } = props;
    const styles = getStyles();

    return (
        <>
                <Card style={styles.card}>
                    {firstName} {lastName}
                </Card>
        </>
    )
}

export default Contact;