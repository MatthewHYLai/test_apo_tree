
import { useCallback, useState } from 'react';

export const useArray = initial  => {
	const [value, setValue] = useState(initial);

	return {
		value,
		setValue,
		add: useCallback((a) => setValue(v => [...v, a])),
		clear: useCallback(() => setValue(() => [])),
		removeIndex: useCallback((index) => {
			setValue(v => {
				const newValue = [...v];
                newValue.splice(index,1);
                return newValue;
			})
		})
	}
}