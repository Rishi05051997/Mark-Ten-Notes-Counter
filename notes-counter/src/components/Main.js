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
    const [totalAmount, setTotalAmount] = useState('');
    const [notes, setNotes] = useState(Notes);
    let [notesCounter, setNotesCounter] = useState([]);
    const [displayTable, setDisplayTable] = useState(false);
    let formIsValid = false;
    const [noOfNotes, setNoOfNotes] = useState();

    if(amount){
        formIsValid = true;
    }
    const OnFormSubmit = (e) => {
        e.preventDefault();

        notesCounter = Array(9).fill(0);
        console.log(notesCounter)
        setTotalAmount(amount)
        parseInt(amount)
        for (let i = 0; i < notes.length; i++) {
            if (parseInt(amount) >= notes[i]) {
                setNotes(notes)
                notesCounter[i] = (Math.floor(amount / notes[i]))
                amount = amount - (notesCounter[i] * notes[i]);
                console.log(amount)
                setAmount(amount)
                console.log(notesCounter[i])
                setNotesCounter(notesCounter)
                setDisplayTable(true)


            }
        }
        console.log(amount, notesCounter, notes)
        // for(let i=0;i<notesCounter.length;i++){
        // debugger;
        setNoOfNotes(notesCounter.reduce((a, b) => a + b, 0))
        console.log(noOfNotes)
        // }


    }





    return (
        <div className="card">
            <div class="form">
                <form className={classes.root} noValidate autoComplete="off" onSubmit={OnFormSubmit}>
                    <h3>CASH REGISTER APP</h3>
                    <div>
                        <TextField

                            id="outlined-error"
                            label="Enter Amount"
                            defaultValue="Hello World"
                            variant="outlined"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />


                    </div>
                    <Button type="submit" disabled={!formIsValid} variant="contained" color="primary">
                        Primary
                    </Button>
                </form>
            </div>
            {
                displayTable &&
                <div className="flex">
                    <div className="ul1">
                        <h4>Notes In INR</h4>
                        <ul >
                            {

                                notes.map((note) => {
                                    return (<li>{note}</li>)
                                })
                            }

                        </ul>
                        <span>Amount - {totalAmount}</span>
                    </div>
                    <div className="ul1">
                        <h4>No Of Notes</h4>
                        <ul >
                            {

                                notesCounter.map((note) => {
                                    return (<li>{note}</li>)
                                })
                            }
                        </ul>
                        <span>Min No Of Notes - {noOfNotes}</span>
                    </div>


                </div>
            }


        </div>
    );
}