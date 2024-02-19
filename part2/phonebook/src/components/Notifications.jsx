const Notifications = ({ message, type }) => {
    if (message === null) {
        return null
    }

    else if (type === 'error') {
        return (
            <div className="error">
                {message}
            </div>
        )
    }
    else if (type === 'success') {
        return (
            <div className="success">
                {message}
            </div>
        )
    }
}

export default Notifications