import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import data from '../../data/2020-01/regionalStats.json';

type dataShape = typeof data[0];
type keys = keyof dataShape;


const sortByMetric = (metric: keys) => (a: dataShape, b: dataShape) => (a[metric] < b[metric]) ? 1 : -1;

export default function () {
  const [metric, setMetric] = React.useState<keys>('destroyed');
  const [ignoreForge, setIgnoreForge] = React.useState(false);
  return (
    <>
      <h1>Regional Stats</h1>
      <select value={metric} onChange={e => { setMetric(e.target.value as any as keys) }}>
        {Object.keys(data[0]).filter(key => key !== 'name').map(m => (
          <option value={m}>{m}</option>
        ))}
      </select>
      <button type="button" onClick={() =>
        setIgnoreForge(currentIgnoreForge =>
          !currentIgnoreForge
        )
      }>
        {ignoreForge ? 'Include The Forge' : 'Hide The Forge'}
      </button>
      <BarChart
        width={2000}
        height={1000}
        data={ignoreForge ? data.filter(region => region.name !== 'The Forge').sort(sortByMetric(metric)) : data.sort(sortByMetric(metric))}
        margin={{
          top: 5, right: 30, left: 100, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => {
          if (typeof value === 'number') {
            return `${new Intl.NumberFormat('en').format(Math.round(value))}`
          }
          return value;
        }} />
        <Legend />
        <Bar dataKey={metric} fill="#8884d8" />
      </BarChart>
    </>
  )
}
