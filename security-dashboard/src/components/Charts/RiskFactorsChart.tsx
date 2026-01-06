/**
 * Risk Factors Chart
 * Displays top risk factors across all vulnerabilities
 */

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { ProcessedVulnerability } from '../../types/vulnerability';

interface RiskFactorsChartProps {
  vulnerabilities: ProcessedVulnerability[];
  topN?: number;
}

const RiskFactorsChart: React.FC<RiskFactorsChartProps> = ({
  vulnerabilities,
  topN = 10,
}) => {
  const data = useMemo(() => {
    const riskFactorCounts: Record<string, number> = {};

    vulnerabilities.forEach((vuln) => {
      Object.keys(vuln.riskFactors).forEach((factor) => {
        riskFactorCounts[factor] = (riskFactorCounts[factor] || 0) + 1;
      });
    });

    const sorted = Object.entries(riskFactorCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, topN)
      .map(([factor, count]) => ({
        factor: factor.length > 30 ? factor.substring(0, 30) + '...' : factor,
        fullFactor: factor,
        count,
      }));

    return sorted;
  }, [vulnerabilities, topN]);

  return (
    <div className="chart-container">
      <h3>Top {topN} Risk Factors</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="factor" width={150} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="custom-tooltip">
                    <p className="label">{payload[0].payload.fullFactor}</p>
                    <p className="value">Count: {payload[0].value}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar dataKey="count" fill="#3b82f6" name="Frequency" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskFactorsChart;
