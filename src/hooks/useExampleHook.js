import { useState } from 'react';

const useExampleHook = () => {
    const [count, setCount] = useState(0);

    return [count, setCount];
};

export default useExampleHook;