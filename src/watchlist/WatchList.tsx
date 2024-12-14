import axios from 'axios';
import React, { useEffect, useState, memo, useCallback } from 'react';
import { Grid, Paper } from '@mui/material';
import styled from "styled-components";
import IntradayChart from "../Components/Chart/IntradayChart";

interface StockData {
    symbol: string;
    lastPrice: number;
    dayHigh: number,
    open: number,
    dayLow: number,
    lastUpdateTime: string,
}

const MainDiv = styled.header`    
    background-color: var(--color-text-white);
    display: flex;
    height: 70px;
    align-items: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius:2px;
    flex-wrap: nowrap;
    overflow-x: auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    `;

const NavList = styled.div`
    text-decoration: none;
    padding:.4rem;
    display: flex;
    font-size:13.5px;
    font-weight:normal;
`;

function formatDataForHighcharts(data: any) {
    // Convert "lastUpdateTime" from "25-Sep-2024 16:00:00" to a timestamp in milliseconds
    const dateParts = data.lastUpdateTime.split(' ')[0].split('-');
    const timeParts = data.lastUpdateTime.split(' ')[1].split(':');

    // Create a Date object from the parsed date and time
    const dateTime = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timeParts[0]}:${timeParts[1]}:${timeParts[2]}`);

    // Get the timestamp in milliseconds
    const timestamp = dateTime.getTime();

    return [
        timestamp,      // Timestamp in milliseconds
        data.open,      // Open price
        data.dayHigh,   // Day high price
        data.dayLow,    // Day low price
        data.lastPrice  // Close price (using lastPrice as close)
    ];
}

const PaperComponent = memo(({ data, callback }: { data: StockData, callback: any }) => {
    const intradayChartData = formatDataForHighcharts(data);
    return <><Grid item xs={12}>
        <Paper onClick={() => callback(<IntradayChart link={JSON.stringify(intradayChartData)} />)} elevation={3} style={{ padding: '16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between' }}>
            <div>{data.symbol}</div>
            <div>{data.lastPrice}</div>
        </Paper>
    </Grid></>
});

const WatchListComp = memo(({ link, callback }: { link: string, callback: any }) => {
    const [pageHeight, setPageHeight] = useState(window.innerHeight);
    const [stockData, setStockData] = useState<StockData[] | null>(null); // Initialize as null
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const fetchNSEData = async (linkStr: string, indicesStr: string | null) => {

        const response = await axios.get(linkStr + '/api/equity-stockIndices', {
            params: {
                indexStr: indicesStr
            }
        });
        return response.data;
    };

    const fetchData = useCallback(async (linkStr: string, indicesStr: string | null) => {
        try {
            const response = await fetchNSEData(linkStr, indicesStr);

            // Update the component state with the fetched data
            setStockData(response.data);
            setSelectedItem(indicesStr);
            console.log(response);
        } catch (error: any) {
            if (error.response) {
                console.error('Response Error:', error.response.data);
            } else if (error.request) {
                console.error('Request Error:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setPageHeight(window.innerHeight);
        };

        // Add a resize event listener to update the page height
        window.addEventListener('resize', handleResize);

        fetchData(link, "NIFTY 50"); // Invoke the fetch data function

        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('resize', handleResize);
        };
    }, [link, fetchData]); // Add 'link' as a dependency if it can change

    const NiftyArray = ['NIFTY 50', 'NIFTY 100', 'NIFTY IT', 'NIFTY ENERGY', 'NIFTY AUTO', 'NIFTY BANK'];

    const NavListComp: React.FC = () => {
        const navItems = NiftyArray.map((NiftyType) => (
            <NavList onClick={(e) => fetchData(link, e.currentTarget.textContent)} className={`app-nav ${selectedItem === NiftyType ? 'selected' : ''}`}>
                {NiftyType}
            </NavList>
        ));

        return <>{navItems}</>;
    };

    // Render the component based on the fetched data
    return (
        <div style={{ height: `${pageHeight}px`, overflowY: 'auto' }}>
            <MainDiv className="container">
                <NavListComp />
            </MainDiv>
            <Grid container spacing={.3}>
                {stockData?.filter((data, index) => index !== 0).map((data, index) => (
                    <Grid item xs={12} key={index}>
                        <PaperComponent data={data} callback={callback} />
                    </Grid>
                ))}
            </Grid>
        </div >
    );
});

export default WatchListComp;
