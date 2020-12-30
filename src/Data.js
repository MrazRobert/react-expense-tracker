const Data = ({item, removeItem}) => {
    const {id, name, date, amount} = item;
    return (
        <tr>
            <td>{name}</td>
            <td>{date}</td>
            <td>${amount}</td>
            <td className="td-button">
                <button 
                    className="btn"
                    onClick={() => removeItem(id)}
                >
                    X
                </button>
            </td>
        </tr>
    );
}

export default Data;