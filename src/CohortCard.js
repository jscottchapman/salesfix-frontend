import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const CohortCard = ({ classData }) => {
    const { title, students } = classData;
    const remaining = 40 - students;
    return <Card header={title} meta={`${remaining} spots remaining`} />;
};

export default CohortCard;
