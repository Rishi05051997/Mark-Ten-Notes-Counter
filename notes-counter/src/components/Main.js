import './../components/Main.module.css'
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
            marginLeft: '11rem'
        },
    },
}));

export default function Main() {
    const classes = useStyles();
    let Notes = [2000, 500, 200, 100, 50, 20, 10, 5, 1]
    let [amount, setAmount] = useState('');
    let [cash, setCash] = useState();
    const [totalAmount, setTotalAmount] = useState('');
    const [notes, setNotes] = useState(Notes);
    let [notesCounter, setNotesCounter] = useState([]);
    const [displayTable, setDisplayTable] = useState(false);
    let formIsValid = false;
    const [noOfNotes, setNoOfNotes] = useState();
    const [error, setError] = useState(false);
    const [zeroValueError, setzeroValueError] = useState(false);
    if (amount && cash) {
        formIsValid = true;
    }
    
    

    const compareCashNAmount = (amount, cash) => {
        if(amount < 0){
            setzeroValueError(true);
            setDisplayTable(false)
        }
        else if (amount > cash) {
            setError(true);
            setDisplayTable(false)
            setzeroValueError(false);
        }
        else if (amount === cash) {
            setError(true);
            setDisplayTable(false)
            setzeroValueError(false);
        }

        else {
            let updatedCash = parseInt(cash) - parseInt(amount)
            setError(false);
            setzeroValueError(false);
            // console.log(updatedCash);
            setTotalAmount(updatedCash)
            // setCash(updatedCash);  
            gettingNofOfNotes(updatedCash);
        }
    }

    const gettingNofOfNotes = (cash) => {
        // console.log(cash)
        notesCounter = Array(9).fill(0)
        // debugger
        let Cash = cash;

        for (let i = 0; i < notes.length; i++) {
            if (parseInt(Cash) >= notes[i]) {
                setNotes(notes)
                notesCounter[i] = (Math.floor(Cash / notes[i]));
                Cash = Cash - (notesCounter[i] * notes[i]);
                setNotesCounter(notesCounter)
                setDisplayTable(true)
                
                
            }
        }
        // debugger;
        // console.log(amount, notesCounter, notes)
        setNoOfNotes(notesCounter.reduce((a, b) => a + b, 0))
        
    }

    



    const OnFormSubmit = (e) => {
        e.preventDefault();
        
        compareCashNAmount(parseInt(amount), parseInt(cash));
        
        setAmount('');
        setCash('');

    }





    return (
        <div className="card">
            <div class="form">
                <form className={classes.root} noValidate autoComplete="off" onSubmit={OnFormSubmit}>
                    <h3>Cash Register Manager</h3>
                    <p>Enter the bill amount and cash given by the customer and know minimum number of notes to return.</p>
                    <div>
                        <TextField

                            id="outlined-error"
                            label="Enter Bill Amount"
                            variant="outlined"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />


                    </div><br />
                    {
                        amount &&
                        <div>
                            <TextField

                                id="outlined-error"
                                label="Enter Cash Given"

                                variant="outlined"
                                type="number"
                                value={cash}
                                onChange={(e) => setCash(e.target.value)}
                            />


                        </div>
                    }
                    {
                        amount && cash &&
                        <Button type="submit" disabled={!formIsValid} variant="contained" color="primary">
                            Check
                        </Button>
                    }
                </form>
            </div>
            {
                zeroValueError && <p className="error-p">Bill Amount Should be greater than (0) zero</p>
            }
            {
                error && <p className="error-p">Either Cash is less than bill or Cash is equal to Bill Amount, please enter right amount</p>
            }
            {

                displayTable &&
                
                <div className="flex">
                    <h2>Change</h2>
                    <div className="ul1">
                        <h4>Notes In INR</h4>
                        <ul >
                            {

                                notes.map((note) => {
                                    return (<li>{note}</li>)
                                })
                            }

                        </ul>
                        <span  className="span">Diffrence  - {totalAmount} RS</span>
                    </div>
                    <div className="ul1">
                        <h4>No Of Notes</h4>
                        <ul >
                            {

                                notesCounter.map((note, i) => {
                                    return (<li key="i">{note}</li>)
                                })
                            }
                        </ul>
                        <span className="span">Min No Of Notes - {noOfNotes}</span>
                    </div>


                </div>
            }


        </div>
    );
}