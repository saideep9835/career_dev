import React, { useEffect, useState } from 'react';
import MenuSearch from '../../components/MenuSearch';
import api from '../../api';
import { Box, Typography, Grid } from '@mui/material';
import Tree from 'react-d3-tree';
import MenuWithoutAI from '../../components/MenuWithoutAI';

const After_Tenth = () => {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api_fetch = api();
        const response = await api_fetch.get('/data/'); // Update the URL to your API endpoint
        if (response.data && Array.isArray(response.data)) {
          const tree = formatDataForTree(response.data[0].data);
          setTreeData(tree);
        } else {
          console.error('Data received is not an array:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDataForTree = (data) => {
    return data.map(career => ({
      name: career.career_name,
      attributes: { description: career.description },
      children: [
        {
          name: 'Educational Requirements',
          children: career.educational_requirements.map(req => ({ name: req }))
        },
        {
          name: 'Skills Required',
          children: career.skills_required.map(skill => ({ name: skill }))
        }
      ]
    }));
  };

  const containerStyles = {
    width: '800px',
    height: '600px',
    margin: '0 auto',
    border: '1px solid black',
    overflow: 'auto'
  };

  const renderForeignObjectNode = ({ nodeDatum, foreignObjectProps }) => (
    <g>
      <circle r={15} style={{ fill: 'lightblue', stroke: 'black', strokeWidth: '2px' }} />
      <foreignObject {...foreignObjectProps}>
        <div style={{ textAlign: 'center', width: '200px' }}>
          <div style={{ fontSize: '12px', marginTop: '5px' }}>
            {nodeDatum.name}
          </div>
        </div>
      </foreignObject>
    </g>
  );

  return (
    <>
      <MenuWithoutAI />
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>Career Path to become a Software Engineer</Typography>
      {treeData && (
        <Box sx={containerStyles}>
          <Tree
            data={treeData}
            orientation="vertical"
            pathFunc="straight"
            translate={{ x: 400, y: 50 }}
            nodeSize={{ x: 150, y: 100 }}
            separation={{ siblings: 1, nonSiblings: 1.5 }}
            renderCustomNodeElement={(rd3tProps) =>
              renderForeignObjectNode({
                ...rd3tProps,
                foreignObjectProps: { width: 200, height: 50, x: -100, y: 20 } // Adjust y value to move text below the node
              })
            }
          />
        </Box>
      )}
    </>
  );
};

export default After_Tenth;
