import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


// jest.mock("axios");

// const dummyData = [
//   { "name": "A", "weight": 5, "value": -0.02 },
//   { "name": "B", "weight": 3, "value": 0.05 },
//   { "name": "C", "weight": 6, "value": 0.015 },
//   { "name": "D", "weight": 2, "value": -0.01 },
//   { "name": "E", "weight": 3, "value": 0.01 },
//   { "name": "F", "weight": 6, "value": 0.015 },
//   { "name": "G", "weight": 4, "value": -0.01 },
//   { "name": "H", "weight": 8, "value": 0.01 }
// ]
// ;

// test("todos list", async () => {
// axios.get.mockResolvedValue({ data: dummyTodos });
// render(<Todos />);

// const todoList = await waitFor(() => screen.findAllByTestId("todo"));

// expect(todoList).toHaveLength(3);
// });