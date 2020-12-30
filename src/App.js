import './App.css';
import {useState, useEffect, useRef} from 'react';
import Data from './Data';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list) {
    return (JSON.parse(localStorage.getItem('list')));
  }else {
    return [];
  }
} 

function App() {

  const [list, setList] = useState(getLocalStorage());
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({show: false, type: "", msg: ""});
  const inputField = useRef('');

  useEffect(() => {
    inputField.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !date || !amount) {
      showAlert(true, "danger", "Please enter value!");
    }else {
      const newItem = {
        id: new Date().getTime().toString(),
        name: name,
        date: date,
        amount: amount
      };
      showAlert(true, "success", "Expense added to the list!");
      setList([...list, newItem]);
      setName('');
      // setDate('');
      setAmount('');
    }
  }

  const removeItem = (id) => {
    showAlert(true, "danger", "Item deleted from the list!");
    setList(list.filter((item) => {
      return item.id !== id;
    }));
  }

  const showAlert = (show=false, type="", msg="") => {
    setAlert({show, type, msg});
  }

  return (
    <section>
      <h1>Expense Tracker</h1>
      <h2>Add A New Item:</h2>
      <div className="alert-container">
        {alert.show && <Alert 
                          {...alert}
                          removeAlert={showAlert}
                          list={list}
                        />
        }
      </div>
      <form className="form">
        <div>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            className="input" 
            placeholder="Where was the expense made?" 
            value={name}
            ref={inputField}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input 
            type="date" 
            id="date" 
            className="input" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <label htmlFor="amount">Amount:</label>
          <input 
            type="text" 
            id="amount" 
            className="input" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </form>
      <div className="button-container">
        <button 
          type="submit" 
          className="btn" 
          onClick={handleSubmit}
        >
          Add Expense
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ?
            <tr>
              <td className="base-row">No expenses added yet!</td>
              <td className="base-row"></td>
              <td className="base-row"></td>
              <td className="base-row"></td>
            </tr> 
            :
            list.map((item) => {
              return (
                <Data 
                  key={item.id} 
                  item={item} 
                  removeItem={removeItem} 
                />
              )
            })
          }
        </tbody>
      </table>
    </section>
  );
}

export default App;
