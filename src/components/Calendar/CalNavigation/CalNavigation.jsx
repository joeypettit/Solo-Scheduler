import {DateTime} from 'luxon'; 
import {useState, useEffect} from 'react';
import './CalNavigation.css';


function CalNavigation(){
    const [displayedMonth, setDisplayedMonth] = useState();
    const [displayedYear, setDisplayedYear] = useState('');

    // this array is used to assign the month name in displayMonthString
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];

        return (
            <div className='cal-nav-bar'>CalNavBar!</div>
        )

    
}

export default CalNavigation;