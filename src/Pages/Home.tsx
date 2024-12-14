import { useState } from 'react';

const HomeDiv = () => {
    const [home] = useState(null);

    return (
        <div>
            {home}
        </div>
    );
};

export default HomeDiv;
