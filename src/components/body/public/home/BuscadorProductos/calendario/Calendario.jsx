import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendario.css'; 

const Calendario = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = date => {
    console.log('Fecha de inicio seleccionada:', formatDate(date));
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    console.log('Fecha de fin seleccionada:', formatDate(date));
    setEndDate(date);
  };

  const formatDate = date => {
    return date.toLocaleDateString('en-CA'); // Cambia 'en-CA' según tu preferencia de idioma y región
  };

  const unavailableDates = [new Date("2024-03-15"), new Date("2024-03-16"), new Date("2024-03-17")]; // Ejemplo de fechas no disponibles

  const highlightUnavailableDates = date => {
    return unavailableDates.some(unavailableDate => 
      new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() === unavailableDate.getTime()
    );
  };

  const dayClassNames = date => {
    if (highlightUnavailableDates(date)) {
      return 'unavailable-date';
    }
    return null;
  };

  return (
    <div className='calendario-contenedor-principal'>
      <div className="calendario-centrado">
        <DatePicker
          className='clendaroio1'
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          highlightDates={highlightUnavailableDates}
          dayClassName={dayClassNames}
        />
      </div>
      <div className="calendario-centrado">
        <DatePicker
         className='clendaroio2'
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          highlightDates={highlightUnavailableDates}
          dayClassName={dayClassNames}
        />
      </div>
    </div>
  );
}

export default Calendario;




