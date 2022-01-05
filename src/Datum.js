import React from 'react';

function GetToday(){
    let today = new Date();

    let day = today.getDate(); // Tag

    // Monatsangabe startet bei 0!
    let month = today.getMonth()+1; // Monat

    let year = today.getFullYear(); // Jahr
    if(day < 10) {
            day = '0'+ day;
    }
    if(month < 10) {
            month = '0'+ month;
    }
    today = day + '.' + month + '.' + year;

    return today;
}

export default GetToday;