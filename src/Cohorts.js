import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CohortCard from './CohortCard';
import { Card } from 'semantic-ui-react';

const Cohorts = () => {
    const [classes, setClasses] = useState();
    let schoolId = process.env.REACT_APP_LW_CLIENT_ID;
    let endpoint = `${process.env.REACT_APP_LW_URL}/v2/courses`;
    console.log({ endpoint });
    let token = process.env.REACT_APP_LW_TOKEN;

    useEffect(() => {
        axios({
            method: 'get',
            url: endpoint,
            headers: {
                Authorization: `Bearer ${token}`,
                'Lw-Client': schoolId
            }
        }).then((dataResponse) => {
            let coursesList = dataResponse.data.data;
            console.log({ coursesList });
            const requests = coursesList.map((course) =>
                axios({
                    method: 'get',
                    url: `${endpoint}/${course.id}/analytics`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Lw-Client': schoolId
                    }
                })
            );
            axios.all(requests).then((courseAnalytics) => {
                // console.log({ courseAnalytics });
                let coursesWithData = coursesList.map((courseWithExtra) => {
                    let studentsArray = courseAnalytics.filter((course) => {
                        return course.config.url.includes(courseWithExtra.id);
                    });
                    console.log({ studentsArray });
                    return {
                        students: studentsArray[0].data.students,
                        ...courseWithExtra
                    };
                });
                console.log({ coursesWithData });
                setClasses(coursesWithData);
                // courseAnalytics.forEach((courseAnalytic) => {
                //     console.log('courseAnalytic.data', courseAnalytic);
                // });
            });
        });
    }, [schoolId, endpoint, token]);
    return (
        <div>
            <h2>Open Cohorts</h2>
            <Card.Group centered>
                {classes.map((classItem) => (
                    <CohortCard classData={classItem} />
                ))}
            </Card.Group>
        </div>
    );
};

const CohortWrapper = styled.div`
    border: 1px solid red;
`;

export default Cohorts;
