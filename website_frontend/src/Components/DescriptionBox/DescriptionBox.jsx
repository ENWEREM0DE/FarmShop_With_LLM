import React from "react";
import "./DescriptionBox.css";
import { PieChart } from '@mui/x-charts/PieChart';

const DescriptionBox = ({ numPositive, numNegative }) => {
    console.log("The number of positives and negatives")
    console.log(numNegative)
    console.log(numPositive)

  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Reviews Sentiment Analyzer</div>
      </div>
      <div className="descriptionbox-description">
          <h2><i>Customer Review Chart</i></h2>
          <PieChart
              series={[
                  {
                      data: [
                          { id: 0, value: numPositive, label: 'Positive' },
                          { id: 1, value: numNegative, label: 'Negative' },
                      ],
                  },
              ]}
              width={400}
              height={200}
          />
      </div>
    </div>
  );
};

export default DescriptionBox;
