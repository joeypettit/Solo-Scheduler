import {DateTime} from 'luxon'; 
import {useState, useEffect} from 'react';
import './CalNavigation.css';


function CalNavigation({displayReferenceDate, setDisplayReferenceDate}){
    

    console.log('inCalNavigation displayReferenceDate is', displayReferenceDate.toISODate());
    // this helper array is used to assign the month name in displayMonthString
        
        return (
            <div className="cal-nav-bar">
                {/* newDate grabs display date, which is set to a day in the middle of the month
                to avoid issues of grabbing the wrong month due to days that don't exist in each month */}
                <button className="back-btn" onClick={()=>{
                    const prevMonth = displayReferenceDate.minus({months: 1});
                    console.log('in Nav back btn', prevMonth.toISODate());
                    
                    setDisplayReferenceDate(prevMonth);
                }}>⬅️</button>

                <h1>{displayReferenceDate ? displayReferenceDate.toLocaleString({ month: 'long', year: 'numeric' }) : 'no month'}</h1>

                <button className="next-month-btn" onClick={()=>{
                    const nextMonth = displayReferenceDate.plus({months: 1});
                    console.log('in Nav fwd btn', nextMonth.toISODate());
                    
                    setDisplayReferenceDate(nextMonth)}}>➡️</button>
                <button className="today-btn" onClick={()=> {
                    setDisplayReferenceDate(DateTime.now());
                }}>Today</button>
            </div>
        )

    
}

export default CalNavigation;