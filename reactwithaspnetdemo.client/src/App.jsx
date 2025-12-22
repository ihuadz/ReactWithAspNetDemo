import { useEffect, useState } from 'react';

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@heroui/table';
import { Alert } from '@heroui/alert';

function App() {
  const [forecasts, setForecasts] = useState();

  useEffect(() => {
    populateWeatherData();
  }, []);

  const contents =
    forecasts === undefined ? (
      <Alert
        color='warning'
        description={
          <em>
            Please refresh once the ASP.NET backend has started. See{' '}
            <a href='https://aka.ms/jspsintegrationreact'>https://aka.ms/jspsintegrationreact</a>{' '}
            for more details.
          </em>
        }
        title='Loading...'
      />
    ) : (
      <Table aria-label='Example static collection table'>
        <TableHeader>
          <TableColumn>Date</TableColumn>
          <TableColumn>Temp. (C)</TableColumn>
          <TableColumn>Temp. (F)</TableColumn>
          <TableColumn>Summary</TableColumn>
        </TableHeader>
        <TableBody>
          {forecasts.map((forecast, index) => (
            <TableRow key={index}>
              <TableCell>{forecast.date}</TableCell>
              <TableCell>{forecast.temperatureC}</TableCell>
              <TableCell>{forecast.temperatureF}</TableCell>
              <TableCell>{forecast.summary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );

  return (
    <div className='px-5 grid grid-cols-1 gap-y-3 '>
      <h1 className='text-xl font-semibold'>Weather forecast</h1>
      <Alert
        hideIcon
        color='success'
        description='This component demonstrates fetching data from the server.'
      ></Alert>
      {contents}
    </div>
  );

  async function populateWeatherData() {
    const response = await fetch('api/weatherforecast');
    if (response.ok) {
      const data = await response.json();
      setForecasts(data);
    }
  }
}

export default App;
