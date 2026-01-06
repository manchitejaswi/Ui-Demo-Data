/**
 * Trend Analysis Chart
 * Shows vulnerability trends over time based on published dates
 */

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO, startOfMonth } from 'date-fns';
import type { ProcessedVulnerability } from '../../types/vulnerability';

interface TrendChartProps {
  vulnerabilities: ProcessedVulnerability[];
}

const TrendChart: React.FC<TrendChartProps> = ({ vulnerabilities }) => {
  const data = useMemo(() => {
    const monthCounts: Record<string, { critical: number; high: number; medium: number; low: number; total: number }> = {};

    vulnerabilities.forEach((vuln) => {
      try {
        const date = parseISO(vuln.published.split(' ')[0]);
        const monthKey = format(startOfMonth(date), 'yyyy-MM');

        if (!monthCounts[monthKey]) {
          monthCounts[monthKey] = { critical: 0, high: 0, medium: 0, low: 0, total: 0 };
        }

        monthCounts[monthKey][vuln.severity]++;
        monthCounts[monthKey].total++;
      } catch (error) {
        // Skip invalid dates
      }
    });

    const sorted = Object.entries(monthCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-12) // Last 12 months
      .map(([month, counts]) => ({
        month: format(parseISO(month + '-01'), 'MMM yyyy'),
        ...counts,
      }));

    return sorted;
  }, [vulnerabilities]);

  return (
    <div className="chart-container">
      <h3>Vulnerability Trends Over Time (Last 12 Months)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="critical"
            stroke="#dc2626"
            name="Critical"
          />
          <Line type="monotone" dataKey="high" stroke="#ea580c" name="High" />
          <Line
            type="monotone"
            dataKey="medium"
            stroke="#f59e0b"
            name="Medium"
          />
          <Line type="monotone" dataKey="low" stroke="#84cc16" name="Low" />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#6366f1"
            strokeWidth={2}
            name="Total"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
