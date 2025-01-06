import { useCallback, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import WatchListComp from "../watchlist/WatchList";

const Watchlist = () => {

  const MainDiv = styled.div`    
    display: grid;
    grid-template-columns: 25% 75%;
    grid-gap: 5px; 
    overflow-y: auto;
    overflow-x: auto;
    `;

  const ShareGrid = styled.div`
    height:200;
    overflow-y: auto;
    overflow-x: auto;
    `;

  const GraphVis = styled.div`
     height: 100%;
     overflow-y: auto;
     overflow-x: auto;
    `;

  const GlobalStyle = createGlobalStyle`
  .renderComp::-webkit-scrollbar {
    height:7px;
  }

  .renderComp::-webkit-scrollbar-thumb {
    background-color: #ADD8E6;
    border-radius: 3px;
  }
`;
  const [chartComponent, setChartComponent] = useState<JSX.Element | null>(null);

  const setChartCompCallback = useCallback(
    (chartComp: JSX.Element | null) => {
      setChartComponent(chartComp);
    },
    []
  );

  return (
    <MainDiv style={{ marginLeft: '50px', marginRight: '50px' }}>
      <GlobalStyle />
      <ShareGrid className='renderPage'>
        <WatchListComp link="https://www.nseindia.com" callback={setChartCompCallback} />
      </ShareGrid>
      <GraphVis>
        {chartComponent}
      </GraphVis>
    </MainDiv>
  );
};

export default Watchlist;
