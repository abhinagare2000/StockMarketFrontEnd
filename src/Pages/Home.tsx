import { useState } from 'react';

const HomeDiv = () => {
    const [home, setHome] = useState(null);

    return (
        <div>
            {home}
        </div>
    );
};

export default HomeDiv;
