/**
 * Severity Distribution Chart
 * Displays a bar chart showing the distribution of vulnerabilities by severity
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
  Cell,
} from 'recharts';
import type { ProcessedVulnerability } from '../../types/vulnerability';

interface SeverityChartProps {
  vulnerabilities: ProcessedVulnerability[];
}

const SEVERITY_COLORS = {
  critical: '#dc2626',
  high: '#ea580c',
  medium: '#f59e0b',
  low: '#84cc16',
};

const SeverityChart: React.FC<SeverityChartProps> = ({ vulnerabilities }) => {
  const data = useMemo(() => {
    const counts = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    };

    vulnerabilities.forEach((vuln) => {
      counts[vuln.severity]++;
    });

    return [
      { severity: 'Critical', count: counts.critical, color: SEVERITY_COLORS.critical },
      { severity: 'High', count: counts.high, color: SEVERITY_COLORS.high },
      { severity: 'Medium', count: counts.medium, color: SEVERITY_COLORS.medium },
      { severity: 'Low', count: counts.low, color: SEVERITY_COLORS.low },
    ];
  }, [vulnerabilities]);

  return (
    <div className="chart-container">
      <h3>Vulnerability Severity Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="severity" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Count">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SeverityChart;
