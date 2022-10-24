import {useHistory} from 'react-router-dom';

function RegistrationSuccessful({setSuccessModalDisplayed}){
    const history = useHistory();

    return(
        <div>
            <h1>Registration Successful!</h1>
            <h2>Would you like to register for another class with this instructor?</h2>
            <button onClick={()=> setSuccessModalDisplayed(false)}>Yes</button>
            <button onClick={()=> history.push('/student-home')}>No</button>
        </div>
    )

}

export default RegistrationSuccessful;