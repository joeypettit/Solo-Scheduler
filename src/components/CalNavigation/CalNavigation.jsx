import {DateTime} from 'luxon'; 
import {useState, useEffect} from 'react';


function CalNavigation({displayReferenceDate, setDisplayReferenceDate}){
    

    console.log('inCalNavigation displayReferenceDate is', displayReferenceDate.toISODate());
    // this helper array is used to assign the month name in displayMonthString
        
        return (
            <div className="container d-flex flex-row justify-content-around">

                <h1 className='display-2 text-muted'>{displayReferenceDate ? displayReferenceDate.toLocaleString({ month: 'long', year: 'numeric' }) : 'no month'}</h1>

                                

                <div className='d-flex flex-row justify-content-center m-4'>
                    <button className="btn btn-outline-secondary" onClick={()=> {
                        setDisplayReferenceDate(DateTime.now());
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                            <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                        </svg>
                    </button>
                </div>

                {/* newDate grabs display date, which is set to a day in the middle of the month
                to avoid issues of grabbing the wrong month due to days that don't exist in each month */}
                <div className='d-flex flex-row justify-content-center m-4'>
                    <button type="button" className="btn btn-outline-secondary" onClick={()=>{
                        const prevMonth = displayReferenceDate.minus({months: 1});
                        setDisplayReferenceDate(prevMonth);}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={()=>{
                        const nextMonth = displayReferenceDate.plus({months: 1});
                        setDisplayReferenceDate(nextMonth)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                    </button>
                </div>
            </div>
        )

    
}

export default CalNavigation;