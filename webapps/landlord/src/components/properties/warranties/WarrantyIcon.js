import { FaBolt, FaBuilding, FaTint } from 'react-icons/fa';
import React from 'react';

const WarrantyIcon = ({ type }) => {
  switch (type) {
    case 'electrical':
      return <FaBolt />;
    case 'plumbing':
      return <FaTint />;
    case 'structural':
      return <FaBuilding />;
    default:
      return null;
  }
};

export default WarrantyIcon;