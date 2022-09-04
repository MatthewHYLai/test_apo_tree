import { render, screen } from '@testing-library/react';
import Treemap from './index.js';


test('treemap should be rendered', () => {
    const dummyData = [
        { "name": "A", "weight": 3, "value": -0.02 },
        { "name": "B", "weight": 3, "value": 0.05 },
        { "name": "C", "weight": 6, "value": 0.015 },
        { "name": "D", "weight": 2, "value": -0.01 },
        { "name": "E", "weight": 3, "value": 0.01 }
    ];

  const dummyRowNum = 3;

  render(<Treemap parsedData={dummyData} rowNum={dummyRowNum} />);

  const boxList = screen.findAllByTestId("boxWrap");

  expect(boxList).toHaveLength(5);
});

